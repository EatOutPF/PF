const mongoose = require('mongoose')
const { Schema } = mongoose


const atmosphereSchema = new Schema({
name: {type: String,  lowercase: true, trim: true, required: true, index: true, unique: true, minLength: 5, maxLength: 255}
})


const Atmosphere = mongoose.model('Atmosphere', atmosphereSchema)

module.exports = Atmosphere