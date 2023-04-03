import React from "react";
import User from "../User/User";
import style from "./Users.module.css";

const Users = ({ currentUsers }) => {
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
