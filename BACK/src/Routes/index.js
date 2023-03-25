const { Router } = require("express");

const router = Router();

const restaurantRouter = require("./Restaurant")
const sectionRouter = require("./Section")
const paymentMethodsRouter = require("./PaymentMethods")
const usersRouter = require("./Users")
const menuRouter = require("./Menu")
const dietRouter  =require("./Diet")




router.use("/restaurant", restaurantRouter)
router.use("/section", sectionRouter)
router.use("/paymentMethods", paymentMethodsRouter)
router.use("/users", usersRouter)
router.use("/menu", menuRouter)
router.use("/diet", dietRouter)


module.exports = router;
