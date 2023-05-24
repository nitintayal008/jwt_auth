const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
const connectDB = async (DATABASE_URL) => {
  try {
    const DB_OPTIONS = {
      dbName: "blogapp",
    };
    await mongoose.connect(DATABASE_URL, DB_OPTIONS);
    console.log("Database connected");
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
