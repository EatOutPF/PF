/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cards from "../../Components/Cards/Cards";
import {
  getAllRestaurants,
  getAllRestaurantsByUser,
} from "../../Redux/Actions";
import Filter from "../../Components/Filter";
import Paginate from "../../Components/Paginado/Paginado";
import style from "./Home.module.css";
import Searchbar from "../../Components/SearchBar";
import Sort from "../../Components/Sort";

const Home = () => {
  const dispatch = useDispatch();

  const {
    user,
    currentListRestaurants,
    currentListRestaurantsByUser,
    allRestaurants,
    allRestaurantsByUser,
  } = useSelector((state) => state);

  const restaurants =
    user?.role === "superadmin"
      ? currentListRestaurants
      : currentListRestaurantsByUser;

 
  const [currentPage, setCurrentPage] = useState(1);
  const [restaurantsPerPage, setRestaurantsPerPage] = useState(10);
  const [order, setOrder] = useState("");
  const [filter, setResetFilter] = useState("");
  const [resetFilter, setsetFilter] = useState("");

  const [searchResults, setSearchResults] = useState(null);
  const [sort, setSort] = useState("");

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    let RegisteredUser = user;

    if (RegisteredUser?.role) {
      if (RegisteredUser.role === "superadmin") dispatch(getAllRestaurants());
      if (RegisteredUser.role === "admin")
        dispatch(getAllRestaurantsByUser(user));
    }
  }, []);

  const indexOfLastRestaurant = currentPage * restaurantsPerPage;
  const indexOfFirstRestaurant = indexOfLastRestaurant - restaurantsPerPage;
  const currentRestaurants =
    searchResults ||
    restaurants?.slice(indexOfFirstRestaurant, indexOfLastRestaurant);

  return (
    <div className={style.containerHome}>
      <div className={style.containerSearchBar}>
        <Searchbar setCurrentPage={setCurrentPage} />
        <>
          <Filter
            setOrder={setOrder}
            setResetFilter={setResetFilter}
            setCurrentPage={setCurrentPage}
            resetFilter={resetFilter}
            restaurants={restaurants}
          />
        </>

        <Sort
          setOrder={setOrder}
          setSort={setSort}
          setCurrentPage={setCurrentPage}
          resetFilter={resetFilter}
        />
      </div>

      <Paginate
        restaurantsPerPage={restaurantsPerPage}
        restaurants={
          searchResults ? searchResults?.length : restaurants?.length
        }
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
