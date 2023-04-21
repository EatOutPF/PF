const mongoose = require("mongoose");

const { User } = require("../db");

async function getUsers(props) {
  const users = await User.findOne({ email: { $regex: props.email } })
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
          select: "_id name",
        },
        {
          path: "reserve",
          select: "_id date",
        },
      ],
    })
    .populate({
      path: "review",
      populate: {
        path: "restaurant",
        select: "_id name",
      },
    })
    .populate("notificacion");

  if (users === null)
    throw new Error("No existen usuarios con ese E-Mail registrado");
  users.login = true;
  users.save();

  return users;

}

module.exports = { getUsers };
