// This router handles projects CRUD operations 
const express = require("express");
const router = express.Router();
const { syncUser, getUser } = require("../controllers/UserController");

// Main route entry -> '/api/users'

router.post('/user-sync', syncUser);

router.get('/get-user/:id', getUser);

module.exports = router;