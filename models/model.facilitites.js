/**
 * "REST API Kerala Tourism"
 *
 * Model for the Kerala Tourism Destinations.
 */

const settings = require("../dbConfig/db.settings");

var ImageSchema = settings.mongoose.Schema({
  id: { type: String, required: [true, "id is needed"] },
  shops: [
    {
      Category: {
        type: String,
        enum: [
          "Shopping",
          "Entertainment",
          "Transportation",
          "Health and Fitness",
          "Services/ Other facilities",
        ],
      },
      shopList: [
        {
          name: { tye: String },
          shop_type: { type: String },
          place: { type: String },
          phone: { tyep: [String] },
        },
      ],
    },
  ],
});

exports.ImageSchema = settings.mongoose.model("photos", ImageSchema);
