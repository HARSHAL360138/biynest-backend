const mongoose = require("mongoose");

const applicantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    experience: { type: String, required: true },
    background: { type: String, required: true },
    position: { type: String, required: true },
    phone: { type: String, required: true },
    resume: { 
        data: Buffer, 
        contentType: String 
    },
}, { timestamps: true });

const Applicant = mongoose.model("Applicant", applicantSchema);
module.exports = Applicant;
