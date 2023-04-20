const mongoose = require("mongoose");
const { Payment, User, Restaurant, Reserve } = require("../db");


async function postPayment({idUser, idRestaurant, amount, idReserve, date}) {
    console.log(idReserve)
    if (!idUser, !idRestaurant, !amount, !idReserve, !date) throw new Error("Faltan campos obligatorios")


    const user = await User.findById(idUser)
    //console.log(user)
    const restaurant = await Restaurant.findById(idRestaurant)
    //console.log(restaurant)
    const reserve = await Reserve.findById(idReserve)
    //console.log(reserve)

    const newPayment = new Payment({
        amount,
        restaurant,
        user,
        reserve,
        date
    })
   await newPayment.save()
   restaurant.payment.push(newPayment._id)
  await restaurant.save()
   user.payment.push(newPayment._id)
   await user.save()
   reserve.payment = newPayment._id

    return `Payment fue creado `
}

async function getPayment(id) {
   if (id) {
    const payment = await Payment.findOne({_id: id})
    .populate("user", "_id name")
    .populate("restaurant", "_id name")
    return payment
   } 

   const payment = await Payment.find()
   .populate("user", "_id name")
   .populate("restaurant", "_id name")

   return payment
}

async function putPayment(id, name) {
    // if (!id || !name) throw new Error("Hay datos requeridos sin declarar")

    // const payment = await Payment.findByIdAndUpdate(id, { name: name })

    // if (!payment) throw new Error(`No se encontraron secciones con el id ${id}`)

    // return `La sección ${payment.name} fue actualizada correctamente`
}

async function deletePayment(id) {
    if (!id) throw new Error("Debera informar el id")

    const payment = await Payment.findByIdAndDelete(id)

    return `Paymen fue eliminado`
}

module.exports = {
    postPayment,
    getPayment,
    putPayment,
    deletePayment,
}
