const mongoose = require("mongoose");

const {User } = require("../db");

async function getUsers (name) {
    const search = name;
    console.log(name)
    if (search) {
        const users = await User.findOne({ name: { $regex: search } });
        return users;
      }
      const users = await User.find();
      console.log(users)

      return users;

}

async function postRestaurantUsers ({
    name,
    reserve,
    role,
    restaurant,
    active,
}){
    if (!name || !reserve || !role || !restaurant || !active)
    throw new Error("Hay datos obligatorios sin completar");
}
module.export = {getUsers}