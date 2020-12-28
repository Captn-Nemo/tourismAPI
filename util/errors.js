/**
 * Maintains all error codes
 * You may externalize this file and read it as JSON data at the time of initialization
 */
exports.errors = {
  // This is a catch all error
  // Ideally this should never be thrown
  UNKNOWN_ERROR: {
    code: 5000,
    text: "Unknown error !!!",
    hints: [
      "Please contact development team wit information on 'how to reproduce this error'. Thank you for your help and support.",
    ],
    info: "http://keralatourism/destinations/unknownerror",
  },

  DESTINATION_ID_ALREADY_EXISTS: {
    code: 6000,
    text: "Destination  with the provided 'id' already exist",
    hints: ["Please use PUT for update instead of POST"],
    info: "http://keralatourism/destinations/errors#6000",
  },

  // All required/missing field errors start with number 7
  MISSING_DESTINATION_TYPE: {
    code: 7000,
    text: "Required field destination 'type' is missing",
    hints: [
      "Please check that user has provided the non null value for 'type'",
    ],
    info: "http://keralatourism/destinations/error#RequiredFields",
  },
  MISSING_DESTINATION_ID: {
    code: 7001,
    text: "Required field destination 'id' is missing",
    hints: ["Please check that user has provided the non null value for 'id'"],
    info: "http://keralatourism/destinations/error#RequiredFields",
  },
  MISSING_DESTINATION_NAME: {
    code: 7002,
    text: "Required field destination 'name' is missing",
    hints: [
      "Please check that user has provided the non null value for 'name'",
    ],
    info: "http://keralatourism/destinations/error#RequiredFields",
  },
  MISSING_DESTINATION_TYPE: {
    code: 7003,
    text: "Required field destinaton 'type' is missing",
    hints: [
      "Please check that user has provided the non null value for description",
    ],
    info: "http://keralatourism/destinations/error#RequiredFields",
  },
  MISSING_DESTINATION_LOCATION_COORDINATES: {
    code: 7004,
    text: "Required fields destinaton 'location coordinates' is missing",
    hints: [
      "Please check that user has provided the non null value for description",
    ],
    info: "http://keralatourism/destinations/error#RequiredFields",
  },
};

/**
 * Utility methods
 * Creates the error response body to be sent back to the caller
 */
exports.create = function (
  message,
  httpMethod,
  endpointInformation,
  errorList,
  receivedPayload
) {
  return {
    // Meant for the developer
    text: message,
    timestamp: new Date(),
    // POST, GET ....
    method: httpMethod,
    // Endpoint information
    endpoint: endpointInformation,
    // An array of all errors
    errors: errorList,
    // OPTIONAL - Use only during development
    payload: receivedPayload,
  };
};

// Mongoose validation error types
exports.kinds = {
  REQUIRED: "required",
  NOT_VALID: "notvalid",
  NUMBER_ERROR: "Number",
  MIN_ERROR: "min",
  MAX_ERROR: "max",
};
