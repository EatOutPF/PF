const mongoose = require('mongoose')
const { Schema } = mongoose


const extraSchema = new Schema({
name: {type: String,  lowercase: true, trim: true, required: true, index: true, unique: true, minLength: 5, maxLength: 255}
})

const Extra = mongoose.model('Extra', extraSchema)

module.exports = Extra