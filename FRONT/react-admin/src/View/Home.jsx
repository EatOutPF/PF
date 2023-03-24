import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cards from "../Components/Cards/Cards.jsx";
import { getAllRestaurants } from "../Redux/Actions";
import Filter from "../Components/Filter";
import Paginate from "../Components/Paginado/Paginado";
import "./Home.css";

const Home = () => {
  const dispatch = useDispatch();

  const restaurants = useSelector((state) => state.currentListRestaurants)

  const [currentPage, setCurrentPage] = useState(1);
  const [restaurantsPerPage, setRestaurantsPerPage] = useState(10);
  const [order, setOrder] = useState("");
  const [filter, setFilter] = useState("");

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getAllRestaurants());
  }, []);

  const indexOfLastRestaurant = currentPage * restaurantsPerPage;
  const indexOfFirstRestaurant = indexOfLastRestaurant - restaurantsPerPage;
  const currentRestaurants = restaurants.slice(
    indexOfFirstRestaurant,
    indexOfLastRestaurant
  );
console.log(restaurants.length)
  return (
    <div>
      <Filter setOrder={setOrder} setFilter={setFilter} />

      
      <Paginate
        restaurantsPerPage={restaurantsPerPage}
        restaurants={restaurants.length}
        paginado={paginate}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      
      <Cards currentRestaurants={currentRestaurants} />
    </div>
  );
};

export default Home;


