import express from 'express';

var router = express.Router();

// import getURLPreview from '../utils/urlPreviews.js';

/* POST posts. */
router.post('/', async function (req, res, next) {
  let session = req.session;
  
  if (!session.isAuthenticated) { // upadte authentication check accoding to new log in method
    res.status(401).json({
      status: "error",
      error: "not logged in"
    })
  } else {
    try {
      const newPost = new req.models.Post({
        username: session.username, // perhaps not the right way to get it
        created_date: new Date(),
        title: req.body.title,
        blurb: req.body.blurb,
        longer_description: req.body.longer_description,
        url_link: req.body.url_link,
        collaborators: req.body.collaborators, // assuming we get it in an array
        likes: []
      })

      await newPost.save()
      res.json({ "status": "success" });
    } catch (error) {
      console.log("An error occured:" + error)
      res.status(500).json({ "status": "error", "error": error })
    }
  }
});

router.get('/', async function (req, res) {
  try {
    var username = req.query.username;
    let toReturn = [];

    // find all posts in mongodb database
    let allPosts = await req.models.Post.find();

    // loop through each post
    for (let i = 0; i < allPosts.length; i++) {
      let post = allPosts[i];
      let newPost = {
        "username": post.username,
        "created_date": post.created_date,
        "title": post.title,
        "blurb": post.blurb,
        "longer_description": post.longer_description,
        "url_link": post.url_link,
        "collaborators": post.collaborators,
        "techStack": post.techStack,
        "likes": post.likes,
        "id": post._id, // Mongodb built-in "_id" field with the key "id"        
      };

      if (username) { // if query parameter is set
        if (post.username === username) {
          toReturn.push(newPost); // send back just posts made by user
        }
      } else {
        toReturn.push(newPost); // send back all posts
      }
    }

    // return an array of json objects
    res.json(toReturn);

  } catch (error) { // catch errors
    console.log(error);
    res.status(500).json({ "status": "error", "error": error });
  }
});

export default router;