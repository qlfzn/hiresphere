// This router handles projects CRUD operations 
const express = require("express");
const router = express.Router();
const { registerUser, getUsers } = require("../controllers/UserController");

// route for add project
router.post("/signup", registerUser);

router.get("/all", getUsers);

module.exports = router;