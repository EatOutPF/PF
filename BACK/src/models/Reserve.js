const mongoose = require('mongoose')
const { Schema } = mongoose


const reserveSchema = new Schema({
  user: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  restaurant: [{
    type: Schema.Types.ObjectId,
    ref: 'Restaurant'
  }],
  date: {
    type: Date,
  },
  payment:  [{
    type: Schema.Types.ObjectId,
    ref: 'Payment'
  }],
  table: Number,

})




const Reserve = mongoose.model('Reserve', reserveSchema)

module.exports = Reserve



