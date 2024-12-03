// src/pages/Register.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://sampleloginapp-backend.vercel.app/api/auth/register", form,{withCredentials: true});
      alert("Registration successful! You can now log in.");
      navigate('/login')
    } catch (error) {
    
      alert(error.response.data.message || "Something went wrong.");
    }
  };

  return (
    <>
    <Navbar/>
    <div className="container mt-5">
      <h2 className="text-center">Register</h2>
      <form onSubmit={handleSubmit} className="card p-4 shadow mx-auto shadow" style={{ maxWidth: "400px" }}>
        <div className="form-group mb-3">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="form-control"
            placeholder="Enter your name"
            onChange={handleChange}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            required
            type="email"
            className="form-control"
            placeholder="Enter your email"
            onChange={handleChange}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            required
            type="password"
            className="form-control"
            placeholder="Enter your password"
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Register</button>
      </form>
    </div>
    </>
  );
};

export default Register;
