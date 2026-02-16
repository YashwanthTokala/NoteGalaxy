const mongoose = require("mongoose");

const connectToMongo = async () => {
  try {
    console.log("MONGO_URI =", process.env.MONGO_URI); // debug line

    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

module.exports = connectToMongo;
