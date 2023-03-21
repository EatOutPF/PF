const mongoose = require('mongoose')
const { Schema } = mongoose


const roomSchema = new Schema({
name: {type: String,  lowercase: true, trim: true, required: true, index: true, unique: true, minLength: 5, maxLength: 255}
})

const Room = mongoose.model('Room', roomSchema)

module.exports = Room