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
      date: {
        type: Date,
        default: function() {
          return new Date()
        }
      }
});

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;



