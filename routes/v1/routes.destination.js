/**
 * Contains the definition of the API endpoints for vacation packages
 */
// As a best practice keep the resource name same as the file name
var RESOURCE_NAME = "destinations";
var VERSION = "v1";
var URI = "/" + VERSION + "/" + RESOURCE_NAME;

// Setup the vacations db
const { select, save, update } = require("../../dbConfig/db.controller");
const { errors, create, kinds } = require("../../util/errors");
const { _errors } = require("../../util/messages");

module.exports = function (router) {
  "use strict";
  // RETRIEVE all active destinations
  // INCLUDES PAGINATION , PARTIAL RESPONSE AND CACHE CONTROL
  router.route(URI).get(function (req, res, next) {
    console.log("GET Destinations");
    //1. paginations and partial response
    const { limit = 0, offset = 0, fields = {} } = req.query;
    var criteria = {};
    var options = {
      fields: createFields(fields),
      limit: parseInt(limit),
      offset: parseInt(offset),
    };

    //2. execute the query
    select(criteria, options, (err, docs) => {
      if (err) {
        console.log(err);
        res.status(500);
        res.send("Error connecting to db");
      } else {
        if (docs.length == 0) {
          res.status(404);
        }
        console.log("Retrieved destinations = %d", docs.length);
        res.set("Cache-control", "public, max-age=60");
        res.send(docs);
      }
    });
  });

  // RETRIEVE  a destination based on id
  router.route(`${URI}/find/id`).get(function (req, res, next) {
    console.log("GET Destination BY ID");
    //1. Setup query criteria for the active pacakages
    var criteria = { id: req.query.id };
    console.log(criteria);

    //2. execute the query
    select(criteria, (err, docs) => {
      if (err) {
        console.log(err);
        res.status(500);
        res.send("Error connecting to db");
      } else {
        if (docs.length == 0) {
          res.status(404);
        }
        console.log("Retrieved destinations = %d", docs.length);
        res.set("Cache-control", "public, max-age=60");
        res.send(docs);
      }
    });
  });

  // RETRIEVE  a destination based on name
  router.route(`${URI}/find/name`).get(function (req, res, next) {
    console.log("GET Destination by Name");
    //1. Setup query criteria for the active pacakages
    var quertText = req.query.name;
    var criteria = { name: { $regex: `${quertText}` } };
    //2. execute the query
    select(criteria, (err, docs) => {
      if (err) {
        console.log(err);
        res.status(500);
        res.send("Error connecting to db");
      } else {
        if (docs.length == 0) {
          res.status(404);
        }
        console.log("Retrieved destinations = %d", docs.length);
        res.set("Cache-control", "public, max-age=60");
        res.send(docs);
      }
    });
  });

  // CREATE new destination
  router.route(URI).post(function (req, res, next) {
    console.log("POST  Destinations");

    //1. Get the data
    var doc = req.body;
    //2. Call the insert method
    save(doc, function (err, saved) {
      if (err) {
        // Creates the error response

        var userError = processMongooseErrors(
          _errors.API_MESSAGE_CREATE_FAILED,
          "POST",
          URI,
          err,
          {}
        );
        res.setHeader("content-type", "application/json");
        res.status(400).send(userError);
      } else {
        res.send(saved);
      }
    });
  });

  // Update a destination based on id
  router.route(URI).put(function (req, res, next) {
    console.log("Update a Destination");
    //1. Get the criteria here it is id of the destination
    var criteria = { id: req.body.id };
    var doc = req.body;
    update(criteria, doc, function (err, saved) {
      if (err) {
        // Creates the error response
        var userError = processMongooseErrors(
          _errors.RESOURCE_NOT_FOUND_ERROR,
          "PUT",
          URI,
          err,
          {}
        );
        res.setHeader("content-type", "application/json");
        res.status(404).send(userError);
      } else {
        res.send("Resource Updated Successfully");
      }
    });
  });

  // Update a destination based on id
  router.route(URI).delete(function (req, res, next) {
    console.log("Delete a Destination");
    //1. Get the criteria here it is id of the destination
    var criteria = { id: req.body.id };
    update(criteria, function (err, saved) {
      if (err) {
        // Creates the error response
        var userError = processMongooseErrors(
          _errors.RESOURCE_NOT_FOUND_ERROR,
          "PUT",
          URI,
          err,
          {}
        );
        res.setHeader("content-type", "application/json");
        res.status(404).send(userError);
      } else {
        res.send("Resource Deleted Successfully");
      }
    });
  });
};
/**
 * Converts the Mongoose validation errors to API specific errors
 */
var processMongooseErrors = function (message, method, endpoint, err, payload) {
  var errorList = [];
  // Check for validation error
  if (err.name === "ValidationError") {
    errorList = processValidationErrors(err);
  } else if (err.code == 11000) {
    // it could be database error - 11000 is for duplicate key
    errorList.push(errors.DESTINATION_ID_ALREADY_EXISTS);
  } else {
    var errUnknown = errors.UNKNOWN_ERROR;
    errUnknown.payload = err;
    errorList = [errors.UNKNOWN_ERROR];
  }
  return create(message, method, endpoint, errorList, payload);
};

/**
 * Converts Mongoose errors to API specific errors
 */
var processValidationErrors = function (err) {
  var errorList = [];

  // Check if id of the destination is missing
  if (err.errors.id) {
    if (err.errors.id.kind === kinds.REQUIRED) {
      errorList.push(errors.MISSING_DESTINATION_ID);
    }
  }
  // Check if name of the destination is missing
  if (err.errors.name) {
    if (err.errors.name.kind === kinds.REQUIRED) {
      errorList.push(errors.MISSING_DESTINATION_NAME);
    }
  }
  // Check if type of the destination is missing
  if (err.errors.type) {
    if (err.errors.name.kind === kinds.REQUIRED) {
      errorList.push(errors.MISSING_DESTINATION_TYPE);
    }
  }

  // Check if latitiude of the destination is missing
  if (err.errors.latitiude) {
    if (err.errors.latitiude.kind === kinds.REQUIRED) {
      errorList.push(errors.MISSING_DESTINATION_LOCATION_COORDINATES);
    }
  }
  // Check if longitude of the destination is missing
  if (err.errors.longitude) {
    if (err.errors.longitude.kind === kinds.REQUIRED) {
      errorList.push(errors.MISSING_DESTINATION_LOCATION_COORDINATES);
    }
  }

  return errorList;
};

const createFields = (str) => {
  console.log(str);
  if (typeof str === "object") return {};
  else {
    var arr = str.split(",");
    str = "{";
    for (var i = 0; i < arr.length; i++) {
      str += '"' + arr[i] + '":1';
      if (i < arr.length - 1) str += ",";
    }
    str += "}";
    return JSON.parse(str);
  }
};
