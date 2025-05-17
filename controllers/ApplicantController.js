const Applicant = require("../models/ApplicantModel");

// **CREATE Applicant**
exports.createApplicant = async (req, res) => {
    try {
        const { name, email, experience, background, position, phone } = req.body;

        if (!name || !email || !experience || !background || !position || !phone) {
            return res.status(400).json({ error: "All fields are required!" });
        }

        const newApplicant = new Applicant({
            name,
            email,
            experience,
            background,
            position,
            phone,
            resume: req.file ? { data: req.file.buffer, contentType: req.file.mimetype } : null,
        });

        await newApplicant.save();
        res.status(201).json({ message: "Application submitted successfully!", applicant: newApplicant });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// **GET All Applicants**
exports.getApplicants = async (req, res) => {
    try {
        const applicants = await Applicant.find().select("-resume"); 
        res.status(200).json(applicants);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// **SEARCH Applicant By Name**
exports.searchApplicant = async (req, res) => {
    try {
        const { name } = req.query;
        if (!name) {
            return res.status(400).json({ error: "Name query parameter is required!" });
        }

        const applicants = await Applicant.find({ name: new RegExp(name, "i") }).select("-resume");
        res.status(200).json(applicants);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// **GET Single Applicant**
exports.getApplicantById = async (req, res) => {
    try {
        const applicant = await Applicant.findById(req.params.id);
        if (!applicant) return res.status(404).json({ message: "Applicant not found" });
        res.status(200).json(applicant);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// **UPDATE Applicant**
exports.updateApplicant = async (req, res) => {
    try {
        const applicant = await Applicant.findById(req.params.id);
        if (!applicant) return res.status(404).json({ message: "Applicant not found" });

        applicant.name = req.body.name || applicant.name;
        applicant.email = req.body.email || applicant.email;
        applicant.experience = req.body.experience || applicant.experience;
        applicant.background = req.body.background || applicant.background;
        applicant.position = req.body.position || applicant.position;
        applicant.phone = req.body.phone || applicant.phone;

        if (req.file) {
            applicant.resume = { data: req.file.buffer, contentType: req.file.mimetype };
        }

        await applicant.save();
        res.status(200).json({ message: "Application updated successfully!", applicant });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// **VIEW Resume**
exports.viewResume = async (req, res) => {
    try {
        const applicant = await Applicant.findById(req.params.id);
        if (!applicant || !applicant.resume || !applicant.resume.data) {
            return res.status(404).json({ message: "Resume not found" });
        }

        res.setHeader("Content-Type", applicant.resume.contentType);
        res.setHeader("Content-Disposition", "inline");
        res.send(applicant.resume.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// **DELETE Applicant**
exports.deleteApplicant = async (req, res) => {
    try {
        const deletedApplicant = await Applicant.findByIdAndDelete(req.params.id);
        if (!deletedApplicant) return res.status(404).json({ message: "Applicant not found" });

        res.status(200).json({ message: "Application deleted successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
