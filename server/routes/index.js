const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../config/auth");
const User = require("../models/userModel");

//Dashboard - protecting routes
// router.get("/dashboard", ensureAuthenticated, (req, res) => {
//     console.log("Dashboard");
//     res.send(req.user);
// });

module.exports = router