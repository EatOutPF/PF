// home - search - filter - ordenar - crear -  informe(saldo x restaurante – II fase)
import Logout from "../../Components/Logout";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import style from "./NavBar.modules.css";


const NavBar = () => {
  const [order, setOrder] = useState("");
  return (
    <div className={style.containerNavbar}>
      <div>
        <NavLink to="/home">
          <h2>Home</h2>
        </NavLink>
        <NavLink to="/">
          <Logout />
        
        </NavLink>
        <NavLink to="/create">Crear nuevo Restaurante</NavLink>
      </div>
    </div>
  );
};

export default NavBar;
