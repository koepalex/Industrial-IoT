// ------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All rights reserved.
//  Licensed under the MIT License (MIT). See License.txt in the repo root for license information.
// ------------------------------------------------------------

namespace Microsoft.Azure.IIoT.Messaging {
    using System.Collections.Generic;
    using System.Threading;
    using System.Threading.Tasks;

    /// <summary>
    /// Send events
    /// </summary>
    public interface IEventClient {

        /// <summary>
        /// Send event
        /// </summary>
        /// <param name="target"></param>
        /// <param name="data"></param>
        /// <param name="contentType"></param>
        /// <param name="eventSchema"></param>
        /// <param name="contentEncoding"></param>
        /// <param name="ct"></param>
        /// <returns></returns>
        Task SendEventAsync(string target, byte[] data,
            string contentType, string eventSchema,
            string contentEncoding, CancellationToken ct = default);

        /// <summary>
        /// Send batch of events
        /// </summary>
        /// <param name="target"></param>
        /// <param name="batch"></param>
        /// <param name="contentType"></param>
        /// <param name="eventSchema"></param>
        /// <param name="contentEncoding"></param>
        /// <param name="ct"></param>
        /// <returns></returns>
        Task SendEventAsync(string target, IEnumerable<byte[]> batch,
            string contentType, string eventSchema,
            string contentEncoding, CancellationToken ct = default);
    }
}
