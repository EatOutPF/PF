const mongoose = require('mongoose')
const { Schema } = mongoose


const sectionSchema = new Schema({
name: {type: String,  lowercase: true, trim: true, required: true, index: true, unique: true, minLength: 5, maxLength: 255}
})

const Section = mongoose.model('Section', sectionSchema)

module.exports = Section