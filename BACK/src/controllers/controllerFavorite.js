const mongoose = require("mongoose");
const { Favorite, Restaurant, User } = require("../db");

async function favorite(restaurant, user) {
  const favorite = await Favorite.findOne({
    restaurant: restaurant,
    user: user,
  }).populate({
    path: "restaurant",
    select: "_id name images menu diets atmosphere",
  });

  if (!favorite) {
    const newFavorite = new Favorite({
      restaurant,
      user,
    }).populate({
      path: "restaurant",
      select: "_id name images menu diets atmosphere",
    });

    const fav = await newFavorite.save();
    const favuser = await User.findById(user);

    favuser.favorite.push(newFavorite._id);
    const userfav = await favuser.save();

    const rest = await Restaurant.findById(restaurant);
    rest.favorite.push(newFavorite._id);
    const restfav = await rest.save();

    return userfav;
  } else {
    const favdelete = await Favorite.findByIdAndDelete(favorite._id);

    const favuser = await User.findById(user);
    const userfilter = favuser.favorite.filter(
      (favs) => favs.toString() !== favorite._id.toString()
    );
    favuser.favorite = userfilter;
    const userfav = await favuser.save();

    const rest = await Restaurant.findById(restaurant);
    const restfilter = rest.favorite.filter(
      (favs) => favs.toString() !== favorite._id.toString()
    );
    rest.favorite = restfilter;
    const restfav = await rest.save();

    return userfav;
  }
}

module.exports = favorite;
