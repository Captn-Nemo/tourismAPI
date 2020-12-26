/**
 * All database operations related to the vacations collection will reside in this file
 */
var model = require("../models/model.destinations");
var settings = require("../config/db.settings");

// CREATE the Destinations
exports.save = function (data, callback) {
  new model.DestinationSchema(data).save((err, inserted) => {
    callback(err, inserted);
  });
};

// CREATE multiple destinations
exports.saveMany = (rows, callback) => {
  model.DestinationSchema.insertMany(rows, (err, docs) => {
    callback(err, docs);
  });
};

// UPDATE the destinations
// http://mongoosejs.com/docs/api.html#model_Model.update
exports.update = (criteria, doc, callback) => {
  // Replaced .update() with .updateMany() as .update() is deprecated
  model.DestinationSchema.updateMany(criteria, doc, (err, data) => {
    callback(err, data);
  });
};

// RETRIEVE Destination packages based on criteria
exports.select = (criteria, callback) => {
  model.DestinationSchema.find(criteria, (err, data) => {
    callback(err, data);
  });
};
