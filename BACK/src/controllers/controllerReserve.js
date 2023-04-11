const mongoose = require("mongoose");
const { Reserve, Restaurant, User } = require("../db");

async function postReserve(user, table, date, idRestaurant) {
  const restaurant = await Restaurant.findOne({ _id: idRestaurant });
  console.log(restaurant);
  //const restaurantName = restaurant.name
  const users = await User.findOne({ _id: user });
  console.log(users);
  const userName = users.name;
  console.log(date);

  if (!restaurant) throw new Error("Restaurante no encontrado");

  const reservationsForDate = restaurant.reservations
    ? restaurant.reservations.filter((reservation) => reservation.date === date)
    : [];

  const reservedTablesForDate = reservationsForDate.reduce(
    (total, reserve) => total + reserve.table,
    0
  );
  const availableTables = restaurant.dailyTable - reservedTablesForDate;
  console.log(restaurant.dailyTable);

  console.log(restaurant)

  if (availableTables >= table) {
    restaurant.reserve.push({ date, table, userName });
    await restaurant.save();

    // Crear la reserva
    const newReserve = new Reserve({
      user: users,
      restaurant: idRestaurant,
      table: table,
    });

    await newReserve.save();

    return "Reserva creada exitosamente";
  } else {
    return "No hay disponibilidad para esa fecha";
  }
}

// const reservasFecha = await Reserve.aggregate([
//   {
//     $match: {
//       restaurant: new mongoose.Types.ObjectId(idRestaurant),
//       date: {
//         $gte: new Date(date).setHours(0, 0, 0, 0),
//         $lte: new Date(date).setHours(23, 59, 59, 999),
//       },
//     },
//   },
//   {
//     $group: {
//       _id: "$restaurant",
//       table: { $sum: "$table" },
//     },
//   },
// ]);
// console.log(reservasFecha);
// const mesasDisponibles = reservasFecha[0]?.table || 0;
// console.log(mesasDisponibles);
// if (mesasDisponibles < table) {
//   return {
//     success: false,
//     message: "No hay suficientes mesas disponibles para esta reserva",
//   };
// }

// // Crear la reserva
// const reserve = new Reserve({
//   user: users,
//   restaurant: idRestaurant,
//   table: table,
// });

// // Actualizar la disponibilidad del restaurante
// restaurant.dailyTable -= table;
// await restaurant.save();

// // Guardar la reserva en la base de datos
// await reserve.save();

// return { success: true, message: "Reserva realizada con exito" };

async function getReserve() {
  const reserve = await Reserve.find()
    .populate("restaurant", "name")
    .populate("user", "name");

  return reserve;
}

async function deleteReserve(id) {
  //console.log(idReserve)
  const reserva = await Reserve.findByIdAndDelete(id);
  if (!reserva) {
    throw new Error("no se encuentro la reserva");
  } else {
    return `La reserva fue eliminada con exito`;
  }
}

module.exports = {
  postReserve,
  getReserve,
  deleteReserve,
};
