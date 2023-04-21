import React /* , { useEffect, useState } */ from "react";
import Home from "./View/Home/Home.jsx";
import Login from "./View/Login/Login.jsx";
import { Routes, Route, useLocation } from "react-router-dom";
import NavBar from "./View/NavBar/NavBar.jsx";
import "./App.css";
import ModifyRestaurant from "./Components/ModifyRestaurant/ModifyRestaurant.jsx";
import Form from "./Components/CreateRestaurant/CreateRestaurant.jsx";
import Landing from "./View/Landing/Landing.jsx";
import axios from "axios";
import Reviews from "./Components/Reviews/Reviews.jsx";
import CreateUsers from "./View/CreateUsers/CreateUsers.jsx";
import HomeUsers from "./View/HomeUser/HomeUser.jsx";
import { /* useDispatch, */ useSelector } from "react-redux";
import Reserves from "./Components/Reserves/Reserves.jsx";
import Successful from "./Components/Successful/Successful.jsx";
import ModifyUsers from "./Components/Users/ModifyUsers.jsx";
import AddUser from "./Components/Users/AddUser.jsx";
/* import { getLocalStorage, saveLocalStorage } from "./Redux/utils.js"; */
/* import { setUser } from "./Redux/Actions.js"; */

axios.defaults.baseURL =
  /* "https://eatout.onrender.com/"; */
  "http://localhost:5001/";

function App() {
  const location = useLocation().pathname;
  const user = useSelector((state) => state.user);

  /* const dispatch = useDispatch();

  useEffect(() => {
    console.log("useEffectApp", { user });
    if (user?.role) {
      saveLocalStorage("loggedUser", user);
    } else {
      dispatch(setUser(getLocalStorage("loggedUser")));
    }
  }, [user]); */

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
                <Route
                  exact
                  path="/reserves/:id"
                  element={<Reserves />}
                ></Route>
                <Route
                  exact
                  path="/modifyUser/:id"
                  element={<ModifyUsers />}
                ></Route>
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
                <Route
                  exact
                  path="/reserves/:id"
                  element={<Reserves />}
                ></Route>
                <Route exact path="/addUser/:id" element={<AddUser />}></Route>
              </>
            )}
            <Route
              exact
              path="/successfulPayment"
              element={<Successful />}
            ></Route>

            <Route exact path="/" element={<Login />}></Route>
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
