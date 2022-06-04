import mongoose from "mongoose";

connectDB();

let models = {};

async function connectDB() {
  console.log("connecting to mongodb");
  console.log(process.env.DB);

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
    techStack: [String],
    likes: [String]    
  })

  const commentSchema = new mongoose.Schema({
    username: String,
    comment: String,
    post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
    created_date: Date,
  })

  const imageSchema = new mongoose.Schema({
    username: String,
    post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
    filename: String,
    purpose: String,
    created_date: Date
  })

  models.Post = mongoose.model('Post', postSchema);
  models.User = mongoose.model('User', userSchema);
  models.Comment = mongoose.model('Comment', commentSchema);
  models.Image = mongoose.model('Image', imageSchema);

  console.log("finished creating models");
}

export default models;
