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
  console.log(restaurant, user, reserve)
  let preference = {
    items: [
      {
        id: restaurant._id,
        title: restaurant.name,
        currency_id: "ARS",
        description: restaurant.menu[0],
        category_id: "art",
        quantity: 1,
        unit_price: restaurant.advance,
      },
    ],
    back_urls: {
      success: "com.eatoutpf.EatOut",
      failure: "https://eatout-lac.vercel.app/paymentstatus",
      pending: "https://eatout-lac.vercel.app/paymentstatus",
    },
    metadata : {user: user._id, resto: restaurant._id, reserve},
    auto_return: "approved",
    binary_mode: true,
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
