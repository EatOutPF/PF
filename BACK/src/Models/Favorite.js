const mongoose = require('mongoose')
const { Schema } = mongoose


const favoriteSchema = new Schema({
  user: [{
    type: String,
    ref: 'User'
  }],
  restaurant: [{
    type: String,
    ref: 'Restaurant'
  }],

})

const Favorite = mongoose.model('Favorite', favoriteSchema)

module.exports = Favorite