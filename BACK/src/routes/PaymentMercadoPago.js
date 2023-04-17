const { Router } = require("express");
const express = require("express");
const mercadopago = require("mercadopago");
const cors = require("cors")
const corsOptions = {
  origin: "*",
  optionSuccessStatus: 200,
};

const router = Router();
router.use(express.json());
router.use(cors(corsOptions));

/* ----------MERCADOPAGO---------- */

router.post("/", (req, res) => {
 
  const restaurant = req.body.props;
  const user = req.body.user;
  const reserve = req.body.reserve;
  console.log(restaurant, user, reserve)
  let preference = {
    items: [
      {
        id: restaurant._id,
        title: restaurant.name,
        currency_id: "ARS",
        quantity: 1,
        unit_price: restaurant.advance,
      },
    ],
    payer: {
      "name": user.name,
      "email": user.email,
    },
    back_urls: {
      success: "eatout-lac.vercel.app/paymentstatus?deep_link=" + encodeURIComponent("eatout://eatout-lac.vercel.app/paymentstatus"),
      failure: "eatout-lac.vercel.app/paymentstatus",
      pending: "eatout-lac.vercel.app/paymentstatus",
    },
   auto_return: "approved",
    binary_mode: true,
    metadata : {user: user._id, restaurant: restaurant.id, reserve},
    external_reference : `${restaurant.id}__${user._id}__${Date.now()}`
  };
  console.log(preference.external_reference)

  mercadopago.preferences
    .create(preference)
    .then((response) => {
      //    res.redirect(`/SENDEMAIL?email=${chosenRestaurant.contact.email}&name=${chosenRestaurant.name}&price=${chosenRestaurant.advance}`
      //    );
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(404).send(error.message);
    });

});

module.exports = router;
