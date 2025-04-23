import mongoose from "mongoose";
import appConfig from "./appconfig";

const databaseConnection = async (callback: () => void) => {
  try {
    if (appConfig.databaseUrl) {
      const client = await mongoose.connect(appConfig.databaseUrl);
      if (client) {
        console.log("Database connected successfully.");
        callback();
      } else {
        console.log("Database could not be connected.");
      }
    }
  } catch (error) {
    console.log("Error: ", error);
  }
};

module.exports = databaseConnection;
