const mongoose = require("mongoose");
const { Schema } = mongoose;

const reviewSchema = new Schema({
  review: {
    type: String,
    lowercase: true,
    trim: true,
    required: true,
    index: true,
    unique: true,
    minLength: 5,
    maxLength: 255
  },
  score: { type: Number, required: true },
  restaurant: {
      type: Schema.Types.ObjectId,
      ref: "Restaurant"
    },
  user: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
