const mongoose = require('mongoose')
const { Schema } = mongoose


const reserveSchema = new Schema({
  user: [{
    type: String,
    ref: 'User'
  }],
  restaurant: [{
    type: String,
    ref: 'Restaurant'
  }],
  date: {
    type: Date,
  },
  time: {
    type: Number,
  },
  payment:  [{
    type: Schema.Types.ObjectId,
    ref: 'Payment'
  }],
  table: Number,

})

reserveSchema.statics.capacidadMaximaAlcanzada = async function(restauranteId, date, time) {
  console.log(restauranteId, date, time)
  // Obtenemos todas las reservas para el restaurante en la fecha y hora especificadas
  const reservasEnFecha = await this.find({
    restaurant: restauranteId,
    date: { $eq: date },
    time: { $eq: time }
  });
  console.log(reservasEnFecha)
  // Sumamos las personas de todas las reservas para obtener la cantidad total de personas
  const personasReservadas = reservasEnFecha.reduce((total, reserve) => total + reserve.table, 0);

  // Obtenemos el límite máximo para el rango horario especificado
  let capacidadMaxima;
  if (time >= 13 && time < 14.5) {
    capacidadMaxima = 20;
  } else if (time >= 14.5 && time < 16) {
    capacidadMaxima = 20;
  } else if (time >= 21 && time < 22.5) {
    capacidadMaxima = 20;
  } else if (time >= 22.5 && time < 24) {
    capacidadMaxima = 20;
  }

  // Comparamos la cantidad total de personas con la capacidad máxima para determinar si se alcanzó el límite
  return personasReservadas >= capacidadMaxima;
};

const Reserve = mongoose.model('Reserve', reserveSchema)

module.exports = Reserve



