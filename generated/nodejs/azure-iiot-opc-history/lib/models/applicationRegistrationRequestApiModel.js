/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator 1.0.0.0
 * Changes may cause incorrect behavior and will be lost if the code is
 * regenerated.
 */

'use strict';

/**
 * Application information
 *
 */
class ApplicationRegistrationRequestApiModel {
  /**
   * Create a ApplicationRegistrationRequestApiModel.
   * @property {string} applicationUri Unique application uri
   * @property {string} [applicationType] Type of application. Possible values
   * include: 'Server', 'Client', 'ClientAndServer'
   * @property {string} [productUri] Product uri of the application.
   * @property {string} [applicationName] Name of the server or client.
   * @property {string} [locale] Locale of name
   * @property {array} [capabilities] The OPC UA defined capabilities of the
   * server.
   * @property {array} [discoveryUrls] Discovery urls of the server.
   * @property {string} [discoveryProfileUri] The discovery profile uri of the
   * server.
   */
  constructor() {
  }

  /**
   * Defines the metadata of ApplicationRegistrationRequestApiModel
   *
   * @returns {object} metadata of ApplicationRegistrationRequestApiModel
   *
   */
  mapper() {
    return {
      required: false,
      serializedName: 'ApplicationRegistrationRequestApiModel',
      type: {
        name: 'Composite',
        className: 'ApplicationRegistrationRequestApiModel',
        modelProperties: {
          applicationUri: {
            required: true,
            serializedName: 'applicationUri',
            type: {
              name: 'String'
            }
          },
          applicationType: {
            required: false,
            serializedName: 'applicationType',
            type: {
              name: 'Enum',
              allowedValues: [ 'Server', 'Client', 'ClientAndServer' ]
            }
          },
          productUri: {
            required: false,
            serializedName: 'productUri',
            type: {
              name: 'String'
            }
          },
          applicationName: {
            required: false,
            serializedName: 'applicationName',
            type: {
              name: 'String'
            }
          },
          locale: {
            required: false,
            serializedName: 'locale',
            type: {
              name: 'String'
            }
          },
          capabilities: {
            required: false,
            serializedName: 'capabilities',
            constraints: {
              UniqueItems: true
            },
            type: {
              name: 'Sequence',
              element: {
                  required: false,
                  serializedName: 'StringElementType',
                  type: {
                    name: 'String'
                  }
              }
            }
          },
          discoveryUrls: {
            required: false,
            serializedName: 'discoveryUrls',
            constraints: {
              UniqueItems: true
            },
            type: {
              name: 'Sequence',
              element: {
                  required: false,
                  serializedName: 'StringElementType',
                  type: {
                    name: 'String'
                  }
              }
            }
          },
          discoveryProfileUri: {
            required: false,
            serializedName: 'discoveryProfileUri',
            type: {
              name: 'String'
            }
          }
        }
      }
    };
  }
}

module.exports = ApplicationRegistrationRequestApiModel;
