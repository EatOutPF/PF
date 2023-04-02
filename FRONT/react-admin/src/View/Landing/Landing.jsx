import React from "react";
import { NavLink } from "react-router-dom";
import style from "./Landing.module.css";

const Landing = () => {
  return (
    <div className={style.container}>
      <h1>Bienvenido SuperAdmin</h1>
      <div className={style.containerShow}>
        <NavLink to="/home">
          <button className={style.containerButton}>Restaurantes</button>
        </NavLink>
        <NavLink to="/users">
          <button className={style.containerButton}>Usuarios</button>
        </NavLink>
      </div>
    </div>
  );
};

export default Landing;
