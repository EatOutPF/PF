const mongoose = require('mongoose')
const { Schema } = mongoose


const menuSchema = new Schema({
name: {type: String,  lowercase: true, trim: true, required: true, index: true, unique: true, minLength: 5, maxLength: 255}
})

const Menu = mongoose.model('Menu', menuSchema)

module.exports = Menu