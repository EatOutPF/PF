const mongoose = require("mongoose");
const { Schema } = mongoose;

const restaurantSchema = new Schema({
  name: {
    type: String,
    lowercase: true,
    trim: true,
    required: [true, "El nombre del restaurante es obligatorio"],
    index: true,
    minLength: [1, "El nombre del restaurante debe tener al menos 1 carácter"],
    maxLength: [
      255,
      "El nombre del restaurante debe tener un máximo de 255 carácteres",
    ],
  },
  address: {
    streetName: {
      type: String,
      required: [true, "El nombre de la calle es obligatorio"],
    },
    streetNumber: {
      type: Number,
      required: [true, "El número de la calle es obligatorio"],
    },
    neighborhood: String,
    city: {
      type: String,
      required: [true, "El nombre de la ciudad es obligatorio"],
    },
    state: String,
    country: String,
    coordinate: {
      latitude: {
        type: Number,
        required: [
          true,
          "La latitud es obligatoria",
        ],
        min: [-89.999999, "La latitud mínima es de -89.999999"],
        max: [89.999999, "La latitud máxima es de 89.999999"],
      },
      longitude: {
        type: Number,
        required: [true, "La longitud es ogligatoria"],
        min: [-179.999999, "La longitud mínima es de -179.999999"],
        max: [179.999999, "La longitud máxima es de 179.999999"],
      },
    },
  },
  images: [{ type: String }],
  contact: {
    phoneNumber: {
      type: Number,
      unique: [true, "El número de teléfono ya se encuentra registrado"],
      validate: {
        validator: function (v) {
          return /^[0-9]*$/.test(v);
        },
        message: (props) => `${props.value} no es un número válido`,
      },
    },
    email: { type: String, required: true },
    socialMedia: { instagram: String, facebook: String, wpp: Number },
  },
  tables: { type: Number, required: true },
  schedule: {
    monday: { open: String, close: String },
    tuesday: { open: String, close: String },
    wednesday: { open: String, close: String },
    thursday: { open: String, close: String },
    friday: { open: String, close: String },
    saturday: { open: String, close: String },
    sunday: { open: String, close: String },
  },
  ranking: Number,
  advance: Number,
  about: String,
  review: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
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
  review: {
    type: String,
    ref: "Review",
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  favorite: [{
    type: Schema.Types.ObjectId,
    ref: 'Favorite'
  }],
  payment : [{
    type: Schema.Types.ObjectId,
    ref: 'Payment'
  }],
  balance: Number,
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant;



