const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config({path:"./.env"});

const app = express();

// Middleware
const corsOptions = {
  origin: true, // Allow all origins
  methods: ['GET', 'POST', 'OPTIONS'], // Allow GET, POST, and OPTIONS methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
  preflightContinue: false, // Automatically handle OPTIONS requests
};

app.use(cors(corsOptions)); // Apply CORS middleware globally
app.use(express.json());

// MongoDB connection
mongoose
  .connect(`${process.env.Mongo_Url}`)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Test route
app.get("/", (req, res) => {
  res.send("Hello from the MERN backend!");
});

const authRoutes = require("./src/routes/auth.js");
const contactsRoutes = require("./src/routes/contacts.js");

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/contacts", contactsRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
