const mongoose = require("mongoose");
const { Notification } = require("../db");
const { User } = require("../db");

async function getNotification(id) {
  if (id) {
    const notification = await Notification.findOne({ user: id })
    .populate("user", "_id name")
    return notification;
  } else if (!id) {
    const notification = await Notification.find()
    .populate("user", "_id name")
    return notification;
  } else {
    throw new Error("Error al buscar notificación");
  }
}

async function postNotification(message, idUsers) {
  console.log(idUsers);
  if (!message)
    throw new Error("El mensaje para generar la notificacion es obligatorio");
  const user = await User.findOne({ _id: idUsers });
  console.log(user);

  const newNotification = new Notification({ message: message, user: user });
    console.log(newNotification)

  user.notificacion.push(newNotification);
  await user.save();

  const resultado = await newNotification.save();
  return `La Notificacion: ${resultado.message} fue creada con exito`;
}

async function deleteNotification(idUser, idNotification) {
  if ((idUser && idNotification) || (!idUser && !idNotification)) {
    throw new Error(
      "No se envian correctamente los parametros para poder eliminar las notificaciones"
    );
  }
  if (idUser) {
    try {
      const result = await Notification.deleteMany({ user: idUser });
      return `Se eliminaron ${result.deletedCount} notificaciones para el usuario ${idUser}.`;
    } catch (error) {
      console.error(error);
      throw new Error("Error al eliminar notificaciones");
    }
  } else if (idNotification) {
    const notification = await Notification.findByIdAndDelete(idNotification);
    return `La notificacion: ${notification.message} fue eliminada correctamente`;
  }
}

module.exports = {
  getNotification,
  postNotification,
  deleteNotification,
};
