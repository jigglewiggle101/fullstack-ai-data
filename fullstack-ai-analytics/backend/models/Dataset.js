const mongoose = require("mongoose");

const DatasetSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now },
  analysisResults: { type: Object }, // Store AI-generated results
});

module.exports = mongoose.model("Dataset", DatasetSchema);
