import React from "react";
import Home from "./View/Home/Home.jsx";
import Login from "./View/Login.jsx";
import { Routes, Route, useLocation } from "react-router-dom";
import NavBar from "./View/NavBar/NavBar";
import "./App.css";
import ModifyRestaurant from "./Components/ModifyRestaurant/ModifyRestautant.jsx";
import Form from "./Components/CreateRestaurant.jsx";
import Landing from "./View/Landing/Landing.jsx";
import axios from "axios";
import Reviews from "./Components/Reviews/Reviews.jsx";
axios.defaults.baseURL =
  "http://localhost:5001/" /* "https://eatout.onrender.com/" */;

function App() {
  const location = useLocation().pathname;

  return (
    <div className="App">
      <div className={location !== "/" && "containerNavBar"}>
        {location !== "/" && <NavBar />}
      </div>
      <div className="containerComponents">
        <Routes>
          <Route exact path="/" element={<Login />}></Route>
          <Route exact path="/home" element={<Home />}></Route>
          <Route
            exact
            path="/modify/:id"
            element={<ModifyRestaurant />}
          ></Route>
          <Route exact path="/create" element={<Form />}></Route>
          <Route exact path="/landing" element={<Landing />}></Route>
          <Route
            exact
            path="/reviews/:id"
            element={<Reviews></Reviews>}
          ></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
