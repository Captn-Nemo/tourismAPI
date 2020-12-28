/**
 * Simple tests for all DB operations
 *
 * Adds the test data to the Database = vacation Collection = vacations
 */

// Setup the DB_URI
process.env.DB_URI = require("../dbConfig/db.config").DB_URI;

//Test#1  Insert the Vacation data
var db = require("../dbConfig/db.controller");
var data = require("../data/data.destinations");

// Save a single row
db.save(data.SingleRow, function (err, saved) {
  if (err) {
    console.log("Failed single row save");
    //console.log(err)
    //process.exit(1)
  } else {
    console.log("Success - Save single row - %s", saved.name);
  }
});

// Save multiple rows
db.saveMany(data.MultipleRows, function (err, docs) {
  if (err) {
    console.log("Failed multiple row insert");
    //console.log(err)
    //process.exit(1)
  } else {
    console.log("Success - Multiple rows inserted - %d", docs.length);
  }
});

// var selectCriteria = { validTill: { $gt: new Date() } };
// db.select(selectCriteria, function (err, data) {
//   if (err) {
//     console.log("Failed to get vacations : %s", criteria);
//     console.log(err);
//   } else {
//     console.log(
//       "Successfully selected %d documents for %s",
//       data.length,
//       JSON.stringify(selectCriteria)
//     );
//   }
// });

// var updateCriteria = { name: "BAHAMAS1000" };
// var doc = { description: "UPDATED Desc for TESTING" };
// db.update(updateCriteria, doc, function (err, doc) {
//   if (err) {
//     console.log("Failed to get update");
//     console.log(err);
//   } else {
//     console.log("Successfully updated with criteria %s", updateCriteria);
//   }
// });
