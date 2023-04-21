/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cards from "../../Components/Cards/Cards";
import {
  getAllRestaurants,
  getAllRestaurantsByUser,
  getUserById,
} from "../../Redux/Actions";
import Filter from "../../Components/Filter";
import Paginate from "../../Components/Paginado/Paginado";
import style from "./Home.module.css";
import Searchbar from "../../Components/SearchBar";
import Sort from "../../Components/Sort";
import Loading from "../../Components/Loading/Loading";

const Home = () => {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);

  const {
    user,
    currentListRestaurants,
    currentListRestaurantsByUser,
    currentUser,
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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const indexOfLastRestaurant = currentPage * restaurantsPerPage;
  const indexOfFirstRestaurant = indexOfLastRestaurant - restaurantsPerPage;
  const currentRestaurants =
    searchResults ||
    restaurants?.slice(indexOfFirstRestaurant, indexOfLastRestaurant);

  useEffect(() => {
    if (user?.role) {
      if (user.role === "superadmin") dispatch(getAllRestaurants());
      if (user.role === "admin") dispatch(getAllRestaurantsByUser(user));
    }
  }, []);

  useEffect(() => {
    console.log({ user });
  });

  useEffect(() => {
    restaurants.length && setLoaded(true);
  }, [restaurants]);

  return (
    <div className={style.containerHome}>
      {!loaded ? (
        <Loading />
      ) : (
        <>
          <div className={style.containerSearchBar}>
            <Sort
              setOrder={setOrder}
              setSort={setSort}
              setCurrentPage={setCurrentPage}
              resetFilter={resetFilter}
            />

            <>
              <Filter
                setOrder={setOrder}
                setResetFilter={setResetFilter}
                setCurrentPage={setCurrentPage}
                resetFilter={resetFilter}
                restaurants={restaurants}
              />
            </>
          </div>
          <div className={style.containerSearchPag}>
            <Searchbar setCurrentPage={setCurrentPage} />
            <Paginate
              restaurantsPerPage={restaurantsPerPage}
              restaurants={
                searchResults ? searchResults?.length : restaurants?.length
              }
              paginado={paginate}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>

          <div className={style.containterTable}>
            <Cards
              restaurants={searchResults || restaurants}
              currentRestaurants={currentRestaurants}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
