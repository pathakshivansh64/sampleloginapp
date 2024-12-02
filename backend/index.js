const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config({path:"./.env"});

const app = express();

// Middleware
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = ['https://sampleloginapp-frontend.vercel.app'];
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true); // Allow the request
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'OPTIONS','PUT'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));  // Apply CORS
app.use(express.json());  // Parse incoming JSON

// Handle preflight requests
app.options('*', cors(corsOptions));

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
