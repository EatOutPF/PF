import React from "react";
import Home from "./View/Home.jsx";
import Login from "./View/Login.jsx";
import { Routes, Route, useLocation } from "react-router-dom";
import NavBar from "./View/NavBar.jsx";
import "./App.css";

function App() {
  const location = useLocation().pathname;

  return (
    <div className="App">
      {location !== "/" && <NavBar />}
      <Routes>
        <Route exact path="/" element={<Login />}></Route>
        <Route exact path="/home" element={<Home />}></Route>
      </Routes>
    </div>
  );
}

export default App;
