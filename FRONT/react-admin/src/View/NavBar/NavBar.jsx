// home - search - filter - ordenar - crear -  informe(saldo x restaurante – II fase)
import Logout from "../../Components/Logout";
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import styleGeneral from "../../Styles/General.module.css";
import home from "../../assets/logo.png";
import { useSelector } from "react-redux";
import style from "./NavBar.module.css";

const NavBar = () => {
  const location = useLocation.pathname;
  const [order, setOrder] = useState("");
  const user = useSelector((state) => state.user);

  return (
    <>
      {user.name && location !== "/createUsers" ? (
        <>
          <div className={style.containerHeader}>
            <NavLink to="/">
              <Logout />
            </NavLink>
          </div>
          {user.role === "superadmin" && (
            <>
              <NavLink to="/landing">
                <div title="Home">
                  <img
                    src={home}
                    alt="Home"
                    style={{ width: "-webkit-fill-available", paddingTop: 50 }}
                  />
                </div>
              </NavLink>
              <NavLink to="/home">
                <button className={styleGeneral.btnGost}>
                  Ver Restaurantes
                </button>
              </NavLink>
              <NavLink to="/Users">
                <button className={styleGeneral.btnGost}>Ver Usuarios</button>
              </NavLink>
            </>
          )}

          {user.role === "admin" && (
            <>
              <NavLink to="/landing">
                <div title="Home">
                  <img
                    src={home}
                    alt="Home"
                    style={{ width: "-webkit-fill-available", paddingTop: 50 }}
                  />
                </div>
              </NavLink>
              <NavLink to="/home">
                <button className={styleGeneral.btnGost}>
                  Ver Restaurantes
                </button>
              </NavLink>
              <NavLink to="/create">
                <button className={styleGeneral.btnGost}>
                  Crear Restaurante
                </button>
              </NavLink>
            </>
          )}
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default NavBar;
