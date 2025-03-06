// This router handles projects CRUD operations 
const express = require("express");
const router = express.Router();
const addProject = require("../controllers/ProjectController");

// route for add project
router.post("/projects/", searchProducts);

module.exports = router;