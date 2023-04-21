const mongoose = require("mongoose");
const { Schema } = mongoose;

const favoriteSchema = new Schema({
  
  restaurant: {
      type: Schema.Types.ObjectId,
      ref: "Restaurant"
    },
  user: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
});

const Favorite = mongoose.model("Favorite", favoriteSchema);

module.exports = Favorite;






