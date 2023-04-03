import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postUsers } from "../../Redux/Actions";



const CreateUserForm = () => {
    const dispatch = useDispatch();
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
      <div>
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
          <button type="submit">Create</button>
        </form>
      </div>
    );
  };
  
  export default CreateUserForm;