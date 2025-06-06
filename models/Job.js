const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
    category: { type: String, required: true },
    title: { type: String, required: true },
    skills: { type: String, required: true },
    experience: { type: String, required: true },
    location: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Job", jobSchema);
