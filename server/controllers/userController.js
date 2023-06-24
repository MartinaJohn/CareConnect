const ErrorHandler = require("../utils/errorhandler")
const User = require("../models/userModel")
const catchAsyncErrors = require("../middleware/catchAsyncErrors")
const sendToken = require("../utils/jwtToken")

//Register a user
exports.registerUser = catchAsyncErrors(async(req,res,next)=>{
    const {name, email,password} = req.body;
    const user = await User.create({
        name, email, password
    })

    sendToken(user, 201,res);
})

//login user
exports.loginUser = catchAsyncErrors(async(req,res,next)=>{
    const { email, password } = await req.body;

  // checking if user has given password and email both

  if (!email || !password) {
    return next(new ErrorHander("Please Enter Email & Password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHander("Invalid email or password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHander("Invalid email or password", 401));
  }
    
  sendToken(user, 200,res);

})