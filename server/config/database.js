const mongoose = require("mongoose");

//using atlas
require('dotenv').config();
const PORT = process.env.PORT || 4000;
const connectDatabase =()=>{
mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected");
    //app.listen(PORT, console.log(`Server running on  ${PORT}`));
  })
  .catch((err) => console.log(err));
}

module.exports = connectDatabase;
