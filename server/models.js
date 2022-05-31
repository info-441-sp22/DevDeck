import mongoose from "mongoose";

connectDB();

let models = {};

async function connectDB() {
  console.log("connecting to mongodb");
  // Put your MongoDB Atlas connection string in, or
  // Run mongo db locally with a command like:
  // Windows: mongod.exe --dbpath="c:\code\mongodbData\testdb"
  // Mac: brew services start mongodb-community@5.0
  await mongoose.connect('mongodb+srv://password12345:password12345@cluster0.0yecb.mongodb.net/devdeck');
  console.log("connected to mongodb");

  const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    username: String,
    password: String,
    email: String,
    bio: String,
    description: String,
    created_date: Date,
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }], 
    urls: [String],
    skillset: [String]
  });

  const postSchema = new mongoose.Schema({
    username: String,
    created_date: Date,
    title: String,
    blurb: String,
    longer_description: String,
    url_link: String,
    collaborators: [String],
    // collaborators: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    // techStack: [String],
    likes: [String]    
  })

  const commentSchema = new mongoose.Schema({
    username: String,
    comment: String,
    post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
    created_date: Date,
  })

  const imageSchema = new mongoose.Schema({
    img: {
      username: String,
      image_type: String,
      data: Buffer,
      content_type: String
    }
  })

  models.Post = mongoose.model('Post', postSchema);
  models.User = mongoose.model('User', userSchema);
  models.Comment = mongoose.model('Comment', commentSchema);

  console.log("finished creating models");
}

export default models;
