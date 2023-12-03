/** @format */

const mongoose = require("mongoose");
let connectionURL = process.env.DATABASE_CONNECTION_URL;

const dbConnection = async () => {
  try {
    await mongoose.connect(connectionURL, {
      dbName: process.env.DATABASE_NAME,
      serverSelectionTimeoutMS: 1000,
    });
    console.log("Database connected");
  } catch (error) {
    console.log(error);
  }
};
module.exports = dbConnection;
