const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Routes
const authRoutes = require("./routes/auth");
const analyticsRoutes = require("./routes/analytics");

app.use("/auth", authRoutes);
app.use("/analytics", analyticsRoutes);

app.listen(3000, () => {
  console.log("Server running on port 5000");
});
