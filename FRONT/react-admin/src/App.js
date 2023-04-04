import React from "react";
import Home from "./View/Home/Home.jsx";
import Login from "./View/Login/Login.jsx";
import { Routes, Route, useLocation } from "react-router-dom";
import NavBar from "./View/NavBar/NavBar.jsx";
import "./App.css";
import ModifyRestaurant from "./Components/ModifyRestaurant/ModifyRestautant.jsx";
import Form from "./Components/CreateRestaurant/CreateRestaurant.jsx";
import Landing from "./View/Landing/Landing.jsx";
import axios from "axios";
import Reviews from "./Components/Reviews/Reviews.jsx";
import CreateUsers from "./View/CreateUsers/CreateUsers.jsx";
import HomeUsers from "./View/HomeUser/HomeUser.jsx";
import { useSelector } from "react-redux";
axios.defaults.baseURL = "https://eatout.onrender.com/";
  //"http://localhost:5001/";

function App() {
  const location = useLocation().pathname;

  const user = useSelector((state) => state.user);
  console.log(user);

  return (
    <div className="App">
      {location !== "/" && (
        <div className="containerNavBar">
          <NavBar />
        </div>
      )}

      <Routes>
        <Route exact path="/" element={<Login />}></Route>
        <Route exact path="/createUsers" element={<CreateUsers />}></Route>
        {user && (
          <>
            {user.role === "superadmin" && (
              <>
                <Route exact path="/Users" element={<HomeUsers />}></Route>
                <Route exact path="/landing" element={<Landing />}></Route>
                <Route
                  exact
                  path="/reviews/:id"
                  element={<Reviews></Reviews>}
                ></Route>
                <Route exact path="/home" element={<Home />}></Route>
              </>
            )}

            {user.role === "admin" && (
              <>
                <Route exact path="/home" element={<Home />}></Route>
                <Route
                  exact
                  path="/modify/:id"
                  element={<ModifyRestaurant />}
                ></Route>
                <Route exact path="/create" element={<Form />}></Route>
                <Route
                  exact
                  path="/reviews/:id"
                  element={<Reviews></Reviews>}
                ></Route>
                <Route exact path="/landing" element={<Landing />}></Route>
              </>
            )}
            <Route exact path="/" element={<Login />}></Route>
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
