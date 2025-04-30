const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require('cors');

dotenv.config();
connectDB();


const app = express();
app.use(express.json());

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));

app.get("/test", (req, res) => {
  res.json({ message: "Test route works" });
});

app.use("/api/auth", require("./routes/authRoutes.js"));
// app.use("/api/users", require("./routes/userRoutes"));
// app.use("/api/skills", require("./routes/skillRoutes"));





const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));