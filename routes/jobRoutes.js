const express = require("express");
const { createJob, getJobs, updateJob, deleteJob } = require("../controllers/jobController");

const router = express.Router();

router.post("/", createJob);
router.get("/", getJobs);
router.put("/:id", updateJob);
router.delete("/:id", deleteJob);

module.exports = router;
