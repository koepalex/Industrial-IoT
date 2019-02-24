# encoding: utf-8
# Copyright (c) Microsoft Corporation. All rights reserved.
# Licensed under the MIT License. See License.txt in the project root for
# license information.
#
# Code generated by Microsoft (R) AutoRest Code Generator 1.0.0.0
# Changes may cause incorrect behavior and will be lost if the code is
# regenerated.

module azure.iiot.opc.history
  module Models
    #
    # Application info model
    #
    class ApplicationInfoApiModel
      # @return [String] Unique application id
      attr_accessor :application_id

      # @return [ApplicationType] Type of application. Possible values include:
      # 'Server', 'Client', 'ClientAndServer'
      attr_accessor :application_type

      # @return [String] Unique application uri
      attr_accessor :application_uri

      # @return [String] Product uri
      attr_accessor :product_uri

      # @return [String] Name of server
      attr_accessor :application_name

      # @return [String] Locale of name - defaults to "en"
      attr_accessor :locale

      # @return [Array<Integer>] Application public cert
      attr_accessor :certificate

      # @return [Array<String>] The capabilities advertised by the server.
      attr_accessor :capabilities

      # @return [Array<String>] Discovery urls of the server
      attr_accessor :discovery_urls

      # @return [String] Discovery profile uri
      attr_accessor :discovery_profile_uri

      # @return [Array<String>] Host addresses of server application or null
      attr_accessor :host_addresses

      # @return [String] Site of the application
      attr_accessor :site_id

      # @return [String] Supervisor having registered the application
      attr_accessor :supervisor_id

      # @return [DateTime] Last time application was seen
      attr_accessor :not_seen_since


      #
      # Mapper for ApplicationInfoApiModel class as Ruby Hash.
      # This will be used for serialization/deserialization.
      #
      def self.mapper()
        {
          client_side_validation: true,
          required: false,
          serialized_name: 'ApplicationInfoApiModel',
          type: {
            name: 'Composite',
            class_name: 'ApplicationInfoApiModel',
            model_properties: {
              application_id: {
                client_side_validation: true,
                required: false,
                serialized_name: 'applicationId',
                type: {
                  name: 'String'
                }
              },
              application_type: {
                client_side_validation: true,
                required: false,
                serialized_name: 'applicationType',
                type: {
                  name: 'Enum',
                  module: 'ApplicationType'
                }
              },
              application_uri: {
                client_side_validation: true,
                required: false,
                serialized_name: 'applicationUri',
                type: {
                  name: 'String'
                }
              },
              product_uri: {
                client_side_validation: true,
                required: false,
                serialized_name: 'productUri',
                type: {
                  name: 'String'
                }
              },
              application_name: {
                client_side_validation: true,
                required: false,
                serialized_name: 'applicationName',
                type: {
                  name: 'String'
                }
              },
              locale: {
                client_side_validation: true,
                required: false,
                serialized_name: 'locale',
                type: {
                  name: 'String'
                }
              },
              certificate: {
                client_side_validation: true,
                required: false,
                serialized_name: 'certificate',
                type: {
                  name: 'ByteArray'
                }
              },
              capabilities: {
                client_side_validation: true,
                required: false,
                serialized_name: 'capabilities',
                constraints: {
                  UniqueItems: true
                },
                type: {
                  name: 'Sequence',
                  element: {
                      client_side_validation: true,
                      required: false,
                      serialized_name: 'StringElementType',
                      type: {
                        name: 'String'
                      }
                  }
                }
              },
              discovery_urls: {
                client_side_validation: true,
                required: false,
                serialized_name: 'discoveryUrls',
                constraints: {
                  UniqueItems: true
                },
                type: {
                  name: 'Sequence',
                  element: {
                      client_side_validation: true,
                      required: false,
                      serialized_name: 'StringElementType',
                      type: {
                        name: 'String'
                      }
                  }
                }
              },
              discovery_profile_uri: {
                client_side_validation: true,
                required: false,
                serialized_name: 'discoveryProfileUri',
                type: {
                  name: 'String'
                }
              },
              host_addresses: {
                client_side_validation: true,
                required: false,
                serialized_name: 'hostAddresses',
                constraints: {
                  UniqueItems: true
                },
                type: {
                  name: 'Sequence',
                  element: {
                      client_side_validation: true,
                      required: false,
                      serialized_name: 'StringElementType',
                      type: {
                        name: 'String'
                      }
                  }
                }
              },
              site_id: {
                client_side_validation: true,
                required: false,
                serialized_name: 'siteId',
                type: {
                  name: 'String'
                }
              },
              supervisor_id: {
                client_side_validation: true,
                required: false,
                serialized_name: 'supervisorId',
                type: {
                  name: 'String'
                }
              },
              not_seen_since: {
                client_side_validation: true,
                required: false,
                serialized_name: 'notSeenSince',
                type: {
                  name: 'DateTime'
                }
              }
            }
          }
        }
      end
    end
  end
end
