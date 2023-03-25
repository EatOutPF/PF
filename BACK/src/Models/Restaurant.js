const mongoose = require("mongoose");
const { Schema } = mongoose;

const restaurantSchema = new Schema({
  name: {
    type: String,
    lowercase: true,
    trim: true,
    required: true,
    index: true,
    minLength: 1,
    maxLength: 255,
  },
  address: [
    {
      streetName: {
        type: String,
        required: true,
      },
      streetNumber: Number,
      neighborhood: String,
      city: String,
      state: String,
      coordinate: {
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true },
      },
    },
  ],
  images: [{ type: String}],
  contact: [
    {
      phoneNumber: { type: Number, unique: true },
      email: { type: String, required: true },
      socialMedia: { instagram: String, facebook: String, wpp: Number },
    },
  ],
  tables: { type: Number, required: true },
  schedule: [
    {
      monday: { open: String, close: String },
      tuesday: { open: String, close: String },
      wednesday: { open: String, close: String },
      thursday: { open: String, close: String },
      friday: { open: String, close: String },
      saturday: { open: String, close: String },
      sunday: { open: String, close: String },
    },
  ],
  ranking: Number,
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
  section: [
    {
      type: String,
      ref: "Section",
    },
  ],
  active: {
    type: Boolean,
    default: true,
  },
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant;
