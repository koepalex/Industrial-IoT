/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator 1.0.0.0
 * Changes may cause incorrect behavior and will be lost if the code is
 * regenerated.
 */

import * as msRest from "@azure/ms-rest-js";


export const BrowseViewApiModel: msRest.CompositeMapper = {
  serializedName: "BrowseViewApiModel",
  type: {
    name: "Composite",
    className: "BrowseViewApiModel",
    modelProperties: {
      viewId: {
        required: true,
        serializedName: "viewId",
        type: {
          name: "String"
        }
      },
      version: {
        serializedName: "version",
        type: {
          name: "Number"
        }
      },
      timestamp: {
        serializedName: "timestamp",
        type: {
          name: "DateTime"
        }
      }
    }
  }
};

export const CredentialApiModel: msRest.CompositeMapper = {
  serializedName: "CredentialApiModel",
  type: {
    name: "Composite",
    className: "CredentialApiModel",
    modelProperties: {
      type: {
        serializedName: "type",
        defaultValue: 'None',
        type: {
          name: "Enum",
          allowedValues: [
            "None",
            "UserName",
            "X509Certificate",
            "JwtToken"
          ]
        }
      },
      value: {
        serializedName: "value",
        type: {
          name: "Object"
        }
      }
    }
  }
};

export const DiagnosticsApiModel: msRest.CompositeMapper = {
  serializedName: "DiagnosticsApiModel",
  type: {
    name: "Composite",
    className: "DiagnosticsApiModel",
    modelProperties: {
      level: {
        serializedName: "level",
        type: {
          name: "Enum",
          allowedValues: [
            "None",
            "Status",
            "Operations",
            "Diagnostics",
            "Verbose"
          ]
        }
      },
      auditId: {
        serializedName: "auditId",
        type: {
          name: "String"
        }
      },
      timeStamp: {
        serializedName: "timeStamp",
        type: {
          name: "DateTime"
        }
      }
    }
  }
};

export const RequestHeaderApiModel: msRest.CompositeMapper = {
  serializedName: "RequestHeaderApiModel",
  type: {
    name: "Composite",
    className: "RequestHeaderApiModel",
    modelProperties: {
      elevation: {
        serializedName: "elevation",
        type: {
          name: "Composite",
          className: "CredentialApiModel"
        }
      },
      locales: {
        serializedName: "locales",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "String"
            }
          }
        }
      },
      diagnostics: {
        serializedName: "diagnostics",
        type: {
          name: "Composite",
          className: "DiagnosticsApiModel"
        }
      }
    }
  }
};

export const BrowseRequestApiModel: msRest.CompositeMapper = {
  serializedName: "BrowseRequestApiModel",
  type: {
    name: "Composite",
    className: "BrowseRequestApiModel",
    modelProperties: {
      nodeId: {
        serializedName: "nodeId",
        type: {
          name: "String"
        }
      },
      direction: {
        serializedName: "direction",
        type: {
          name: "Enum",
          allowedValues: [
            "Forward",
            "Backward",
            "Both"
          ]
        }
      },
      view: {
        serializedName: "view",
        type: {
          name: "Composite",
          className: "BrowseViewApiModel"
        }
      },
      referenceTypeId: {
        serializedName: "referenceTypeId",
        type: {
          name: "String"
        }
      },
      noSubtypes: {
        serializedName: "noSubtypes",
        defaultValue: false,
        type: {
          name: "Boolean"
        }
      },
      maxReferencesToReturn: {
        serializedName: "maxReferencesToReturn",
        type: {
          name: "Number"
        }
      },
      targetNodesOnly: {
        serializedName: "targetNodesOnly",
        defaultValue: false,
        type: {
          name: "Boolean"
        }
      },
      readVariableValues: {
        serializedName: "readVariableValues",
        defaultValue: false,
        type: {
          name: "Boolean"
        }
      },
      header: {
        serializedName: "header",
        type: {
          name: "Composite",
          className: "RequestHeaderApiModel"
        }
      }
    }
  }
};

export const RolePermissionApiModel: msRest.CompositeMapper = {
  serializedName: "RolePermissionApiModel",
  type: {
    name: "Composite",
    className: "RolePermissionApiModel",
    modelProperties: {
      roleId: {
        required: true,
        serializedName: "roleId",
        type: {
          name: "String"
        }
      },
      permissions: {
        serializedName: "permissions",
        type: {
          name: "Enum",
          allowedValues: [
            "Browse",
            "ReadRolePermissions",
            "WriteAttribute",
            "WriteRolePermissions",
            "WriteHistorizing",
            "Read",
            "Write",
            "ReadHistory",
            "InsertHistory",
            "ModifyHistory",
            "DeleteHistory",
            "ReceiveEvents",
            "Call",
            "AddReference",
            "RemoveReference",
            "DeleteNode",
            "AddNode"
          ]
        }
      }
    }
  }
};

export const NodeApiModel: msRest.CompositeMapper = {
  serializedName: "NodeApiModel",
  type: {
    name: "Composite",
    className: "NodeApiModel",
    modelProperties: {
      nodeClass: {
        serializedName: "nodeClass",
        type: {
          name: "Enum",
          allowedValues: [
            "Object",
            "Variable",
            "Method",
            "ObjectType",
            "VariableType",
            "ReferenceType",
            "DataType",
            "View"
          ]
        }
      },
      displayName: {
        serializedName: "displayName",
        type: {
          name: "String"
        }
      },
      nodeId: {
        required: true,
        serializedName: "nodeId",
        type: {
          name: "String"
        }
      },
      description: {
        serializedName: "description",
        type: {
          name: "String"
        }
      },
      browseName: {
        serializedName: "browseName",
        type: {
          name: "String"
        }
      },
      accessRestrictions: {
        serializedName: "accessRestrictions",
        type: {
          name: "Enum",
          allowedValues: [
            "SigningRequired",
            "EncryptionRequired",
            "SessionRequired"
          ]
        }
      },
      writeMask: {
        serializedName: "writeMask",
        type: {
          name: "Number"
        }
      },
      userWriteMask: {
        serializedName: "userWriteMask",
        type: {
          name: "Number"
        }
      },
      isAbstract: {
        serializedName: "isAbstract",
        type: {
          name: "Boolean"
        }
      },
      containsNoLoops: {
        serializedName: "containsNoLoops",
        type: {
          name: "Boolean"
        }
      },
      eventNotifier: {
        serializedName: "eventNotifier",
        type: {
          name: "Enum",
          allowedValues: [
            "SubscribeToEvents",
            "HistoryRead",
            "HistoryWrite"
          ]
        }
      },
      executable: {
        serializedName: "executable",
        type: {
          name: "Boolean"
        }
      },
      userExecutable: {
        serializedName: "userExecutable",
        type: {
          name: "Boolean"
        }
      },
      dataTypeDefinition: {
        serializedName: "dataTypeDefinition",
        type: {
          name: "Object"
        }
      },
      accessLevel: {
        serializedName: "accessLevel",
        type: {
          name: "Enum",
          allowedValues: [
            "CurrentRead",
            "CurrentWrite",
            "HistoryRead",
            "HistoryWrite",
            "SemanticChange",
            "StatusWrite",
            "TimestampWrite",
            "NonatomicRead",
            "NonatomicWrite",
            "WriteFullArrayOnly"
          ]
        }
      },
      userAccessLevel: {
        serializedName: "userAccessLevel",
        type: {
          name: "Enum",
          allowedValues: [
            "CurrentRead",
            "CurrentWrite",
            "HistoryRead",
            "HistoryWrite",
            "SemanticChange",
            "StatusWrite",
            "TimestampWrite",
            "NonatomicRead",
            "NonatomicWrite",
            "WriteFullArrayOnly"
          ]
        }
      },
      dataType: {
        serializedName: "dataType",
        type: {
          name: "String"
        }
      },
      valueRank: {
        serializedName: "valueRank",
        type: {
          name: "Enum",
          allowedValues: [
            "ScalarOrOneDimension",
            "Any",
            "Scalar",
            "OneOrMoreDimensions",
            "OneDimension",
            "TwoDimensions"
          ]
        }
      },
      arrayDimensions: {
        serializedName: "arrayDimensions",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Number"
            }
          }
        }
      },
      historizing: {
        serializedName: "historizing",
        type: {
          name: "Boolean"
        }
      },
      minimumSamplingInterval: {
        serializedName: "minimumSamplingInterval",
        type: {
          name: "Number"
        }
      },
      value: {
        serializedName: "value",
        type: {
          name: "Object"
        }
      },
      inverseName: {
        serializedName: "inverseName",
        type: {
          name: "String"
        }
      },
      symmetric: {
        serializedName: "symmetric",
        type: {
          name: "Boolean"
        }
      },
      rolePermissions: {
        serializedName: "rolePermissions",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "RolePermissionApiModel"
            }
          }
        }
      },
      userRolePermissions: {
        serializedName: "userRolePermissions",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "RolePermissionApiModel"
            }
          }
        }
      },
      typeDefinitionId: {
        serializedName: "typeDefinitionId",
        type: {
          name: "String"
        }
      },
      children: {
        serializedName: "children",
        type: {
          name: "Boolean"
        }
      }
    }
  }
};

export const NodeReferenceApiModel: msRest.CompositeMapper = {
  serializedName: "NodeReferenceApiModel",
  type: {
    name: "Composite",
    className: "NodeReferenceApiModel",
    modelProperties: {
      referenceTypeId: {
        serializedName: "referenceTypeId",
        type: {
          name: "String"
        }
      },
      direction: {
        serializedName: "direction",
        type: {
          name: "Enum",
          allowedValues: [
            "Forward",
            "Backward",
            "Both"
          ]
        }
      },
      target: {
        required: true,
        serializedName: "target",
        type: {
          name: "Composite",
          className: "NodeApiModel"
        }
      }
    }
  }
};

export const ServiceResultApiModel: msRest.CompositeMapper = {
  serializedName: "ServiceResultApiModel",
  type: {
    name: "Composite",
    className: "ServiceResultApiModel",
    modelProperties: {
      statusCode: {
        serializedName: "statusCode",
        type: {
          name: "Number"
        }
      },
      errorMessage: {
        serializedName: "errorMessage",
        type: {
          name: "String"
        }
      },
      diagnostics: {
        serializedName: "diagnostics",
        type: {
          name: "Object"
        }
      }
    }
  }
};

export const BrowseResponseApiModel: msRest.CompositeMapper = {
  serializedName: "BrowseResponseApiModel",
  type: {
    name: "Composite",
    className: "BrowseResponseApiModel",
    modelProperties: {
      node: {
        serializedName: "node",
        type: {
          name: "Composite",
          className: "NodeApiModel"
        }
      },
      references: {
        serializedName: "references",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "NodeReferenceApiModel"
            }
          }
        }
      },
      continuationToken: {
        serializedName: "continuationToken",
        type: {
          name: "String"
        }
      },
      errorInfo: {
        serializedName: "errorInfo",
        type: {
          name: "Composite",
          className: "ServiceResultApiModel"
        }
      }
    }
  }
};

export const BrowseNextRequestApiModel: msRest.CompositeMapper = {
  serializedName: "BrowseNextRequestApiModel",
  type: {
    name: "Composite",
    className: "BrowseNextRequestApiModel",
    modelProperties: {
      continuationToken: {
        required: true,
        serializedName: "continuationToken",
        type: {
          name: "String"
        }
      },
      abort: {
        serializedName: "abort",
        defaultValue: false,
        type: {
          name: "Boolean"
        }
      },
      targetNodesOnly: {
        serializedName: "targetNodesOnly",
        defaultValue: false,
        type: {
          name: "Boolean"
        }
      },
      readVariableValues: {
        serializedName: "readVariableValues",
        defaultValue: false,
        type: {
          name: "Boolean"
        }
      },
      header: {
        serializedName: "header",
        type: {
          name: "Composite",
          className: "RequestHeaderApiModel"
        }
      }
    }
  }
};

export const BrowseNextResponseApiModel: msRest.CompositeMapper = {
  serializedName: "BrowseNextResponseApiModel",
  type: {
    name: "Composite",
    className: "BrowseNextResponseApiModel",
    modelProperties: {
      references: {
        serializedName: "references",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "NodeReferenceApiModel"
            }
          }
        }
      },
      continuationToken: {
        serializedName: "continuationToken",
        type: {
          name: "String"
        }
      },
      errorInfo: {
        serializedName: "errorInfo",
        type: {
          name: "Composite",
          className: "ServiceResultApiModel"
        }
      }
    }
  }
};

export const BrowsePathRequestApiModel: msRest.CompositeMapper = {
  serializedName: "BrowsePathRequestApiModel",
  type: {
    name: "Composite",
    className: "BrowsePathRequestApiModel",
    modelProperties: {
      nodeId: {
        serializedName: "nodeId",
        type: {
          name: "String"
        }
      },
      pathElements: {
        required: true,
        serializedName: "pathElements",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "String"
            }
          }
        }
      },
      readVariableValues: {
        serializedName: "readVariableValues",
        defaultValue: false,
        type: {
          name: "Boolean"
        }
      },
      header: {
        serializedName: "header",
        type: {
          name: "Composite",
          className: "RequestHeaderApiModel"
        }
      }
    }
  }
};

export const NodePathTargetApiModel: msRest.CompositeMapper = {
  serializedName: "NodePathTargetApiModel",
  type: {
    name: "Composite",
    className: "NodePathTargetApiModel",
    modelProperties: {
      target: {
        required: true,
        serializedName: "target",
        type: {
          name: "Composite",
          className: "NodeApiModel"
        }
      },
      remainingPathIndex: {
        serializedName: "remainingPathIndex",
        type: {
          name: "Number"
        }
      }
    }
  }
};

export const BrowsePathResponseApiModel: msRest.CompositeMapper = {
  serializedName: "BrowsePathResponseApiModel",
  type: {
    name: "Composite",
    className: "BrowsePathResponseApiModel",
    modelProperties: {
      targets: {
        serializedName: "targets",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "NodePathTargetApiModel"
            }
          }
        }
      },
      errorInfo: {
        serializedName: "errorInfo",
        type: {
          name: "Composite",
          className: "ServiceResultApiModel"
        }
      }
    }
  }
};

export const MethodMetadataRequestApiModel: msRest.CompositeMapper = {
  serializedName: "MethodMetadataRequestApiModel",
  type: {
    name: "Composite",
    className: "MethodMetadataRequestApiModel",
    modelProperties: {
      methodId: {
        required: true,
        serializedName: "methodId",
        type: {
          name: "String"
        }
      },
      methodBrowsePath: {
        serializedName: "methodBrowsePath",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "String"
            }
          }
        }
      },
      header: {
        serializedName: "header",
        type: {
          name: "Composite",
          className: "RequestHeaderApiModel"
        }
      }
    }
  }
};

export const MethodMetadataArgumentApiModel: msRest.CompositeMapper = {
  serializedName: "MethodMetadataArgumentApiModel",
  type: {
    name: "Composite",
    className: "MethodMetadataArgumentApiModel",
    modelProperties: {
      name: {
        serializedName: "name",
        type: {
          name: "String"
        }
      },
      description: {
        serializedName: "description",
        type: {
          name: "String"
        }
      },
      type: {
        serializedName: "type",
        type: {
          name: "Composite",
          className: "NodeApiModel"
        }
      },
      defaultValue: {
        serializedName: "defaultValue",
        type: {
          name: "Object"
        }
      },
      valueRank: {
        serializedName: "valueRank",
        type: {
          name: "Enum",
          allowedValues: [
            "ScalarOrOneDimension",
            "Any",
            "Scalar",
            "OneOrMoreDimensions",
            "OneDimension",
            "TwoDimensions"
          ]
        }
      },
      arrayDimensions: {
        serializedName: "arrayDimensions",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Number"
            }
          }
        }
      }
    }
  }
};

export const MethodMetadataResponseApiModel: msRest.CompositeMapper = {
  serializedName: "MethodMetadataResponseApiModel",
  type: {
    name: "Composite",
    className: "MethodMetadataResponseApiModel",
    modelProperties: {
      objectId: {
        serializedName: "objectId",
        type: {
          name: "String"
        }
      },
      inputArguments: {
        serializedName: "inputArguments",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "MethodMetadataArgumentApiModel"
            }
          }
        }
      },
      outputArguments: {
        serializedName: "outputArguments",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "MethodMetadataArgumentApiModel"
            }
          }
        }
      },
      errorInfo: {
        serializedName: "errorInfo",
        type: {
          name: "Composite",
          className: "ServiceResultApiModel"
        }
      }
    }
  }
};

export const MethodCallArgumentApiModel: msRest.CompositeMapper = {
  serializedName: "MethodCallArgumentApiModel",
  type: {
    name: "Composite",
    className: "MethodCallArgumentApiModel",
    modelProperties: {
      value: {
        serializedName: "value",
        type: {
          name: "Object"
        }
      },
      dataType: {
        serializedName: "dataType",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const MethodCallRequestApiModel: msRest.CompositeMapper = {
  serializedName: "MethodCallRequestApiModel",
  type: {
    name: "Composite",
    className: "MethodCallRequestApiModel",
    modelProperties: {
      methodId: {
        serializedName: "methodId",
        type: {
          name: "String"
        }
      },
      objectId: {
        serializedName: "objectId",
        type: {
          name: "String"
        }
      },
      argumentsProperty: {
        serializedName: "arguments",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "MethodCallArgumentApiModel"
            }
          }
        }
      },
      methodBrowsePath: {
        serializedName: "methodBrowsePath",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "String"
            }
          }
        }
      },
      objectBrowsePath: {
        serializedName: "objectBrowsePath",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "String"
            }
          }
        }
      },
      header: {
        serializedName: "header",
        type: {
          name: "Composite",
          className: "RequestHeaderApiModel"
        }
      }
    }
  }
};

export const MethodCallResponseApiModel: msRest.CompositeMapper = {
  serializedName: "MethodCallResponseApiModel",
  type: {
    name: "Composite",
    className: "MethodCallResponseApiModel",
    modelProperties: {
      results: {
        serializedName: "results",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "MethodCallArgumentApiModel"
            }
          }
        }
      },
      errorInfo: {
        serializedName: "errorInfo",
        type: {
          name: "Composite",
          className: "ServiceResultApiModel"
        }
      }
    }
  }
};

export const PublishedItemApiModel: msRest.CompositeMapper = {
  serializedName: "PublishedItemApiModel",
  type: {
    name: "Composite",
    className: "PublishedItemApiModel",
    modelProperties: {
      nodeId: {
        required: true,
        serializedName: "nodeId",
        type: {
          name: "String"
        }
      },
      browsePath: {
        serializedName: "browsePath",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "String"
            }
          }
        }
      },
      nodeAttribute: {
        serializedName: "nodeAttribute",
        type: {
          name: "Enum",
          allowedValues: [
            "NodeClass",
            "BrowseName",
            "DisplayName",
            "Description",
            "WriteMask",
            "UserWriteMask",
            "IsAbstract",
            "Symmetric",
            "InverseName",
            "ContainsNoLoops",
            "EventNotifier",
            "Value",
            "DataType",
            "ValueRank",
            "ArrayDimensions",
            "AccessLevel",
            "UserAccessLevel",
            "MinimumSamplingInterval",
            "Historizing",
            "Executable",
            "UserExecutable",
            "DataTypeDefinition",
            "RolePermissions",
            "UserRolePermissions",
            "AccessRestrictions"
          ]
        }
      },
      publishingInterval: {
        serializedName: "publishingInterval",
        type: {
          name: "Number"
        }
      },
      samplingInterval: {
        serializedName: "samplingInterval",
        type: {
          name: "Number"
        }
      }
    }
  }
};

export const PublishStartRequestApiModel: msRest.CompositeMapper = {
  serializedName: "PublishStartRequestApiModel",
  type: {
    name: "Composite",
    className: "PublishStartRequestApiModel",
    modelProperties: {
      item: {
        required: true,
        serializedName: "item",
        type: {
          name: "Composite",
          className: "PublishedItemApiModel"
        }
      },
      header: {
        serializedName: "header",
        type: {
          name: "Composite",
          className: "RequestHeaderApiModel"
        }
      }
    }
  }
};

export const PublishStartResponseApiModel: msRest.CompositeMapper = {
  serializedName: "PublishStartResponseApiModel",
  type: {
    name: "Composite",
    className: "PublishStartResponseApiModel",
    modelProperties: {
      errorInfo: {
        serializedName: "errorInfo",
        type: {
          name: "Composite",
          className: "ServiceResultApiModel"
        }
      }
    }
  }
};

export const PublishStopRequestApiModel: msRest.CompositeMapper = {
  serializedName: "PublishStopRequestApiModel",
  type: {
    name: "Composite",
    className: "PublishStopRequestApiModel",
    modelProperties: {
      nodeId: {
        required: true,
        serializedName: "nodeId",
        type: {
          name: "String"
        }
      },
      browsePath: {
        serializedName: "browsePath",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "String"
            }
          }
        }
      },
      nodeAttribute: {
        serializedName: "nodeAttribute",
        type: {
          name: "Enum",
          allowedValues: [
            "NodeClass",
            "BrowseName",
            "DisplayName",
            "Description",
            "WriteMask",
            "UserWriteMask",
            "IsAbstract",
            "Symmetric",
            "InverseName",
            "ContainsNoLoops",
            "EventNotifier",
            "Value",
            "DataType",
            "ValueRank",
            "ArrayDimensions",
            "AccessLevel",
            "UserAccessLevel",
            "MinimumSamplingInterval",
            "Historizing",
            "Executable",
            "UserExecutable",
            "DataTypeDefinition",
            "RolePermissions",
            "UserRolePermissions",
            "AccessRestrictions"
          ]
        }
      },
      diagnostics: {
        serializedName: "diagnostics",
        type: {
          name: "Composite",
          className: "DiagnosticsApiModel"
        }
      }
    }
  }
};

export const PublishStopResponseApiModel: msRest.CompositeMapper = {
  serializedName: "PublishStopResponseApiModel",
  type: {
    name: "Composite",
    className: "PublishStopResponseApiModel",
    modelProperties: {
      errorInfo: {
        serializedName: "errorInfo",
        type: {
          name: "Composite",
          className: "ServiceResultApiModel"
        }
      }
    }
  }
};

export const PublishedItemListRequestApiModel: msRest.CompositeMapper = {
  serializedName: "PublishedItemListRequestApiModel",
  type: {
    name: "Composite",
    className: "PublishedItemListRequestApiModel",
    modelProperties: {
      continuationToken: {
        serializedName: "continuationToken",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const PublishedItemListResponseApiModel: msRest.CompositeMapper = {
  serializedName: "PublishedItemListResponseApiModel",
  type: {
    name: "Composite",
    className: "PublishedItemListResponseApiModel",
    modelProperties: {
      items: {
        serializedName: "items",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "PublishedItemApiModel"
            }
          }
        }
      },
      continuationToken: {
        serializedName: "continuationToken",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const ValueReadRequestApiModel: msRest.CompositeMapper = {
  serializedName: "ValueReadRequestApiModel",
  type: {
    name: "Composite",
    className: "ValueReadRequestApiModel",
    modelProperties: {
      nodeId: {
        required: true,
        serializedName: "nodeId",
        type: {
          name: "String"
        }
      },
      browsePath: {
        serializedName: "browsePath",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "String"
            }
          }
        }
      },
      indexRange: {
        serializedName: "indexRange",
        type: {
          name: "String"
        }
      },
      header: {
        serializedName: "header",
        type: {
          name: "Composite",
          className: "RequestHeaderApiModel"
        }
      }
    }
  }
};

export const ValueReadResponseApiModel: msRest.CompositeMapper = {
  serializedName: "ValueReadResponseApiModel",
  type: {
    name: "Composite",
    className: "ValueReadResponseApiModel",
    modelProperties: {
      value: {
        serializedName: "value",
        type: {
          name: "Object"
        }
      },
      dataType: {
        serializedName: "dataType",
        type: {
          name: "String"
        }
      },
      sourcePicoseconds: {
        serializedName: "sourcePicoseconds",
        type: {
          name: "Number"
        }
      },
      sourceTimestamp: {
        serializedName: "sourceTimestamp",
        type: {
          name: "DateTime"
        }
      },
      serverPicoseconds: {
        serializedName: "serverPicoseconds",
        type: {
          name: "Number"
        }
      },
      serverTimestamp: {
        serializedName: "serverTimestamp",
        type: {
          name: "DateTime"
        }
      },
      errorInfo: {
        serializedName: "errorInfo",
        type: {
          name: "Composite",
          className: "ServiceResultApiModel"
        }
      }
    }
  }
};

export const AttributeReadRequestApiModel: msRest.CompositeMapper = {
  serializedName: "AttributeReadRequestApiModel",
  type: {
    name: "Composite",
    className: "AttributeReadRequestApiModel",
    modelProperties: {
      nodeId: {
        required: true,
        serializedName: "nodeId",
        type: {
          name: "String"
        }
      },
      attribute: {
        required: true,
        serializedName: "attribute",
        type: {
          name: "Enum",
          allowedValues: [
            "NodeClass",
            "BrowseName",
            "DisplayName",
            "Description",
            "WriteMask",
            "UserWriteMask",
            "IsAbstract",
            "Symmetric",
            "InverseName",
            "ContainsNoLoops",
            "EventNotifier",
            "Value",
            "DataType",
            "ValueRank",
            "ArrayDimensions",
            "AccessLevel",
            "UserAccessLevel",
            "MinimumSamplingInterval",
            "Historizing",
            "Executable",
            "UserExecutable",
            "DataTypeDefinition",
            "RolePermissions",
            "UserRolePermissions",
            "AccessRestrictions"
          ]
        }
      }
    }
  }
};

export const ReadRequestApiModel: msRest.CompositeMapper = {
  serializedName: "ReadRequestApiModel",
  type: {
    name: "Composite",
    className: "ReadRequestApiModel",
    modelProperties: {
      attributes: {
        required: true,
        serializedName: "attributes",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "AttributeReadRequestApiModel"
            }
          }
        }
      },
      header: {
        serializedName: "header",
        type: {
          name: "Composite",
          className: "RequestHeaderApiModel"
        }
      }
    }
  }
};

export const AttributeReadResponseApiModel: msRest.CompositeMapper = {
  serializedName: "AttributeReadResponseApiModel",
  type: {
    name: "Composite",
    className: "AttributeReadResponseApiModel",
    modelProperties: {
      value: {
        serializedName: "value",
        type: {
          name: "Object"
        }
      },
      errorInfo: {
        serializedName: "errorInfo",
        type: {
          name: "Composite",
          className: "ServiceResultApiModel"
        }
      }
    }
  }
};

export const ReadResponseApiModel: msRest.CompositeMapper = {
  serializedName: "ReadResponseApiModel",
  type: {
    name: "Composite",
    className: "ReadResponseApiModel",
    modelProperties: {
      results: {
        serializedName: "results",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "AttributeReadResponseApiModel"
            }
          }
        }
      }
    }
  }
};

export const StatusResponseApiModel: msRest.CompositeMapper = {
  serializedName: "StatusResponseApiModel",
  type: {
    name: "Composite",
    className: "StatusResponseApiModel",
    modelProperties: {
      name: {
        readOnly: true,
        serializedName: "name",
        type: {
          name: "String"
        }
      },
      status: {
        serializedName: "status",
        type: {
          name: "String"
        }
      },
      currentTime: {
        readOnly: true,
        serializedName: "currentTime",
        type: {
          name: "String"
        }
      },
      startTime: {
        readOnly: true,
        serializedName: "startTime",
        type: {
          name: "String"
        }
      },
      upTime: {
        readOnly: true,
        serializedName: "upTime",
        type: {
          name: "Number"
        }
      },
      uid: {
        readOnly: true,
        serializedName: "uid",
        type: {
          name: "String"
        }
      },
      properties: {
        readOnly: true,
        serializedName: "properties",
        type: {
          name: "Dictionary",
          value: {
            type: {
              name: "String"
            }
          }
        }
      },
      dependencies: {
        readOnly: true,
        serializedName: "dependencies",
        type: {
          name: "Dictionary",
          value: {
            type: {
              name: "String"
            }
          }
        }
      },
      metadata: {
        readOnly: true,
        serializedName: "$metadata",
        type: {
          name: "Dictionary",
          value: {
            type: {
              name: "String"
            }
          }
        }
      }
    }
  }
};

export const ValueWriteRequestApiModel: msRest.CompositeMapper = {
  serializedName: "ValueWriteRequestApiModel",
  type: {
    name: "Composite",
    className: "ValueWriteRequestApiModel",
    modelProperties: {
      nodeId: {
        required: true,
        serializedName: "nodeId",
        type: {
          name: "String"
        }
      },
      browsePath: {
        serializedName: "browsePath",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "String"
            }
          }
        }
      },
      value: {
        required: true,
        serializedName: "value",
        type: {
          name: "Object"
        }
      },
      dataType: {
        serializedName: "dataType",
        type: {
          name: "String"
        }
      },
      indexRange: {
        serializedName: "indexRange",
        type: {
          name: "String"
        }
      },
      header: {
        serializedName: "header",
        type: {
          name: "Composite",
          className: "RequestHeaderApiModel"
        }
      }
    }
  }
};

export const ValueWriteResponseApiModel: msRest.CompositeMapper = {
  serializedName: "ValueWriteResponseApiModel",
  type: {
    name: "Composite",
    className: "ValueWriteResponseApiModel",
    modelProperties: {
      errorInfo: {
        serializedName: "errorInfo",
        type: {
          name: "Composite",
          className: "ServiceResultApiModel"
        }
      }
    }
  }
};

export const AttributeWriteRequestApiModel: msRest.CompositeMapper = {
  serializedName: "AttributeWriteRequestApiModel",
  type: {
    name: "Composite",
    className: "AttributeWriteRequestApiModel",
    modelProperties: {
      nodeId: {
        required: true,
        serializedName: "nodeId",
        type: {
          name: "String"
        }
      },
      attribute: {
        required: true,
        serializedName: "attribute",
        type: {
          name: "Enum",
          allowedValues: [
            "NodeClass",
            "BrowseName",
            "DisplayName",
            "Description",
            "WriteMask",
            "UserWriteMask",
            "IsAbstract",
            "Symmetric",
            "InverseName",
            "ContainsNoLoops",
            "EventNotifier",
            "Value",
            "DataType",
            "ValueRank",
            "ArrayDimensions",
            "AccessLevel",
            "UserAccessLevel",
            "MinimumSamplingInterval",
            "Historizing",
            "Executable",
            "UserExecutable",
            "DataTypeDefinition",
            "RolePermissions",
            "UserRolePermissions",
            "AccessRestrictions"
          ]
        }
      },
      value: {
        required: true,
        serializedName: "value",
        type: {
          name: "Object"
        }
      }
    }
  }
};

export const WriteRequestApiModel: msRest.CompositeMapper = {
  serializedName: "WriteRequestApiModel",
  type: {
    name: "Composite",
    className: "WriteRequestApiModel",
    modelProperties: {
      attributes: {
        required: true,
        serializedName: "attributes",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "AttributeWriteRequestApiModel"
            }
          }
        }
      },
      header: {
        serializedName: "header",
        type: {
          name: "Composite",
          className: "RequestHeaderApiModel"
        }
      }
    }
  }
};

export const AttributeWriteResponseApiModel: msRest.CompositeMapper = {
  serializedName: "AttributeWriteResponseApiModel",
  type: {
    name: "Composite",
    className: "AttributeWriteResponseApiModel",
    modelProperties: {
      errorInfo: {
        serializedName: "errorInfo",
        type: {
          name: "Composite",
          className: "ServiceResultApiModel"
        }
      }
    }
  }
};

export const WriteResponseApiModel: msRest.CompositeMapper = {
  serializedName: "WriteResponseApiModel",
  type: {
    name: "Composite",
    className: "WriteResponseApiModel",
    modelProperties: {
      results: {
        serializedName: "results",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "AttributeWriteResponseApiModel"
            }
          }
        }
      }
    }
  }
};
