// src/pages/Login.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post("https://sampleloginapp-backend.vercel.app/api/auth/login", form);
      console.log(response)
      if(response.data.success){
      localStorage.setItem("token", response.data.token);
      alert("Login successful!");
      navigate("/dashboard");
      }
    } catch (error) {
      alert(error.response.data.message || "Something went wrong.");
      console.log(error)
    }
  };

  return (
    <>
    <Navbar/>
    <div className="container mt-5">
      <h2 className="text-center">Login</h2>
      <form onSubmit={handleSubmit} className="card p-4 shadow mx-auto shadow" style={{ maxWidth: "400px" }}>
        <div className="form-group mb-3">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            required
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
            type="password"
            required
            className="form-control"
            placeholder="Enter your password"
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Login</button>
      </form>
    </div>
    </>
  );
};

export default Login;
