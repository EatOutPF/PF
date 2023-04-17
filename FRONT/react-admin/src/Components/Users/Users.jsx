import React from "react";
import User from "../User/User";
import style from "./Users.module.css";
import Loading from "../Loading";
import { useEffect, useState } from "react";

const Users = ({ currentUsers }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className={style.containerUsers}>
      {!currentUsers?.length > 0 ? (
        <div>No se encontraron resultados</div>
      ) : (
        <table>
          <thead className={style.containerThead}>
            <tr className={style.containerTitle}>
              <th>Usuario</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody className={style.containerBodyTable}>
            {currentUsers?.map(
              (u) =>
                u && (
                  <User
                    key={u._id}
                    id={u._id}
                    name={u.name}
                    email={u.email}
                    role={u.role}
                    active={u.active}
                  />
                )
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Users;
