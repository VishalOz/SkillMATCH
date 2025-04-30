const express = require("express");
const router = express.Router();
const { createSkill, getSkills } = require("../controllers/skillController");
const auth = require("../middleware/authMiddleware");

router.post("/", auth, createSkill);
router.get("/", getSkills);

module.exports = router;