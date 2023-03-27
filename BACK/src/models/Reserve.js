const mongoose = require('mongoose')
const { Schema } = mongoose


const reserveSchema = new Schema({
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
  },
  time: {
    type: String,
  },
  payment: Number,
  table: Number,

})

const Reserve = mongoose.model('Reserve', reserveSchema)

module.exports = Reserve