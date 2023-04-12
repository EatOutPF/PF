require("dotenv").config();
const Atmosphere = require("./models/Atmosphere");
const Diet = require("./models/Diet");
const Extra = require("./models/Extra");
const Menu = require("./models/Menu");
const PaymentMethods = require("./models/PaymentMethods");
const Reserve = require("./models/Reserve");
const Restaurant = require("./models/Restaurant");
const Section = require("./models/Section");
const User = require("./models/User");
const Review = require("./models/Review");
const Favorite = require("./models/Favorite");
const Payment = require("./models/Payment");
const { ATLAS_URI } = process.env;
const mongoose = require("mongoose");

mongoose
  .connect(ATLAS_URI, {
    maxPoolSize: 50,
    waitQueueTimeoutMS: 2500,
    useNewUrlParser: true,
  })
  .catch((err) => {
    console.error(err.stack);
    process.exit(1);
  });

module.exports = {
  Atmosphere,
  Diet,
  Extra,
  Menu,
  PaymentMethods,
  Reserve,
  Restaurant,
  Section,
  User,
  Review,
  Favorite,
  Payment,
};
