const mongoose = require('mongoose')
const { Schema } = mongoose


const reserveSchema = new Schema({
  active: Boolean,
  user: [{
    type: String,
    ref: 'User'
  }],
  restaurant: [{
    type: String,
    ref: 'Restaurant'
  }],
  date: {
    type: Date,
    default: Date.now
  },
  time: {
    type: Date,
  }

})

const Reserve = mongoose.model('Reserve', reserveSchema)

module.exports = Reserve