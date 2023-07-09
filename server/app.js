const express = require("express") 
const mongoose = require("mongoose")
const passport = require("passport")
const session = require("express-session")
const cors = require("cors")
const dotenv = require("dotenv")
const connectDatabase = require("./config/database")
const PORT = process.env.PORT || 4000;
    
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//for passport
require("./config/passport")(passport);

//cors
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.CLIENT_URL);
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//connecting to database
connectDatabase();
app.listen(PORT, console.log(`Server running on ${PORT}`));

// Express session - Bcrypt hash the password
app.use(
    session({
      secret: process.env.s,
      resave: true,
      saveUninitialized: true,
      cookie: { maxAge: 60 * 60 * 1000 } // 1 hour
    })
);
  
//Passport middleware
app.use(passport.initialize());
app.use(passport.session());
  
app.use("/", require("./routes/index.js"));
app.use("/users", require("./routes/userRoutes.js"));