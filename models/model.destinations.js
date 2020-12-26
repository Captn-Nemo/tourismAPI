/**
 * "REST API Kerala Tourism"
 *
 * Model for the Kerala Tourism Destinations.
 */

const settings = require("../config/db.settings");

var DestinationSchema = settings.mongoose.Schema({
  id: { type: String, required: [true, "id is needed"] },
  name: { type: String, required: [true, "name is needed"] },
  description: { type: String, required: true },
  imgUrl: { type: String },
  type: { type: String },
  location: {
    latitiude: { type: String },
    longitude: { type: String },
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
