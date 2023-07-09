const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../config/auth");
const User = require("../models/userModel");

//protecting routes
router.get("/details", (req, res) => {
  res.send("details page");
});

// router.post("/details", ensureAuthenticated, async(req,res)=>{
//   try{
//     const user=req.user;
//     const { dateOfBirth, gender, address, state, zip, phone, emergencyContact, image, medicalDoc } = req.body;
//     const update = await User.findByIdAndUpdate(
//       user._id,
//       {
//         $set: {
//           dateOfBirth: dateOfBirth,
//           gender: gender,
//           address: address,
//           state: state,
//           zip: zip,
//           phone: phone,
//           emergencyContact: emergencyContact,
//           image: image,
//           medicalDoc: medicalDoc,
//         },
//       },
//       { new: true }
//     );
//     res.send(user)    
//   }
//   catch{
//     console.error(err); // Log the error for debugging purposes
//     res.status(500).send("Internal Server Error");
//   }
  
// })
router.post("/details", ensureAuthenticated, async (req, res) => {
  try {
    const user = req.user;
    const { dateOfBirth, gender, address, state, zip, phone, emergencyContact, image, medicalDoc } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      {
        $set: {
          dateOfBirth: dateOfBirth,
          gender: gender,
          address: address,
          state: state,
          zip: zip,
          phone: phone,
          emergencyContact: emergencyContact,
          image: image,
          medicalDoc: medicalDoc,
        },
      },
      { new: true }
    );
    res.send(updatedUser);
  } catch (err) {
    console.error(err); // Log the error for debugging purposes
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router