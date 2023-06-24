const mongoose = require("mongoose");


//using atlas
require('dotenv').config();
const PORT = process.env.PORT;
const connectDatabase =()=>{
mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected");
  })
  //.catch((err) => console.log(err));
}

module.exports = connectDatabase;
