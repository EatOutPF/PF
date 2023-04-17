const mongoose = require("mongoose");
const { Review, Restaurant, User } = require("../db");

async function postReviews(review, score, user, idRestaurant) {

  const restaurant = await Restaurant.findById(idRestaurant);
  const users = await User.findById(user)

  if (!restaurant) throw new Error("Restaurante no encontrado");

  const newReview = new Review({
    review,
    score,
    restaurant: restaurant._id,
    user: users._id
  });
  const resultado = await newReview.save();

  restaurant.review.push(newReview._id);
  const restreview = await restaurant.save();

  
  return `El review fue creado con exito`;
}

async function getReviews() {
  
  const review = await Review.find()
  .populate("restaurant", "name")
  .populate("user", "name")
  
  return review;
}

async function putReviews(id, review) {

  if (!id) throw new Error("Deberá consignar un id válido");
  if(!review) throw new Error("El review tiene que ser valido");
  const reviews = await Review.findByIdAndUpdate(id, {
    review,
  });
  if (!reviews) throw new Error(`No se encuentra el review con el id ${id}`);

  return `El review fue actualizado correctamente`;
}
module.exports = {
  postReviews,
  getReviews,
  putReviews,
};
