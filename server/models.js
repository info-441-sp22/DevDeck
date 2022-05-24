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

  const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    username: String,
    email: String,
    description: String,
    created_date: Date,
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    posts: [String], // use reference instead of string?
    urls: [String],
    skillset: [String]
  })
  models.Post = mongoose.model('User', userSchema)

  const postSchema = new mongoose.Schema({
    username: String,
    created_date: Date,
    title: String,
    description: String,
    collaborators: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    techStack: [String],
    likes: [String]
  })

  models.Post = mongoose.model('Post', postSchema)

  const commentSchema = new mongoose.Schema({
    username: String,
    comment: String,
    post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
    created_date: Date,
  })
  models.Comment = mongoose.model('Comment', commentSchema)

  console.log("finished creating models");
}

export default models;
