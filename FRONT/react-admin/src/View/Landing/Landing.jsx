import React from "react";
import { NavLink } from "react-router-dom";
import style from "./Landing.module.css";
import { useSelector } from "react-redux";

const Landing = () => {
  const user = useSelector((state) => state.user);

  return (
    <div className={style.container}>
      <h1>Bienvenid@ {user.name.toLocaleUpperCase()}</h1>
      <h3>{user.role}</h3>
      <div className={style.containerShow}>
        <NavLink to="/home">
          <button className={style.containerButton}>Restaurantes</button>
        </NavLink>

        {user.role === "superadmin" && (
          <>
            <NavLink to="/users">
              <button className={style.containerButton}>Usuarios</button>
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default Landing;
