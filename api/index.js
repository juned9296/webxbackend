// api/index.js
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

// --- MongoDB Connection ---
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// --- Schemas & Models ---
const ProjectSchema = new mongoose.Schema({
  title: String,
  priceINR: Number,
  stack: [String],
  description: String,
});

const SupportSchema = new mongoose.Schema({
  email: String,
  whatsapp: String,
});

const WebxSchema = new mongoose.Schema({
  message: String,
});

const Project = mongoose.model("Project", ProjectSchema);
const Support = mongoose.model("Support", SupportSchema);
const Webx = mongoose.model("Webx", WebxSchema);

// --- Routes ---
app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "hello webx server is running smoothly 🚀",
  });
});

// Fetch projects from MongoDB
app.get("/projects", async (req, res) => {
  try {
    const projects = await Project.find({});

    res.json({
      status: "success",
      total: projects ? projects.length : 0,
      projects: projects || [],
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});


// Fetch support info from MongoDB
app.get("/support", async (req, res) => {
  try {
    const support = await Support.findOne(); 
    res.json({
      status: "success",
      email: support?.email || "not found",
      whatsapp: support?.whatsapp || "not found",
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

// Fetch webx message from MongoDB
app.get("/webx", async (req, res) => {
  try {
    const webx = await Webx.findOne(); 
    res.json({
      status: "success",
      message: webx?.message || "Video pasand aayi ho to subscribe kar lo 👍",
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});


module.exports = app;
