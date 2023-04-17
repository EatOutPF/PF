const mongoose = require("mongoose");
const admin = require("../firebase/firebaseConfig");

const { User } = require("../db");

async function getUsers(props) {
  if (props) {
    if (mongoose.Types.ObjectId.isValid(props)) {
      const users = await User.findById(props)
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

      if (users === null) throw new Error("No existen usuarios con ese Id");
      users.login = true;
      users.save();

      return users;
    } else {
      const users = await User.findOne({ email: { $regex: props } })
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

      if (users === null)
        throw new Error("No existen usuarios con ese E-Mail registrado");
      users.login = true;
      users.save();

      return users;
    }
  }

  const users = await User.find()
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
    
  return users;
}

async function postUsers({ name, phone, email, password, role}) {
  if (!name || !phone || !email || !password)
    throw new Error("Hay datos obligatorios sin completar");

  const newUsers = new User({
    name,
    phone,
    email,
    role,
  });
  const resultado = await newUsers.save();

  admin.auth().createUser({
    uid: resultado._id.toString(),
    name,
    phone,
    email,
    role,
    password,
  });

  return `El usuario ${resultado.name} fue creado con exito`;
}

async function putUsers(id, { name, phone, email, role }) {
  if (!id) throw new Error("El id tiene que ser valido ");
  const user = await User.findByIdAndUpdate(id, {
    _id: id,
    name: name,
    phone: phone,
    email: email,
    role: role,
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

  await admin.auth().updateUser(id, { disabled: active });

  return `Se ha modificado el estado del user ${user.name}`;
}
module.exports = {
  postUsers,
  getUsers,
  putUsers,
  activeUsers,
};
