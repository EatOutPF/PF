import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { findDetailUser } from "../../Redux/Actions";
import style from "./Users.module.css";
import { updateUser } from "../../Redux/Actions";
import Validation from "../Validations/Validations";

const ModifyUsers = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { detailUser, optionsRole } = useSelector((state) => state);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    role: "",
    phone: "",
  });

  const [input, setInput] = useState({
    _id: "",
    name: "",
    email: "",
    role: "",
    phone: "",
  });

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
    setErrors(Validation({ ...input, [name]: value }));
  };

  const onChangeOptionsRole = (e) => {
    const { value } = e.target;
    console.log(e.target);
    setInput({ ...input, role: value });
  };

  useEffect(() => {
    console.log({ id }, { detailUser }, { input });
  }, [input, id, detailUser]);

  useEffect(() => {
    if (detailUser) {
      setInput({
        _id: detailUser?._id,
        name: detailUser?.name,
        email: detailUser?.email,
        role: detailUser?.role,
        phone: detailUser?.phone,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detailUser]);

  useEffect(() => {
    dispatch(findDetailUser(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const onSubmitModifyUsers = (e) => {
    e.preventDefault();
    dispatch(updateUser(input));

    navigate("/users");
  };

  return (
    <div className={style.containerModify}>
      {input && (
        <div className={style.containerForm2}>
          <div className={style.containerButton}>
            <NavLink to="/users ">
              <button>Cerrar</button>
            </NavLink>
          </div>
          <h1>Editar Usuario</h1>

          <form onSubmit={onSubmitModifyUsers} style={{ gap: 20 }}>
            <div>
              <div>
                <label htmlFor="name">
                  <b>Name</b>{" "}
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={input?.name}
                  onChange={onChangeInput}
                ></input>
              </div>
              {errors?.name && (
                <span className={style.danger}>{errors?.name}</span>
              )}
            </div>

            <div>
              <div>
                <label htmlFor="email">
                  <b>Email</b>{" "}
                </label>
                <input
                  id="email"
                  name="email"
                  type="text"
                  value={input?.email}
                  onChange={onChangeInput}
                ></input>
              </div>
              {errors?.email && (
                <span className={style.danger}>{errors?.email}</span>
              )}
            </div>

            <div>
              <div>
                <label htmlFor="phone">
                  <b>Telefono</b>{" "}
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="text"
                  value={input?.phone}
                  onChange={onChangeInput}
                ></input>
              </div>
              {errors?.phone && (
                <span className={style.danger}>{errors?.phone}</span>
              )}
            </div>

            <div>
              <div sytle={{ display: "flex", gap: 2 }}>
                <div>
                  <b>Rol</b>
                </div>
                <div style={{ display: "flex", gap: 20 }}>
                  {optionsRole?.map((opt, index) => {
                    return (
                      <div key={`${opt}${index}`}>
                        <input
                          type="radio"
                          id="role"
                          name="role"
                          value={opt}
                          checked={input?.role === opt}
                          onChange={onChangeOptionsRole}
                        ></input>
                        <label htmlFor="role"> {opt} </label>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {errors.name || errors.email || errors.phone ? (
              <div className={style.danger}>
                **Diligencie todos los datos correctamente
              </div>
            ) : (
              <button type="submit">Guardar</button>
            )}
          </form>
        </div>
      )}
    </div>
  );
};

export default ModifyUsers;
