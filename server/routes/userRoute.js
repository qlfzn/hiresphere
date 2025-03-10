// This router handles projects CRUD operations 
const express = require("express");
const router = express.Router();
const { syncUser, getUser } = require("../controllers/UserController");

// Main route entry -> '/api/users'

router.post('/sync-user', syncUser);

router.get('/get-user/:id', getUser);

module.exports = router;