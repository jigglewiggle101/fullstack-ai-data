const express = require("express");
const multer = require("multer");
const axios = require("axios");
const Dataset = require("../models/Dataset");

const router = express.Router();

// Configure file upload with Multer
const upload = multer({ dest: "uploads/" });

// Route: Upload dataset and perform analysis
router.post("/analyze", upload.single("file"), async (req, res) => {
  try {
    const { task } = req.body;
    const file = req.file;

    if (!file) return res.status(400).json({ error: "No file uploaded" });

    // Send file to the AI analytics microservice
    const formData = new FormData();
    formData.append("file", file.buffer, file.originalname);
    formData.append("task", task);

    const response = await axios.post("http://localhost:5001/analyze", formData, {
      headers: formData.getHeaders(),
    });

    // Save the dataset and results to MongoDB
    const dataset = new Dataset({
      filename: file.originalname,
      analysisResults: response.data,
    });
    await dataset.save();

    res.json({ message: "Analysis completed", results: response.data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error during analysis" });
  }
});

module.exports = router;
