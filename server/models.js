import mongoose from "mongoose";
import { DEBUG } from "./app";

connectDB();

let models = {};

async function connectDB() {
  console.log("connecting to mongodb");
  // Put your MongoDB Atlas connection string in, or
  // Run mongo db locally with a command like:
  // Windows: mongod.exe --dbpath="c:\code\mongodbData\testdb"
  // Mac: brew services start mongodb-community@5.0
  if (DEBUG) {
    await mongoose.connect('mongodb://localhost:27017/devdeck');
  } else {
    await mongoose.connect('mongodb+srv://password12345:password12345@cluster0.0yecb.mongodb.net/devdeck');
  }
  console.log("connected to mongodb");

  //Add schemas and models
  
  console.log("finished creating models");
}

export default models;
