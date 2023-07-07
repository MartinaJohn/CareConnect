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

// router.get("/login", (req, res) => {
//   res.send("login page");
// });


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

//new 
router.post('/patient-details', async(req, res)=> {
  try {
    const {name, description, price, category, images: pictures} = req.body;
    const detail = await User.create({name, description, price, category, pictures});
    const details = await User.find();
    res.status(201).json(products);
  } catch (e) {
    res.status(400).send(e.message);
  }
})
// Details route
// router.post("/details", passport.authenticate('local'), async (req, res) => {
//   // const { address, zip } = req.body;

//   // try {
//   //   // Find the logged-in user
//   //   const user = await User.findById(req.user.id);

//   //   // Update user details
//   //   user.name = req.user.name;
//   //   user.email = req.user.email;
//   //   // user.password = req.user.password; // Note: This assumes you are updating the password as well

//   //   user.address = address;
//   //   user.zip = zip;

//   //   // Save the updated user
//   //   await user.save();

//   //   res.status(200).json({ message: 'User details updated successfully' });
//   // } catch (error) {
//   //   res.status(500).json({ message: 'An error occurred' });
//   // }
//   // Get the address and zipCode from the request body
//   const { address, zip } = req.body;

//   // Access the logged-in user object from req.user
//   const loggedInUser = req.user;

//   // Update the address and zip code for the logged-in user
//   loggedInUser.address = address;
//   loggedInUser.zip = zip;

//   // Save the updated user object
//   loggedInUser.save((err) => {
//     if (err) {
//       return res.status(500).json({ message: "An error occurred" });
//     }
//     return res.json({ message: "User details updated successfully", user: loggedInUser });
//   });
// });


module.exports = router;