const mongoose = require("mongoose");
const {
  Restaurant,
  Menu,
  Diet,
  PaymentMethods,
  Atmosphere,
  Extra,
  Section,
} = require("../db");

async function postRestaurant({
  name,
  address,
  images,
  contact,
  tables,
  schedule,
  menu,
  diets,
  paymentMethods,
  atmosphere,
  extras,
  section,
}) {
  if (!name || !address || !contact || !tables || !schedule)
    throw new Error("Hay datos obligatorios sin completar");

  const menuOjects = await Menu.find({ title: { $in: menu } });
  const dietObjects = await Diet.find({ title: { $in: diets } });
  const paymentMethodObjects = await PaymentMethods.find({
    title: { $in: paymentMethods },
  });
  const atmosphereObjects = await Atmosphere.find({
    title: { $in: atmosphere },
  });
  const extraObjects = await Extra.find({ title: { $in: extras } });
  const sectionObjects = await Section.find({ title: { $in: section } });

  // Crear un nuevo objeto de receta con los campos especificados
  const newRestaurant = new Restaurant({
    name,
    address,
    images,
    contact,
    tables,
    schedule,
    menu: menuOjects,
    diets: dietObjects,
    paymentMethods: paymentMethodObjects,
    atmosphere: atmosphereObjects,
    extras: extraObjects,
    section: sectionObjects,
  });

  // Guardar la receta en la base de datos
  const resultado = await newRestaurant.save();

  return `El restaurant ${resultado.name} fue creado`;
}

async function getRestaurant(props) {
  if (props !== undefined) {
    if (!mongoose.Types.ObjectId.isValid(props)) {
      const restaurant = await Restaurant.findOne({ name: props });
      return restaurant;
    }

    if (mongoose.Types.ObjectId.isValid(props)) {
      const restaurant = await Restaurant.findById(props);
      return restaurant;
    }
  }

  const restaurants = await Restaurant.find();

  return restaurants;
}

async function putRestaurant(
  id,
  {
    name,
    address,
    images,
    contact,
    tables,
    schedule,
    menu,
    diets,
    paymentMethods,
    atmosphere,
    extras,
    section,
  }
) {
  if (!id) throw new Error("Deberá consignar un id válido");
  const restaurant = await Restaurant.findByIdAndUpdate(id, {
    _id: id,
    name: name,
    address: address,
    images: images,
    contact: contact,
    tables: tables,
    schedule: schedule,
    menu: menu,
    diets: diets,
    paymentMethods: paymentMethods,
    atmosphere: atmosphere,
    extras: extras,
    section: section,
  });

  if (!restaurant)
    throw new Error(`No se encuentra restaurant con el id ${id}`);

  return `El restaurant ${restaurant.name} fue actualizado correctamente`;
}

async function activeRestaurant(id, active) {
  if (!id) throw new Error("Deberá consignar un id válido");
  const restaurant = await Restaurant.findOne({ _id: id });
  if (!restaurant)
    throw new Error(`No se encuentran restaurant con el id ${id}`);

  restaurant.active = !active;

  restaurant.save();

  return `Se ha modificado el estado del restaurant ${restaurant.name}`;
}

module.exports = {
  postRestaurant,
  getRestaurant,
  putRestaurant,
  activeRestaurant,
};
