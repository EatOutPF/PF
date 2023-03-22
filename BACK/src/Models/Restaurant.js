const mongoose = require("mongoose");
const { Schema } = mongoose;

const restaurantSchema = new Schema({
  name: {
    type: String,
    lowercase: true,
    trim: true,
    required: true,
    index: true,
    unique: true,
    minLength: 1,
    maxLength: 255,
  },
  address: [{ type: Schema.Types.Mixed, required: true, unique: true }],
  images: [Schema.Types.Mixed],
  contact: [Schema.Types.Mixed],
  tables: { type: Number, required: true },
  schedule: [Schema.Types.Mixed],
  menu: [
    {
      type: String,
      ref: "Menu",
    },
  ],
  diets: [
    {
      type: String,
      ref: "Diet",
    },
  ],
  paymentMethods: [
    {
      type: String,
      ref: "PaymentMethod",
    },
  ],
  atmosphere: [
    {
      type: String,
      ref: "Atmosphere",
    },
  ],
  extras: [
    {
      type: String,
      ref: "Extra",
    },
  ],
  room: [
    {
      type: String,
      ref: "Room",
    },
  ],
  active: {
    type: Boolean,
    default: true,
  },
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant;

