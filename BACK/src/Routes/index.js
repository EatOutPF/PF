const { Router } = require("express");

const router = Router();

const restaurantRouter = require("./Restaurant")
const sectionRouter = require("./Section")
const paymentMethodsRouter = require("./PaymentMethods")
const usersRouter = require("./Users")



router.use("/restaurant", restaurantRouter)
router.use("/section", sectionRouter)
router.use("/paymentMethods", paymentMethodsRouter)
router.use("/users", usersRouter)


module.exports = router;
