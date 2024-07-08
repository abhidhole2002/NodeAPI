const mongoose = require("mongoose");

const connectToDatabase = async () => {
  try {
    // await mongoose.connect("mongodb://127.0.0.1:27017/RestApi");
    await mongoose.connect(process.env.MONGO_URL);
    console.log("DB is connected successfully !");
  } catch (error) {
    console.log("ERROR : ", error);
  }
};

module.exports = connectToDatabase;
