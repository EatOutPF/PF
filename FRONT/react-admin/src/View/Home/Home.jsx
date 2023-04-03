import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cards from "../../Components/Cards/Cards";
import { getAllRestaurants } from "../../Redux/Actions";
import Filter from "../../Components/Filter";
import Paginate from "../../Components/Paginado/Paginado";
import style from "./Home.module.css";
import Searchbar from "../../Components/SearchBar";

const Home = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const restaurants = useSelector((state) => state.currentListRestaurants);

  const [currentPage, setCurrentPage] = useState(1);
  const [restaurantsPerPage, setRestaurantsPerPage] = useState(10);
  const [order, setOrder] = useState("");
  const [filter, setResetFilter] = useState("");
  const [resetFilter, setsetFilter] = useState("");

  const [searchResults, setSearchResults] = useState(null);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    if (user?.role === "superadmin") dispatch(getAllRestaurants());
    /* else {
      dispatch(getAllRestaurantUser());
    } */
  }, []);

  const indexOfLastRestaurant = currentPage * restaurantsPerPage;
  const indexOfFirstRestaurant = indexOfLastRestaurant - restaurantsPerPage;
  const currentRestaurants =
    searchResults ||
    restaurants.slice(indexOfFirstRestaurant, indexOfLastRestaurant);

  return (
    <div className={style.containerHome}>
      <div className={style.containerSearchBar}>
        <Filter
          setOrder={setOrder}
          setResetFilter={setResetFilter}
          setCurrentPage={setCurrentPage}
          resetFilter={resetFilter}
        />
        <Searchbar setCurrentPage={setCurrentPage} />
      </div>
      <Paginate
        restaurantsPerPage={restaurantsPerPage}
        restaurants={searchResults ? searchResults.length : restaurants.length}
        paginado={paginate}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      <div className={style.containterTable}>
        {currentRestaurants && (
          <Cards
            restaurants={searchResults || restaurants}
            currentRestaurants={currentRestaurants}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
