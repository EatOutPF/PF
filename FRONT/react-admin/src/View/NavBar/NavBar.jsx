// home - search - filter - ordenar - crear -  informe(saldo x restaurante – II fase)
import Logout from "../../Components/Logout";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import style from "./NavBar.modules.css";
import home from "../../assets/Home.jpeg";

const NavBar = () => {
  const [order, setOrder] = useState("");
  return (
    <div className={style.containerNavbar}>
      <div>
        <NavLink to="/home">
          <>
            <div title="Home">
              <img src={home} alt="Home" className={style.containerNavbarImg} />
            </div>
          </>
        </NavLink>
        <NavLink to="/">
          <Logout />
        </NavLink>
        <NavLink to="/create">
          <button>Crear</button>
        </NavLink>
      </div>
    </div>
  );
};

export default NavBar;
