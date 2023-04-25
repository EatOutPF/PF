const mongoose = require("mongoose");
const { Favorite, Restaurant, User } = require("../db");

async function favorite(restaurant, user) {
 // console.log("controller favorite " + restaurant, user)
  const favorites = await Favorite.findOne({
    restaurant: restaurant,
    user: user,
  }).populate({
    path: "restaurant",
    select: "_id name images menu diets atmosphere",
  }).exec();
  
  if (!favorites) {
    const newFavorite = new Favorite({
      restaurant: restaurant,
      user: user,
    })
//     .populate({
//       path: "restaurant",
//       select: "_id name images menu diets atmosphere",
//     });

    const fav = await newFavorite.save()
   // console.log("fav " + fav)
    const favuser = await User.findById(user)
    .populate({
    path: "favorite",
    populate: {
        path: "restaurant",
        select: "_id name images menu diets atmosphere",
      }
    })
    //console.log("favuser " + favuser)
    favuser.favorite.push(newFavorite);
    const userfav = await favuser.save()

    const rest = await Restaurant.findById(restaurant);
    rest.favorite.push(newFavorite);
    const restfav = await rest.save()
    console.log("add " + favuser)
    return favuser

  } else {
    //console.log("else " + favorites)
    const favdelete = await Favorite.findByIdAndDelete(favorites._id);

    const favuser = await User.findById(user)
    .populate({
    path: "favorite",
    populate: {
        path: "restaurant",
        select: "_id name images menu diets atmosphere",
      }
    })
    const userfilter = favuser.favorite.filter(favs => favs._id.toString() !== favorites._id.toString())
    favuser.favorite = userfilter
    const userfav = await favuser.save()

    const rest = await Restaurant.findById(restaurant);
    const restfilter = rest.favorite.filter(favs => favs._id.toString() !== favorites._id.toString())
    rest.favorite = restfilter
    const restfav = await rest.save()
    console.log("delete " + favuser)
    return favuser
  }
}

module.exports = favorite
