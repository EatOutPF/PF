const mongoose = require("mongoose");
const { Menu } = require("../db");

async function getMenu(name) {
  if (name) {
    const menu = await Menu.findOne({ name: name });
    return menu;
  }
  const menu = await Menu.find();
  return menu;
}

async function postMenu(name) {
  if (!name) throw new Error("El nombre es obligatorio");
  const menu = new Menu({ name });
  const resultado = await menu.save();
  return `El menu ${name} fue creado`;
}

async function putMenu(id, name) {
  if (!id || !name) throw new Error("Hay datos requeridos sin declarar");
  const menu = await Menu.findByIdAndUpdate(id, { name: name });

  if (!menu) throw new Error(`No se encontraron menu con el id ${id}`);

  return `El Menu ${menu.name} fue actualizada correctamente`;
}

async function deleteMenu (id){
    if(!id) throw new Error(`El id ${id} es incorrecto`)
    const menu = await Menu.findByIdAndDelete(id)
    return `El Menu ${menu.name} fue eliminado correctamente`
}

module.exports = {
  getMenu,
  postMenu,
  putMenu,
  deleteMenu
};
