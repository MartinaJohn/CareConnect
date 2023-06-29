const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../config/auth");
const User = require("../models/userModel");

//protecting routes
router.get("/details", ensureAuthenticated, (req, res) => {
    console.log("Details");
    console.log(req.user.id) //didnt work
    res.send(req.user);
});

module.exports = router