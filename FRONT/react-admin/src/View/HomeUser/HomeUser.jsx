import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../Redux/Actions";
import Users from "../../Components/Users/Users";
import style from "./HomeUser.module.css";

const HomeUsers = () => {
  const { currentUsers, user } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  return (
    <>
      {user.role === "superadmin" && (
        <div className={style.containerHome}>
          <h1>Tabla de Usuarios</h1>
          <div className={style.containterTable}>
            <Users currentUsers={currentUsers} />
          </div>
        </div>
      )}
    </>
  );
};

export default HomeUsers;
