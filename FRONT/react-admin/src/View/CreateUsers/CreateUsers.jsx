import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postUsers } from "../../Redux/Actions";
import style from "./CreateUsers.module.css";

const CreateUserForm = () => {
  const dispatch = useDispatch();
  // Se asigna el rol de admin por defecto
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    role: "admin",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
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
      role: "admin",
    });
  };


  return (
    <div className={style.container}>
      <div className={style.containerCreateUser}>
        <h1>Create User</h1>
        <form onSubmit={handleSubmit}>
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
          <div>
            <label htmlFor="phone">Phone:</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
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
          {/* Se usa un select para el rol */}
          <div>
            <label htmlFor="role">Role:</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="admin">Admin</option>
            </select>
          </div>
          <button type="submit">Create User</button>
        </form>
      </div>
    </div>
  );
};

export default CreateUserForm;