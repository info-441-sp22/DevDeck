import express from 'express';
import { authorizationRequired } from '../../middleware/auth.js';

var router = express.Router();

// import getURLPreview from '../utils/urlPreviews.js';

/* POST posts. */
router.post('/',  authorizationRequired, async function (req, res, next) {
  let session = req.session;

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
    return res.json({ "status": "success" });
  } catch (error) {
    console.log("An error occured:" + error)
    return res.status(500).json({ "status": "error", "error": error })
  }
});

router.get('/single', async (req, res, next) => {
  const id = req.query.id;

  // Error guard for empty query
  if (!id) res.status(400).json({ message: 'Empty post id query.', error: 'Client provided no query with endpoint.'});

  // Find the id with the `id`
  const post = await req.models.Post.findOne({ _id: id });

  // Error guard for user that doesn't exist
  if (!post) res.status(404).json({ message: 'Post info fetch failed.', error: 'Post with the id does not exist.'});

  // Return the user information
  return res.json({
    message: 'Post information successfully fetched.',
    payload: post,
    status: 'success'
  });
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
    return res.json(toReturn);

  } catch (error) { // catch errors
    console.log(error);
    return res.status(500).json({ "status": "error", "error": error });
  }
});



export default router;