const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config(); 

const authRoutes = require("./routes/authRoutes");

const app = express();
app.use(express.json());

// ✅ Correct CORS setup
app.use(cors({
  origin: "http://localhost:3000", // React frontend
  methods: ["GET", "POST"],
  credentials: true
}));

// Routes
app.use("/api/auth", authRoutes);

// DB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Error:", err));

// Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
