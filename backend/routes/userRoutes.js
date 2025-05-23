const express = require("express");
const router = express.Router();
const { getProfile } = require("../controllers/userController");
const auth = require("../middleware/authMiddleware");

router.get("/me", auth, getProfile);

module.exports = router;