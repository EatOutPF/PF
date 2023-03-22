const mongoose = require("mongoose");
const { Schema } = mongoose;

const dietSchema = new Schema({
  name: {type: String,  lowercase: true, trim: true, required: true, index: true, unique: true, minLength: 5, maxLength: 255},
});

const Diet = mongoose.model("Diet", dietSchema);

module.exports = Diet;
