const mongoose = require("mongoose");
const {
  Restaurant,
  Menu,
  Diet,
  PaymentMethods,
  Atmosphere,
  Extra,
  Section,
  User,
} = require("../db");

async function postRestaurant({
  name,
  address,
  images,
  contact,
  tables,
  schedule,
  advance,
  menu,
  diets,
  paymentMethods,
  atmosphere,
  extras,
  section,
  idUser,
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

  const newRestaurant = new Restaurant({
    name,
    address,
    images,
    contact,
    tables,
    schedule,
    advance,
    menu: menuOjects,
    diets: dietObjects,
    paymentMethods: paymentMethodObjects,
    atmosphere: atmosphereObjects,
    extras: extraObjects,
    section: sectionObjects,
  });

  const resultado = await newRestaurant.save();

  const user = await User.findById(idUser);
  user.restaurant.push(resultado._id.toString());
  const resuser = await user.save();

  return `El restaurant ${resultado.name} fue creado`;
}

async function getRestaurant(props) {
  if (props !== undefined) {
    if (!mongoose.Types.ObjectId.isValid(props)) {
      const restaurant = await Restaurant.find({
        name: { $regex: new RegExp(props, "i") },
      })
      .populate({
        path: "reserve",
        populate: [
          {
          path: "user",
          select: "_id name phone email",
          },
          {
          path: "payment",
          select: "amount date"
          },
      ],
      })
        .populate({
          path: "payment",
          populate: [
            {
            path: "user",
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
            path: "user",
            select: "_id name",
          },
        });

      return restaurant;
    }

    if (mongoose.Types.ObjectId.isValid(props)) {
      const restaurant = await Restaurant.findById(props)
      .populate({
        path: "reserve",
        populate: [
          {
          path: "user",
          select: "_id name phone email",
          },
          {
          path: "payment",
          select: "amount date"
          },
      ],
      })
        .populate({
          path: "payment",
          populate: [
            {
            path: "user",
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
            path: "user",
            select: "_id name",
          },
        });

      return restaurant;
    }
  }

  const restaurants = await Restaurant.find()
  .populate({
    path: "reserve",
    populate: [
      {
      path: "user",
      select: "_id name phone email",
      },
      {
      path: "payment",
      select: "amount date"
      },
  ],
  })
    .populate({
      path: "payment",
      populate: [
        {
        path: "user",
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
        path: "user",
        select: "_id name",
      },
    });


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
    advance,
    menu,
    diets,
    paymentMethods,
    atmosphere,
    extras,
    section,
  }
) {
  if (!id) throw new Error("Deberá consignar un id válido");
  const restaurant = await Restaurant.findByIdAndUpdate(
    id,
    {
      name,
      address,
      images,
      contact,
      tables,
      schedule,
      advance,
      menu,
      diets,
      paymentMethods,
      atmosphere,
      extras,
      section,
    },
    { new: true }
  );

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

  if (active) {
    return `Se ha habilitado el restaurant ${restaurant.name}`;
  } else {
    return `Se ha deshabilitado el restaurant ${restaurant.name}`;
  }
}

module.exports = {
  postRestaurant,
  getRestaurant,
  putRestaurant,
  activeRestaurant,
};

