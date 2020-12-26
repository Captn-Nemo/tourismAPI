/**
 * Launches the API Listener
 *
 * Checkout the API implementation in api/v1/vacations.js
 */

// Setup the DB_URI
process.env.DB_URI = require("./config/db.config").DB_URI;

var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
require("./routes/v1/routes.destination")(router);

// Create the express app
app = express();
// Setup the body parser
//app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json()); //{type: '*/*'}));

// Setup the app to use the router
app.use(router);

// Start the listener
app.listen(3000);
console.log("Listening on 3000");
