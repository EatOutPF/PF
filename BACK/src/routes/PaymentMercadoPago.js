const { Router } = require("express");
const express = require("express");
const mercadopago = require("mercadopago");

const router = Router();
router.use(express.json());

/* ----------MERCADOPAGO---------- */

router.post("/", (req, res) => {
  
  const restaurant = req.body.resto;
  const user = req.body.user;
  const reserve = req.body.reserve;
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
      success: "localhost:3000/paymentstatus",
      failure: "localhost:3000/paymentstatus",
      pending: "localhost:3000/paymentstatus",
    },
   auto_return: "approved",
    binary_mode: true,
    metadata : {user: user._id, restaurant: restaurant._id, reserve},
    external_reference : `${restaurant.name}__${user.name}__${reserve.date}`
  };
  mercadopago.preferences
    .create(preference)

    .then((response) => {
  //    res.redirect(`/SENDEMAIL?email=${chosenRestaurant.contact.email}&name=${chosenRestaurant.name}&price=${chosenRestaurant.advance}`
  //    );
     res.status(200).send(response);
    })

    .catch((error) => {
      res.status(404).send(error.message);
    })

   // .then((response) => {
   //   res.status(200).send(response);
  //  })
  //  .catch((error) => {
  //    res.status(404).send(error.message);
 //   });
});

module.exports = router;
