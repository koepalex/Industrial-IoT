// ------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All rights reserved.
//  Licensed under the MIT License (MIT). See License.txt in the repo root for license information.
// ------------------------------------------------------------

namespace Microsoft.Azure.IIoT.OpcUa.Edge.Publisher.Engine {
    using Microsoft.Azure.IIoT.OpcUa.Edge.Publisher.Models;
    using Microsoft.Azure.IIoT.OpcUa.Publisher;
    using Microsoft.Azure.IIoT.Agent.Framework;
    using Microsoft.Azure.IIoT.Agent.Framework.Models;
    using Microsoft.Azure.IIoT.Exceptions;
    using Microsoft.Azure.IIoT.Module;
    using Microsoft.Azure.IIoT.Serializers;
    using Serilog;
    using System;
    using System.Linq;
    using System.Threading;
    using System.Threading.Tasks;
    using System.Threading.Tasks.Dataflow;
    using System.Text;
    using System.Collections.Generic;
    using System.Diagnostics;
    using Prometheus;
    using Microsoft.Azure.IIoT.Tasks.Default;

    /// <summary>
    /// Dataflow engine
    /// </summary>
    public class DataFlowProcessingEngine : IProcessingEngine, IDisposable {

        /// <inheritdoc/>
        public bool IsRunning { get; private set; }

        /// <inheritdoc/>
        public string Name => _messageTrigger.Id;

        /// <summary>
        /// Create engine
        /// </summary>
        /// <param name="messageTrigger"></param>
        /// <param name="encoder"></param>
        /// <param name="messageSink"></param>
        /// <param name="engineConfiguration"></param>
        /// <param name="logger"></param>
        /// <param name="identity"></param>
        public DataFlowProcessingEngine(IMessageTrigger messageTrigger, IMessageEncoder encoder,
            IMessageSink messageSink, IEngineConfiguration engineConfiguration, ILogger logger,
            IIdentity identity) {
            _config = engineConfiguration;
            _messageTrigger = messageTrigger;
            _messageSink = messageSink;
            _messageEncoder = encoder;
            _logger = logger;
            _identity = identity;

            if (_config.BatchSize.HasValue && _config.BatchSize.Value > 1) {
                _dataSetMessageBufferSize = _config.BatchSize.Value;
            }
            if (_config.MaxMessageSize.HasValue && _config.MaxMessageSize.Value > 0) {
                _maxEncodedMessageSize = _config.MaxMessageSize.Value;
            }

            _diagnosticInterval = _config.DiagnosticsInterval.GetValueOrDefault(TimeSpan.Zero);
            _batchTriggerInterval = _config.BatchTriggerInterval.GetValueOrDefault(TimeSpan.Zero);
            _diagnosticsOutputTimer = new Timer(DiagnosticsOutputTimer_Elapsed);
            _batchTriggerIntervalTimer = new Timer(BatchTriggerIntervalTimer_Elapsed);
        }

        /// <inheritdoc/>
        public void Dispose() {
            _logger.Debug("Disposing {name}", Name);
            _diagnosticsOutputTimer?.Dispose();
            _batchTriggerIntervalTimer?.Dispose();
        }

        /// <inheritdoc/>
        public Task<VariantValue> GetCurrentJobState() {
            return Task.FromResult<VariantValue>(null);
        }

        /// <inheritdoc/>
        public async Task RunAsync(ProcessMode processMode, CancellationToken cancellationToken) {
            if (_messageEncoder == null) {
                throw new NotInitializedException();
            }
            try {
                if (IsRunning) {
                    return;
                }
                IsRunning = true;
                _encodingBlock = new TransformBlock<DataSetMessageModel[], IEnumerable<NetworkMessageModel>>(
                    input => {
                        IEnumerable<NetworkMessageModel> result;
                        try {
                            if (_dataSetMessageBufferSize == 1) {
                                result = _messageEncoder.EncodeAsync(input, _maxEncodedMessageSize);
                            }
                            else {
                                result = _messageEncoder.EncodeBatchAsync(input, _maxEncodedMessageSize);
                            }
                        }
                        catch (Exception e) {
                            _logger.Error(e, "Encoding failure");
                            result = Enumerable.Empty<NetworkMessageModel>();
                        }
                        if (_batchTriggerInterval > TimeSpan.Zero) {
                            _batchTriggerIntervalTimer.Change(_batchTriggerInterval, Timeout.InfiniteTimeSpan);
                        }
                        return result;
                    },
                    new ExecutionDataflowBlockOptions {
                        CancellationToken = cancellationToken,
                        BoundedCapacity = 100, // Bound to 100 batches == 100 arrays of network messages out,
                        MaxMessagesPerTask = DataflowBlockOptions.Unbounded,
                        MaxDegreeOfParallelism = Environment.ProcessorCount * 2
                    });

                _batchDataSetMessageBlock = new BatchBlock<DataSetMessageModel>(
                    _dataSetMessageBufferSize,
                    new GroupingDataflowBlockOptions {
                        CancellationToken = cancellationToken,
                        MaxMessagesPerTask = DataflowBlockOptions.Unbounded,
                        Greedy = true,
                        BoundedCapacity = _dataSetMessageBufferSize * 3 // 3 batches
                    });

                var sw = new Stopwatch();
                _sinkBlock = new ActionBlock<IEnumerable<NetworkMessageModel>>(
                    async input => {
                        if (input.Any()) {
                            sw.Start();
                            await _messageSink.SendAsync(input);
                            sw.Stop();
                            Interlocked.Increment(ref _messageSinkCallCount);
                            _averageMessageSinkRate = sw.ElapsedMilliseconds / _messageSinkCallCount;
                        }
                        else {
                            Interlocked.Decrement(ref _batchTriggersOnTimeout); // Triggered an empty batch
                        }
                    },
                    new ExecutionDataflowBlockOptions {
                        CancellationToken = cancellationToken,
                        BoundedCapacity = 100, // Buffer x arrays max
                        SingleProducerConstrained = true,
                        MaxMessagesPerTask = DataflowBlockOptions.Unbounded,
                      // TaskScheduler = new StaTaskScheduler(1),
                        MaxDegreeOfParallelism = Environment.ProcessorCount * 2
                    });

                _batchDataSetMessageBlock.LinkTo(_encodingBlock);
                _encodingBlock.LinkTo(_sinkBlock);

                _messageTrigger.OnMessage += MessageTriggerMessageReceived;
                if (_diagnosticInterval > TimeSpan.Zero) {
                    _diagnosticsOutputTimer.Change(_diagnosticInterval, _diagnosticInterval);
                }

                await _messageTrigger.RunAsync(cancellationToken).ConfigureAwait(false);

            }
            finally {
                IsRunning = false;
                _messageTrigger.OnMessage -= MessageTriggerMessageReceived;
                _diagnosticsOutputTimer.Change(Timeout.Infinite, Timeout.Infinite);
                _batchTriggerIntervalTimer.Change(Timeout.Infinite, Timeout.Infinite);
                await _sinkBlock.Completion;
            }
        }

        /// <inheritdoc/>
        public Task SwitchProcessMode(ProcessMode processMode, DateTime? timestamp) {
            return Task.CompletedTask;
        }

        /// <summary>
        /// Diagnostics timer
        /// </summary>
        /// <param name="state"></param>
        private void DiagnosticsOutputTimer_Elapsed(object state) {
            var totalDuration = _diagnosticStart != DateTime.MinValue ? (DateTime.UtcNow - _diagnosticStart).TotalSeconds : 0;
            var valueChangesPerSec = _messageTrigger.ValueChangesCount / totalDuration;
            var dataChangesPerSec = _messageTrigger.DataChangesCount / totalDuration;
            var encoderValuesPerSec = _messageEncoder.NotificationsProcessedCount / totalDuration;
            var sentMessagesPerSec = totalDuration > 0 ? _messageSink.SentMessagesCount / totalDuration : 0;
            var messageSizeAveragePercent = Math.Round(_messageEncoder.AvgMessageSize / _maxEncodedMessageSize * 100);
            var messageSizeAveragePercentFormatted = $"({messageSizeAveragePercent}%)";
            var chunkSizeAverage = _messageEncoder.AvgMessageSize / (4 * 1024);
            var estimatedMsgChunksPerDay = Math.Ceiling(chunkSizeAverage) * sentMessagesPerSec * 60 * 60 * 24;

            ThreadPool.GetAvailableThreads(out var curWorkerThreads, out var curIoThreads);
            ThreadPool.GetMinThreads(out var minWorkerThreads, out var minIoThreads);
            ThreadPool.GetMaxThreads(out var maxWorkerThreads, out var maxIoThreads);

            _logger.Debug("Identity {deviceId}; {moduleId}", _identity.DeviceId, _identity.ModuleId);

            var diagInfo = new StringBuilder();
            diagInfo.AppendLine("\n  DIAGNOSTICS INFORMATION for          : {host}");
            diagInfo.AppendLine("  # Ingestion duration                 : {duration,14:dd\\:hh\\:mm\\:ss} (dd:hh:mm:ss)");
            var dataChangesPerSecFormatted = _messageTrigger.DataChangesCount > 0 && totalDuration > 0 ? $"({dataChangesPerSec:#,0.##}/s)" : "";
            diagInfo.AppendLine("  # Ingress DataChanges (from OPC)     : {dataChangesCount,14:n0} {dataChangesPerSecFormatted}");
            var valueChangesPerSecFormatted = _messageTrigger.ValueChangesCount > 0 && totalDuration > 0 ? $"({valueChangesPerSec:#,0.##}/s)" : "";
            diagInfo.AppendLine("  # Ingress ValueChanges (from OPC)    : {valueChangesCount,14:n0} {valueChangesPerSecFormatted}");

            diagInfo.AppendLine("  # Connection retries (OPC Server)    : {connectionRetries,14:0}");
            diagInfo.AppendLine("  # Ingress batchsize/trigger interval : {batchSize,14:0} | {batchTriggerInterval}");
            diagInfo.AppendLine("  # Ingress BatchBlock size/triggered  : {batchDataSetMessageBlockOutputCount,14:0} | {batchTriggersOnTimeout}");
            diagInfo.AppendLine("  # Ingress DataChanges dropped        : {ingressDroppedCount,14:n0}");
            diagInfo.AppendLine("  # Encoding Block input/output size   : {encodingBlockInputCount,14:0} | {encodingBlockOutputCount:0}");
            var encodervaluesPerSecFormatted = _messageEncoder.NotificationsProcessedCount > 0 && totalDuration > 0 ? $"({encoderValuesPerSec:#,0.##}/s)" : "";
            diagInfo.AppendLine("  # Encoder ValueChanges processed     : {notificationsProcessedCount,14:n0} {encodervaluesPerSecFormatted}");
            diagInfo.AppendLine("  # Encoder ValueChanges dropped       : {notificationsDroppedCount,14:n0}");
            diagInfo.AppendLine("  # Encoder IoT Messages produced      : {messagesProcessedCount,14:n0}");
            diagInfo.AppendLine("  # Encoder avg ValueChanges/Message   : {notificationsPerMessage,14:0}");
            diagInfo.AppendLine("  # Encoder avg IoT Message body size  : {messageSizeAverage,14:n0} {messageSizeAveragePercentFormatted}");
            diagInfo.AppendLine("  # Encoder avg IoT Unit (4 KB) usage  : {chunkSizeAverage,14:0.#}");
            diagInfo.AppendLine("  # Estimated IoT Units (4 KB) per day : {estimatedMsgChunksPerDay,14:n0}");
            diagInfo.AppendLine("  # IoT message send pending count     : {sinkBlockInputCount,14:n0}");

            var sentMessagesPerSecFormatted = _messageSink.SentMessagesCount > 0 && totalDuration > 0 ? $"({sentMessagesPerSec:0.##}/s)" : "";
            diagInfo.AppendLine("  # Sent IoT message count             : {messageSinkSentMessagesCount,14:n0} {sentMessagesPerSecFormatted}");
            diagInfo.AppendLine("  # IoT message send failure count     : {messageSinkSentFailures,14:n0}");
            diagInfo.AppendLine("  # IoT message average send delay     : {messageSinkCallCount,14:0} | {messageSinkSendRate}");
            diagInfo.AppendLine("  # Memory (Workingset / Private)      : {workingSet,14:0} | {privateMemory} kb");
            diagInfo.AppendLine("  # Handle count                       : {handleCount,14:0}");
            diagInfo.AppendLine("  # Threadpool Work Items / completed  : {pendingWorkItems,14:0} | {completedWorkItems} {threadCount}");
            diagInfo.AppendLine("  # Threadpool Worker Threads          : {curWorkerThreads,14:0} (min: {minWorkerThreads} / max:{maxWorkerThrads})");
            diagInfo.AppendLine("  # Threadpool IO Threads              : {curIoThreads,14:0} (min: {minIoThreads} / max:{maxIoThreads})");

            _logger.Information(diagInfo.ToString(),
                Name,
                TimeSpan.FromSeconds(totalDuration),
                _messageTrigger.DataChangesCount, dataChangesPerSecFormatted,
                _messageTrigger.ValueChangesCount, valueChangesPerSecFormatted,
                _messageTrigger.NumberOfConnectionRetries,
                _dataSetMessageBufferSize, _batchTriggerInterval,
                _batchDataSetMessageBlock.OutputCount, _batchTriggersOnTimeout,
                _dataSetMessageDroppedCount,
                _encodingBlock.InputCount, _encodingBlock.OutputCount,
                _messageEncoder.NotificationsProcessedCount, encodervaluesPerSecFormatted,
                _messageEncoder.NotificationsDroppedCount,
                _messageEncoder.MessagesProcessedCount,
                _messageEncoder.AvgNotificationsPerMessage,
                _messageEncoder.AvgMessageSize, messageSizeAveragePercentFormatted,
                chunkSizeAverage,
                estimatedMsgChunksPerDay,
                _sinkBlock.InputCount,
                _messageSink.SentMessagesCount, sentMessagesPerSecFormatted,
                _messageSink.SendErrorCount,
                _messageSinkCallCount, TimeSpan.FromMilliseconds(_averageMessageSinkRate),
                Process.GetCurrentProcess().WorkingSet64 / 1024, Process.GetCurrentProcess().PrivateMemorySize64 / 1024,
                Process.GetCurrentProcess().HandleCount,
                ThreadPool.PendingWorkItemCount, ThreadPool.CompletedWorkItemCount, ThreadPool.ThreadCount,
                curWorkerThreads, minWorkerThreads, maxWorkerThreads,
                curIoThreads, minIoThreads, maxIoThreads);

            var deviceId = _identity.DeviceId ?? "";
            var moduleId = _identity.ModuleId ?? "";
            kDataChangesCount.WithLabels(deviceId, moduleId, Name)
                .Set(_messageTrigger.DataChangesCount);
            kDataChangesPerSecond.WithLabels(deviceId, moduleId, Name)
                .Set(dataChangesPerSec);
            kValueChangesCount.WithLabels(deviceId, moduleId, Name)
                .Set(_messageTrigger.ValueChangesCount);
            kValueChangesPerSecond.WithLabels(deviceId, moduleId, Name)
                .Set(valueChangesPerSec);
            kNotificationsProcessedCount.WithLabels(deviceId, moduleId, Name)
                .Set(_messageEncoder.NotificationsProcessedCount);
            kNotificationsDroppedCount.WithLabels(deviceId, moduleId, Name)
                .Set(_messageEncoder.NotificationsDroppedCount);
            kMessagesProcessedCount.WithLabels(deviceId, moduleId, Name)
                .Set(_messageEncoder.MessagesProcessedCount);
            kNotificationsPerMessageAvg.WithLabels(deviceId, moduleId, Name)
                .Set(_messageEncoder.AvgNotificationsPerMessage);
            kMessageSizeAvg.WithLabels(deviceId, moduleId, Name)
                .Set(_messageEncoder.AvgMessageSize);
            kIoTHubQueueBuffer.WithLabels(deviceId, moduleId, Name)
                .Set(_sinkBlock.InputCount);
            kSentMessagesCount.WithLabels(deviceId, moduleId, Name)
                .Set(_messageSink.SentMessagesCount);
            kSentMessagesPerSecond.WithLabels(deviceId, moduleId, Name)
                .Set(sentMessagesPerSec);
            kNumberOfConnectionRetries.WithLabels(deviceId, moduleId, Name)
                .Set(_messageTrigger.NumberOfConnectionRetries);
            kChunkSizeAvg.WithLabels(deviceId, moduleId, Name)
                .Set(chunkSizeAverage);
            kEstimatedMsgChunksPerday.WithLabels(deviceId, moduleId, Name)
                .Set(estimatedMsgChunksPerDay);
        }

        /// <summary>
        /// Batch trigger interval
        /// </summary>
        /// <param name="state"></param>
        private void BatchTriggerIntervalTimer_Elapsed(object state) {
            _batchDataSetMessageBlock?.TriggerBatch();
            Interlocked.Increment(ref _batchTriggersOnTimeout);
        }

        /// <summary>
        /// Message received handler
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="args"></param>
        private void MessageTriggerMessageReceived(object sender, DataSetMessageModel args) {
            if (_diagnosticStart == DateTime.MinValue) {
                _diagnosticStart = DateTime.UtcNow;

                if (_batchTriggerInterval > TimeSpan.Zero) {
                    _batchTriggerIntervalTimer.Change(_batchTriggerInterval, Timeout.InfiniteTimeSpan);
                }
            }
            var result = _batchDataSetMessageBlock.Post(args);
            if (!result) {
                Interlocked.Increment(ref _dataSetMessageDroppedCount);
            }
        }

        private readonly int _dataSetMessageBufferSize = 1;
        private readonly Timer _batchTriggerIntervalTimer;
        private readonly TimeSpan _batchTriggerInterval;
        private int _dataSetMessageDroppedCount = 0;
        private int _batchTriggersOnTimeout = 0;
        private long _averageMessageSinkRate;
        private long _messageSinkCallCount;
        private readonly int _maxEncodedMessageSize = 256 * 1024;

        private readonly IEngineConfiguration _config;
        private readonly IMessageSink _messageSink;
        private readonly IMessageEncoder _messageEncoder;
        private readonly IMessageTrigger _messageTrigger;
        private readonly ILogger _logger;
        private readonly IIdentity _identity;

        private BatchBlock<DataSetMessageModel> _batchDataSetMessageBlock;

        private readonly Timer _diagnosticsOutputTimer;
        private readonly TimeSpan _diagnosticInterval;
        private DateTime _diagnosticStart = DateTime.MinValue;

        private TransformBlock<DataSetMessageModel[], IEnumerable<NetworkMessageModel>> _encodingBlock;
        private ActionBlock<IEnumerable<NetworkMessageModel>> _sinkBlock;
        private static readonly GaugeConfiguration kGaugeConfig = new GaugeConfiguration {
            LabelNames = new[] { "deviceid", "module", "triggerid" }
        };
        private static readonly Gauge kValueChangesCount = Metrics.CreateGauge(
            "iiot_edge_publisher_value_changes",
            "Opc ValuesChanges delivered for processing", kGaugeConfig);
        private static readonly Gauge kValueChangesPerSecond = Metrics.CreateGauge(
            "iiot_edge_publisher_value_changes_per_second",
            "Opc ValuesChanges/second delivered for processing", kGaugeConfig);
        private static readonly Gauge kDataChangesCount = Metrics.CreateGauge(
            "iiot_edge_publisher_data_changes",
            "Opc DataChanges delivered for processing", kGaugeConfig);
        private static readonly Gauge kDataChangesPerSecond = Metrics.CreateGauge(
            "iiot_edge_publisher_data_changes_per_second",
            "Opc DataChanges/second delivered for processing", kGaugeConfig);
        private static readonly Gauge kIoTHubQueueBuffer = Metrics.CreateGauge(
            "iiot_edge_publisher_iothub_queue_size",
            "IoT messages queued sending", kGaugeConfig);
        private static readonly Gauge kSentMessagesCount = Metrics.CreateGauge(
            "iiot_edge_publisher_sent_iot_messages",
            "IoT messages sent to hub", kGaugeConfig);
        private static readonly Gauge kSentMessagesPerSecond = Metrics.CreateGauge(
            "iiot_edge_publisher_sent_iot_messages_per_second",
            "IoT messages/second sent to hub", kGaugeConfig);
        private static readonly Gauge kNumberOfConnectionRetries = Metrics.CreateGauge(
            "iiot_edge_publisher_connection_retries",
            "OPC UA connect retries", kGaugeConfig);

        private static readonly Gauge kNotificationsProcessedCount = Metrics.CreateGauge(
            "iiot_edge_publisher_encoded_notifications",
            "publisher engine encoded opc notifications count", kGaugeConfig);
        private static readonly Gauge kNotificationsDroppedCount = Metrics.CreateGauge(
            "iiot_edge_publisher_dropped_notifications",
            "publisher engine dropped opc notifications count", kGaugeConfig);
        private static readonly Gauge kMessagesProcessedCount = Metrics.CreateGauge(
            "iiot_edge_publisher_processed_messages",
            "publisher engine processed iot messages count", kGaugeConfig);
        private static readonly Gauge kNotificationsPerMessageAvg = Metrics.CreateGauge(
            "iiot_edge_publisher_notifications_per_message_average",
            "publisher engine opc notifications per iot message average", kGaugeConfig);
        private static readonly Gauge kMessageSizeAvg = Metrics.CreateGauge(
            "iiot_edge_publisher_encoded_message_size_average",
            "publisher engine iot message encoded body size average", kGaugeConfig);

        private static readonly Gauge kChunkSizeAvg = Metrics.CreateGauge(
            "iiot_edge_publisher_chunk_size_average",
            "IoT Hub chunk size average", kGaugeConfig);
        private static readonly Gauge kEstimatedMsgChunksPerday = Metrics.CreateGauge(
            "iiot_edge_publisher_estimated_message_chunks_per_day",
            "Estimated IoT Hub messages chunks charged per day", kGaugeConfig);
    }
}
