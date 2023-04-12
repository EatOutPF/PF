const mongoose = require('mongoose')
const { Schema } = mongoose


const userSchema = new Schema({
  name: {type: String,  lowercase: true, trim: true, required: true, index: true, unique: true, minLength: 5, maxLength: 255},
  phone: Number,
  email: {type: String, unique: true},
  // password: String,
  favorite: [{
    type: Schema.Types.ObjectId,
    ref: 'Favorite'
  }],
  reserve: [{
    type: Schema.Types.ObjectId,
    ref: 'Reserve'
  }],
  role: { 
    type: String,
    default: 'user'
  },
  restaurant: [{
    type: Schema.Types.ObjectId,
    ref: 'Restaurant'
  }],
  payment : [{
    type: Schema.Types.ObjectId,
    ref: 'Payment'
  }],
  login: { 
    type: Boolean,
    default: false
  },
  active: {
    type: Boolean,
    default: true,
  },

})

const User = mongoose.model('User', userSchema)

module.exports = User




