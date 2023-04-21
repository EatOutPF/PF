import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postUsers } from "../../Redux/Actions";
import style from "./CreateUsers.module.css";
import Validation from "../../Components/Validations/Validations";
import { useNavigate } from "react-router-dom";

const CreateUserForm = () => {
  const dispatch = useDispatch();
  // Se asigna el rol de admin por defecto
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    role: "user",
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setErrors(Validation({ ...formData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData); // Agregamos un console.log para ver el objeto que se enviará al back
    dispatch(postUsers(formData));
    setFormData({
      name: "",
      phone: "",
      email: "",
      password: "",
      role: "",
    });
    navigate("/");
  };

  return (
    <div className={style.container}>
      <div className={style.containerCreateUser}>
        <h1>Create User</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <div>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                minLength={5}
                maxLength={255}
              />
            </div>
            {errors?.name && (
              <span style={{ color: "red", fontSize: 10 }}>{errors.name}</span>
            )}
          </div>
          <div>
            <label htmlFor="phone">Phone:</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
            {errors?.phone && (
              <span style={{ color: "red", fontSize: 10 }}>{errors.phone}</span>
            )}
          </div>
          <div>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            {errors?.email && (
              <span style={{ color: "red", fontSize: 10 }}>{errors.email}</span>
            )}
          </div>
          <div>
            <div>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            {errors?.password && (
              <span style={{ color: "red", fontSize: 10 }}>
                {errors.password}
              </span>
            )}
          </div>
          {/* Se usa un select para el rol */}
          {/*  <div>
            <label htmlFor="role">Role:</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="admin">Admin</option>
            </select>
          </div> */}

          {errors.name || errors.email || errors.phone || errors.password ? (
            <div>**Diligencia todos los datos</div>
          ) : (
            <button type="submit">Create User</button>
          )}
        </form>
      </div>
    </div>
  );
};

export default CreateUserForm;
