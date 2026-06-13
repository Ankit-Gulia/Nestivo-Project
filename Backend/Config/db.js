
const mongoose = require("mongoose");

const URI = process.env.MONGO_URI;
const connectDB = async () => {
    mongoose.connect(URI).then(() => console.log("Db Connected~")).catch((err) => console.log(err));
}; 

module.exports = connectDB;
