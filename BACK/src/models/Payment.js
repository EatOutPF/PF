const mongoose = require("mongoose");
const { Schema } = mongoose;

const paymentSchema = new Schema({
  amount: { type: Number, required: true},
  restaurant: [{
      type: Schema.Types.ObjectId,
      ref: "Restaurant"
    }],
  user: [{
      type: Schema.Types.ObjectId,
      ref: "User"
    }],
    reserve: [{
        type: Schema.Types.ObjectId,
        ref: "Reserve"
      }],
});

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;



