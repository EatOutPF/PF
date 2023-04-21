const { Router } = require("express");

const router = Router();


const restaurantRouter = require("./Restaurant");
const sectionRouter = require("./Section");
const paymentMethodsRouter = require("./PaymentMethods");
const usersRouter = require("./Users");
const menuRouter = require("./Menu");
const dietRouter = require("./Diet");
const extraRouter = require("./Extra");
const atmosphereRouter = require("./Atmosphere");
const reviewsRouter = require("./Reviews")
const sendEmailRouter = require("./sendEmail")
const favoriteRouter = require("./Favorite")
const reserveRouter =  require("./Reserve")
const paymentRouter = require("./Payment")
const paymentstatusRouter = require("./PaymentStatus")
const notificationRouter = require("./Notification")
const gmailRouter = require("./Gmail")


/* --------MERCADOPAGO------- */
const paymentMercadoPagoRouter = require("./PaymentMercadoPago");


router.use("/restaurant", restaurantRouter)
router.use("/section", sectionRouter)
router.use("/paymentMethods", paymentMethodsRouter)
router.use("/users", usersRouter)
router.use("/menu", menuRouter)
router.use("/diet", dietRouter)
router.use("/extra", extraRouter)
router.use("/atmosphere", atmosphereRouter)
router.use("/payment",  paymentRouter)

router.use("/restaurant", restaurantRouter);
router.use("/section", sectionRouter);
router.use("/paymentMethods", paymentMethodsRouter);
router.use("/users", usersRouter);
router.use("/menu", menuRouter);
router.use("/diet", dietRouter);
router.use("/extra", extraRouter);
router.use("/atmosphere", atmosphereRouter);
router.use("/reviews", reviewsRouter);
router.use("/sendemail", sendEmailRouter);
router.use("/favorite", favoriteRouter);
router.use("/reserve", reserveRouter)
router.use("/payment", paymentRouter)
router.use("/paymentstatus", paymentstatusRouter)
router.use("/notification", notificationRouter)
router.use("/gmail", gmailRouter)

/* --------MERCADOPAGO------- */
router.use("/mercadopago", paymentMercadoPagoRouter);

module.exports = router;
