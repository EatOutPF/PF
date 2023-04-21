import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addAdmin } from "../../Redux/Actions";
import style from "./Users.module.css";

const AddUser = ({ id, handlerVisibility }) => {
  const dispatch = useDispatch();

  const [input, setInput] = useState({ emailUser: "" });
  const [idRestaurant, setIdRestaurant] = useState("");

  useEffect(() => {
    console.log({ idRestaurant }, { input });
  }, [id, input]);

  useEffect(() => {
    if (id) setIdRestaurant(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlerInput = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const handlerAddUser = () => {
    if (idRestaurant && input?.emailUser) {
      dispatch(addAdmin(idRestaurant, input.emailUser));
    }
  };

  return (
    <div className={style.containerFormModify}>
      <label htmlFor="emailUser">
        <input
          name="emailUser"
          id="emailUser"
          type="text"
          placeholder="Email nuevo usuario"
          value={input.emailUser}
          onChange={handlerInput}
        />
      </label>
      {id && (
        <button onClick={handlerAddUser} style={{ backgroundColor: "#282c34" }}>
          {" "}
          agregar{" "}
        </button>
      )}

      <button
        style={{ backgroundColor: "#282c34" }}
        onClick={handlerVisibility}
      >
        cerrar
      </button>
    </div>
  );
};

export default AddUser;
