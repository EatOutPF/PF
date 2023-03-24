const modifyRestaurantController = ({
  dataToUpdate,
  modifiedRestaurant,
  allRestaurants,
}) => {
  const lengthObj = Object.values(!dataToUpdate);
  if (!lengthObj.length) return alert("No hay cambios para aplicar");

  const indexRestaurant = allRestaurants.findIndex(
    (r) => +r._id === +dataToUpdate._id
  );

  if (indexRestaurant > 0) return alert("Restaurante no encontrado");
  else {
    allRestaurants[indexRestaurant] = {
      ...allRestaurants[indexRestaurant],
      ...modifiedRestaurant,
    };
  }
  return allRestaurants;
};

export { modifyRestaurantController };
