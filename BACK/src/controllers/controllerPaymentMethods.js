const mongoose = require("mongoose");
const { PaymentMethods } = require("../db");

async function postPaymentMethods(name) {
    if (!name) throw new Error("El nombre es obligatorio")

    const paymentMethods = new PaymentMethods(name)

    const resultado = await paymentMethods.save()

    return `La sección ${name} fue creada`
}

async function getPaymentMethods(name) {
   if (name) {
    const paymentMethods = await PaymentMethods.findOne({name: name})
    return paymentMethods
   } 

   const paymentMethods = await PaymentMethods.find()

   return paymentMethods
}

async function putPaymentMethods(id, name) {
    if (!id || !name) throw new Error("Hay datos requeridos sin declarar")

    const paymentMethods = await PaymentMethods.findByIdAndUpdate(id, { name: name })

    if (!paymentMethods) throw new Error(`No se encontraron secciones con el id ${id}`)

    return `La sección ${paymentMethods.name} fue actualizada correctamente`
}

async function deletePaymentMethods(id) {
    if (!id) throw new Error("Debera informar el id")

    const paymentMethods = await PaymentMethods.findByIdAndDelete(id)

    return `La sección ${paymentMethods.name} fue eliminado correctamente`
}

module.exports = {
    postPaymentMethods,
    getPaymentMethods,
    putPaymentMethods,
    deletePaymentMethods,
}