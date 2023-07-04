const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../config/auth");
const User = require("../models/userModel");

//protecting routes
// router.get("/details", ensureAuthenticated, (req, res) => {
//     console.log("Details");
//     console.log(req.user.id) //didnt work
//     res.send(req.user);
// });

router.get('/details', ensureAuthenticated, (req, res) => {
    res.render('details'); // Render the details page if authenticated
  });

module.exports = router