
const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");
const { postReserve } = require("./controllerReserve");
const { getRestaurant } = require("./controllerRestaurant");
const { getUsers } = require("./controllerUsers");
const { sendConfirmationEmail } = require("./controllerEmail");
const { postNotification } = require("./controllerNotification");
const { postPayment } = require("./controllerPayment");

async function webhook(reference) {
  const token = process.env.MERCADOPAGO_KEY;
  console.log(reference);
  let data;
  try {
    let url = `https://api.mercadopago.com/v1/payments/search?sort=id&criteria=desc&external_reference=${reference}&range=date_created&begin_date=NOW-30DAYS&end_date=NOW&access_token=${token}`;
    let response = await axios
      .get(url)
      .then((res) => (data = res.data.results[0]));
    console.log(data);
    let idResto = data.metadata.restaurant;
    let idUser = data.metadata.user;
    let reserve = data.metadata.reserve;
    let amount = data.transaction_amount;
    console.log(idResto, idUser, reserve, amount);
    let postReserva;
    let postPay;
    let restaurant = await getRestaurant(idResto);
    let user = await getUsers(idUser);

    let subjectReserva = "Nueva reserva";

    let textReservaResto = `¡Hola! Has recibido una nueva reserva para <b>${restaurant.name}</b>`;
    let textReservaUser = `¡Hola ${user.name}! Se ha confirmado tu reserva para <b>${restaurant.name}</b>`;
    let htmlReservaResto = `<p>¡Hola!</p><p>Has recibido una nueva reserva para <b>${restaurant.name}</b>.</p>
        <li>
        <ul>Cliente: ${user.name}</ul>
        <ul> Fecha y hora: ${reserve.date}, ${reserve.time}</ul>
        <ul> Cantidad de comensales: ${reserve.cant_persons}</ul>
       <ul>Seña: $ ${amount}</ul>
       </li>
       <h3>EatOut</h3>`;
    let htmlReservaUser = `<p>¡Hola ${user.name}!</p><p>Se ha confirmado reserva para <b>${restaurant.name}</b>.</p>
        <li>
        <ul> Fecha y hora: ${reserve.date}, ${reserve.time}</ul>
        <ul> Cantidad de comensales: ${reserve.cant_persons}</ul>
       <ul>Seña : ${amount}</ul>
       </li>
       <h3>EatOut</h3>`;
    let subjectPago = "Pago acreditado";
    let textPago = "Se ha confirmado el pago de la reserva";
    let htmlPagoResto = `<p>¡Hola!</p><p>Has recibido el pago de la reserva de <b>${user.name}</b> para <b>${restaurant.name}</b>.</p>
       <li>
        <ul>Seña: $ ${amount}</ul>
       <ul> Fecha y hora: ${reserve.date}, ${reserve.time}</ul>
       <ul> Cantidad de comensales: ${reserve.cant_persons}</ul>
      </li>
      <h3>EatOut</h3>`;
    let htmlPagoUser = `<p>¡Hola ${user.name}!</p><p>Se ha acreditado tu pago para la reserva en <b>${restaurant.name}</b>.</p>
        <li>
      <ul>Seña: $ ${amount}</ul>
        <ul> Fecha y hora: ${reserve.date}, ${reserve.time}</ul>
        <ul> Cantidad de comensales: ${reserve.cant_persons}</ul>
       </li>
       <h3>EatOut</h3>`;
    let messageReserva = `Se confirmó tu reserva en ${restaurant.name} para el día ${reserve.date} a las ${reserve.time} para ${reserve.cant_persons} personas`;
    let messagePago = `Se acreditó el pago $ ${amount} para tu reserva en ${restaurant.name} para el día ${reserve.date} a las ${reserve.time}`;

    if (data && data.status === "approved") {
      postReserva = await postReserve({
        idUser,
        table: reserve.table,
        date: reserve.date,
        time: reserve.time,
        idRestaurant: idResto,
      });

      let notificacionReserva = await postNotification(messageReserva, idUser);

      let emailRestoReserva = await sendConfirmationEmail({
        mail: restaurant.contact.email,
        subject: subjectReserva,
        message: { text: textReservaResto, html: htmlReservaResto },
      });
      let emailUserReserva = await sendConfirmationEmail({
        mail: user.email,
        subject: subjectReserva,
        message: { text: textReservaUser, html: htmlReservaUser },
      });
    }

    if (data.status_detail === "accredited") {
      restaurant.balance += amount;
      restaurant.save();
      let date = new Date().toISOString().slice(0,10)
      postPay = postPayment({idUser, idRestaurant: idResto, amount, idReserve: postReserva._id, date: date })

      let notificacionPago = await postNotification(messagePago, idUser);

      let emailRestoPago = await sendConfirmationEmail({
        mail: restaurant.contact.email,
        subject: subjectPago,
        message: { text: textPago, html: htmlPagoResto },
      });
      let emailUserPago = await sendConfirmationEmail({
        mail: user.email,
        subject: subjectPago,
        message: { text: textPago, html: htmlPagoUser },
      });
    }
    let useract = await getUsers(idUser)
         .populate("restaurant")
        .populate({
          path: "favorite",
          populate: {
            path: "restaurant",
            select: "name _id",
          },
        })
        .populate({
          path: "reserve",
          populate: {
            path: "restaurant",
            select: "_id name address contact",
          },
        })
        .populate({
          path: "payment",
          populate: [
            {
            path: "restaurant",
            select: "_id name"
          },
          {
            path: "reserve",
            select: "_id date"
          }
        ]
        })
        .populate({
          path: "review",
          populate: {
            path: "restaurant",
            select: "_id name",
          },
        })
        .populate("notificacion")

    return [data.status, useract];

  } catch (err) {
    throw new Error(err);
  }
}
module.exports = webhook;

