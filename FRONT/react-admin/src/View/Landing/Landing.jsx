import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import style from "./Landing.module.css";
import { useSelector } from "react-redux";
import Loading from "../../Components/Loading/Loading";

const Landing = () => {
  const user = useSelector((state) => state.user);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    user.role && setLoaded(true);
  }, [user]);

  return (
    <>
      {!loaded ? (
        <Loading />
      ) : (
        <>
          {user?.role === "admin" || user?.role === "superadmin" ? (
            <div className={style.container}>
              <h1>Bienvenid@ {user?.name?.toLocaleUpperCase()}</h1>
              <h3>{user?.role}</h3>
              <div className={style.containerShow}>
                <NavLink to="/home">
                  <button className={style.containerButton}>
                    Restaurantes
                  </button>
                </NavLink>

                {user?.role === "superadmin" && (
                  <>
                    <NavLink to="/users">
                      <button className={style.containerButton}>
                        Usuarios
                      </button>
                    </NavLink>
                  </>
                )}
              </div>
            </div>
          ) : (
            <div>Usuario no Autorizado</div>
          )}
        </>
      )}
    </>
  );
};

export default Landing;
