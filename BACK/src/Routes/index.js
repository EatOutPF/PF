const { Router } = require("express");

const router = Router();

const restaurantRouter = require("./Restaurant")
// const menuRouter = require("./menu");
// const paymentRouter = require("./payment");


router.use("/restaurant", restaurantRouter)
// router.use("/restaurant/menu", menuRouter);
// router.use("/payment", paymentRouter);

module.exports = router;
