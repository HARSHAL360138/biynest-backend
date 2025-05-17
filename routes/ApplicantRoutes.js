const express = require("express");
const upload = require("../middleware/uploadMiddleware");
const ApplicantController = require("../controllers/ApplicantController");

const router = express.Router();

router.post("/", upload.single("resume"), ApplicantController.createApplicant);
router.get("/", ApplicantController.getApplicants);
router.get("/search", ApplicantController.searchApplicant);
router.get("/:id", ApplicantController.getApplicantById);
router.put("/:id", upload.single("resume"), ApplicantController.updateApplicant);
router.get("/:id/resume/view", ApplicantController.viewResume);
router.delete("/:id", ApplicantController.deleteApplicant);

module.exports = router;
