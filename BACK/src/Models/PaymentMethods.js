const mongoose = require('mongoose')
const { Schema } = mongoose


const paymentMethodSchema = new Schema({
name: {type: String,  lowercase: true, trim: true, required: true, index: true, unique: true, minLength: 5, maxLength: 255}
})

const PaymentMethod = mongoose.model('PaymentMethod', paymentMethodSchema)

module.exports = PaymentMethod