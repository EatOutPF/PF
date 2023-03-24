const { Router } = require("express");

const router = Router();

const restaurantRouter = require("./Restaurant")
const sectionRouter = require("./Section")
const paymentMethodsRouter = require("./PaymentMethods")



router.use("/restaurant", restaurantRouter)
router.use("/section", sectionRouter)
router.use("/paymentMethods", paymentMethodsRouter)


module.exports = router;
