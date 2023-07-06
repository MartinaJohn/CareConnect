const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const passport = require("passport");

// Load User model
const User = require("../models/userModel");
const { response } = require("express");

//error formatter
const errorFormatter = (e) => {
  let errors = {};
  const allErrors = e.substring(e.indexOf(":") + 1).trim();
  const allErrorsArrayFormat = allErrors.split(",").map((err) => err.trim());
  allErrorsArrayFormat.forEach((error) => {
    const [key, value] = error.split(":").map((err) => err.trim());
    errors[key] = value;
  });
  return errors;
};

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const newUser = await User.create({
      name,
      email,
      password,
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then((user) => {
          res.status(200).json(user);
        });
      });
    });
  } catch (error) {
    if (error.code === 11000) {
      // Handle duplicate key error
      res.status(400).json({ message: 'Email is already registered' });
    } else {
      // Handle other errors
      res.status(500).json({ message: 'An error occurred' });
    }
  }

});

router.get("/login", (req, res) => {
  res.send("login page");
});


router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err); // Handle any internal server error
    }
    if (!user) {
      return res.status(401).json({ message: info.message });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err); // Handle any internal server error
      }
      
      return res.json({ message: 'Login successful', user: user});
    });
  })(req, res, next);
});



// Logout
router.post("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/users/login");
  });
});


module.exports = router;