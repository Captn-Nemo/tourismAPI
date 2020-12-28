/**
 * "REST API Kerala Tourism"
 *
 * Model for the Kerala Tourism Destinations.
 */

const { Schema } = require("mongoose");
const settings = require("../dbConfig/db.settings");

var DestinationSchema = settings.mongoose.Schema({
  id: { type: String, required: [true, "id is needed"] },
  name: { type: String, required: [true, "name is needed"] },
  description: { type: String },
  imgUrl: { type: String },
  type: { type: String, required: true },
  location: {
    latitiude: { type: String, required: true },
    longitude: { type: String, required: true },
  },
  attractions: { type: [String] },
  directions: {
    nearestRailway: { type: String },
    nearestAirport: { type: String },
  },
  nearestStay: [
    {
      name: { type: String },
      desc: { type: String },
      phone: { type: String },
      type: { type: String },
      distance: { type: String },
      imgUrl: { type: String },
    },
  ],
});

exports.DestinationSchema = settings.mongoose.model(
  "destinations",
  DestinationSchema
);
