const mongoose = require('mongoose')
const { Schema } = mongoose


const restaurantSchema = new Schema({
  name: {type: String,  lowercase: true, trim: true, required: true, index: true, unique: true, minLength: 5, maxLength: 255},
  address: {type: Object, required: true},
  images: [String],
  contact: Object,
  tables: {type: Number, required: true},
  menu: [{
    type: String,
    ref: 'Menu'
  }],
  diets: [{
    type: String,
    ref: 'Diet'
  }],
  paymentMethods: [{
    type: String,
    ref: 'PaymentMethod'
  }],
  atmosphere: [{
    type: String,
    ref: 'Atmosphere'
  }],
  schedule: [String],
  extras: [{
    type: String,
    ref: 'Extra'
  }],
  room: [{
    type: String,
    ref: 'Room'
  }],
  active: Boolean,

})

const Restaurant = mongoose.model('Restaurant', restaurantSchema)

module.exports = Restaurant