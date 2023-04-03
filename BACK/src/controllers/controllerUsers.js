const mongoose = require("mongoose");
const admin = require("./firebaseConfig");

const { User } = require("../db");

async function getUsers(email) {
  const search = email;

  if (search) {
    const users = await User.findOne({ email: { $regex: search } })
    .populate("restaurant")
    .populate("favorite");

    if (users === null) throw new Error("No existen usuarios con ese E-Mail registrado")
    
    return users;
  }
  const users = await User.find()
  .populate("restaurant")
  .populate("favorite")
  return users;
}

async function postUsers({ name, phone, email, password }) {
  if (!name || !phone || !email || !password)
    throw new Error("Hay datos obligatorios sin completar");

  const newUsers = new User({
    name,
    phone,
    email,
   
  });
  const resultado = await newUsers.save();

  admin.auth().createUser({
    uid: resultado._id.toString(),
    name,
    phone,
    email,
    password,
  })
  return `El usuario ${resultado.name} fue creado con exito`;
}

async function putUsers(id, { name, phone, email }) {

  if (!id) throw new Error("El id tiene que ser valido ");
  const user = await User.findByIdAndUpdate(id, {
    _id: id,
    name: name,
    phone: phone,
    email: email,
    
  });
  if (!user) throw new Error(`No se encuentra el user con el id  ${user.id}`);
  return `El user ${user.name} fue actualizado con exito`;
}

async function activeUsers(id, active) {

  if (!id) throw new Error("El id debe ser valido");
  const user = await User.findOne({ _id: id });

  if (!user) throw new Error(`No se encuentran user con el id ${id}`);
  user.active = !active;
  user.save();

  await admin.auth().updateUser(id, {disabled: !active})

  return `Se ha modificado el estado del user ${user.name}`;
}
module.exports = {
  postUsers,
  getUsers,
  putUsers,
  activeUsers,
};
