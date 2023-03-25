// Cards - (boton) delete - (boton) modify

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cards from "../Components/Cards/Cards.jsx";
import { getAllRestaurants } from "../Redux/Actions";
import "./Home.css";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllRestaurants());
  }, []);

  return (
    <div>
      <Cards />
    </div>
  );
};

export default Home;
