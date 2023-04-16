const mongoose = require("mongoose");
const { Reserve, Restaurant, User } = require("../db");

async function postReserve(user, table, date, idRestaurant) {
  const dat = parseInt(date);

  const restaurant = await Restaurant.findOne({ _id: idRestaurant });
  //console.log(restaurant)
  const users = await User.findOne({ _id: user });

  let reserves = await Restaurant.findById(idRestaurant)
    .populate({
      path: "reserve",
      populate: [
        {
          path: "user",
          select: "name ",
        },
        {
          path: "restaurant",
          select: "name ",
        },
      ],
    })
    .lean();

  let reserveDesglos = reserves.reserve.map((reserve) => {
    return {
      ...reserve,
      user: reserve.user[0],
      restaurant: reserve.restaurant[0],
    };
  });

  console.log(reserveDesglos);

  //console.log(typeof reserveDesglos.reserve.date)
  if (!restaurant) throw new Error("Restaurante no encontrado");

  // si existen reservas filtramos las que coinciden con el date
  const reservationsForDate = reserveDesglos
    ? reserveDesglos.filter((reserve) => reserve.date === date)
    : [];

  console.log(reservationsForDate);

  // sumamos el total de table de las reservas de ese date
  const reservedTablesForDate = reservationsForDate.reduce(
    (total, reserve) => total + reserve.table,
    0
  );


  //chequeamos cuantas mesas quedan libres para ese dia
  const availableTables = restaurant.tables - reservedTablesForDate;

  if (availableTables >= table) {
    console.log(availableTables);
    //Crear la reserva
    const newReserve = new Reserve({
      user: users,
      restaurant: idRestaurant,
      table: table,
      date: date,
    });

    console.log(newReserve);
    restaurant.reserve.push(newReserve._id);
    await restaurant.save();

    await newReserve.save();

    console.log(reservedTablesForDate);
    console.log(availableTables);
    
    return "Reserva creada exitosamente";
  } else {
    return "No hay disponibilidad para esa fecha";
  }
}

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
