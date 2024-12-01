const express = require("express");
const User = require("../models/User.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express.Router();
const jwtsecret="sampleapp";

// Register
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already exists" });

    const user = new User({ name, email, password });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(email,password)
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({success:false, message: "Invalid email or password" });

    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) return res.status(400).json({ success:false,message: "Invalid  password" });

    const token = jwt.sign({ userId: user._id },jwtsecret , { expiresIn: "1d" });
    res.json({success:true, token, userId: user._id });
  } catch (error) {
    console.log(error)
    res.status(500).json({success:false, message: "Server error" });
  }
});

module.exports = router;
