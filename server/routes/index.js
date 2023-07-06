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

// router.get('/details', ensureAuthenticated, (req, res) => {
//     //res.render('details'); // Render the details page if authenticated
//     res.send("Details page")
// });
router.get("/details", (req, res) => {
  res.send("login page");
});

router.post("/details", ensureAuthenticated, async(req,res)=>{
  const user=req.user;
  const { address, zip } = req.body;
  const update = await User.findByIdAndUpdate(
    user._id,
    {
      $set: {
        address: address,
        zip: zip,
      },
    },
    { new: true }
  );
  res.send(update, user);
})
module.exports = router