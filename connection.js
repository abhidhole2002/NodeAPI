const mongoose = require("mongoose");

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("DB is connected successfully !");
  } catch (error) {
    console.log("ERROR : ", error);
    process.exit(1);
  }

  const db = mongoose.connection;
  db.on("connected", () => {
    console.log("mongoose connected to DB ");
  });

  db.on("error", (err) => {
    console.log("mongoose connection error : ", err);
  });

  db.on("disconnected", () => {
    console.log("mongoose disconnected");
  });

  process.on("SIGINT", async () => {
    await mongoose.connection.close();
    console.log("mongoose connection closed on app termination");
    process.exit(0);
  });
};

module.exports = connectToDatabase;
