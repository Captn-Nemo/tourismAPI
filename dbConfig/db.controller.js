/**
 * All database operations related to the vacations collection will reside in this file
 * CRUD OPERATIONS
 */
var model = require("../models/model.destinations");

// CREATE the Destinations
exports.save = function (data, callback) {
  new model.DestinationSchema(data).save((err, inserted) => {
    callback(err, inserted);
  });
};

// UPDATE the destinations
// http://mongoosejs.com/docs/api.html#model_Model.update
exports.update = (criteria, doc, callback) => {
  // Replaced .update() with .updateMany() as .update() is deprecated
  model.DestinationSchema.updateOne(
    criteria,
    doc,
    { upsert: true },
    (err, data) => {
      callback(err, data);
    }
  );
};

// RETRIEVE Destination packages based on criteria
exports.select = (criteria, options, callback) => {
  model.DestinationSchema.find(criteria, (err, data) => {
    callback(err, data);
  })
    .select(options.fields)
    .skip(options.offset)
    .limit(options.limit);
};

// Delete a destination
exports.delete = (criteria, callback) => {
  model.DestinationSchema.deleteOne(
    criteria,
    (err,
    (data) => {
      callback(err, data);
    })
  );
};

exports.saveMany = (rows, callback) => {
  model.DestinationSchema.insertMany(rows, (err, docs) => {
    callback(err, docs);
  });
};
