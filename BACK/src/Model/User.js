const mongoose = require('mongoose')
const { Schema } = mongoose


const userSchema = new Schema({
  name: {type: String,  lowercase: true, trim: true, required: true, index: true, unique: true, minLength: 5, maxLength: 255},
  contact: Object,
  email: String,
  password: String,
  favorite: [{
    type: String,
    ref: 'Favorite'
  }],
  role: String,
  reserve: [{
    type: String,
    ref: 'Reserve'
  }],
  restaurant: [{
    type: String,
    ref: 'Restaurant'
  }],
  active: Boolean,

})

const User = mongoose.model('User', userSchema)

module.exports = User