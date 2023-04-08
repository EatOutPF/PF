const mongoose = require("mongoose");
const { Reserve, Restaurant, User } = require("../db");

async function postReserve(user, date, time, table, idRestaurant) {
  const restaurant = await Restaurant.findById(idRestaurant);
  console.log(restaurant)
  const restaurantName = restaurant.name
  const users = await User.findById(user);
  const userName = users.name
  

  if (!restaurant) throw new Error("Restaurante no encontrado");

  const noTable = await Reserve.capacidadMaximaAlcanzada(
    idRestaurant,
    date,
    time
  );

  if (noTable) {
    throw new Error("No hay disponibilidad en ese rango horario y en ese dia");
  } else {
    const newReserve = new Reserve({
      user: userName,
      restaurant: restaurantName,
      date,
      time,
      table
    });
   await newReserve.save();
    return `La reserva fue realizada con exito `;
  }
}

async function getReserve() {

  const reserve = await Reserve.find()
  // .populate("restaurant", "name")
  // .populate("user", "name")

  return reserve;
}

// async function putReviews(id, review) {

//   if (!id) throw new Error("Deberá consignar un id válido");
//   if(!review) throw new Error("El review tiene que ser valido");
//   const reviews = await Review.findByIdAndUpdate(id, {
//     review,
//   });
//   if (!reviews) throw new Error(`No se encuentra el review con el id ${id}`);

//   return `El review fue actualizado correctamente`;
// }
module.exports = {
  postReserve,
  getReserve
};
