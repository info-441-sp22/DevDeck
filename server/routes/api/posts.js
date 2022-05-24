import express from 'express';

var router = express.Router();

// import getURLPreview from '../utils/urlPreviews.js';

/* POST posts. */
router.post('/', async function (req, res, next) {
  let session = req.session
  if (!session.isAuthenticated) { // upadte authentication check accoding to new log in method
    res.status(401).json({
      status: "error",
      error: "not logged in"
    })
  } else {
    try {
      const newPost = new req.models.Post({
        username: session.account.username, // perhaps not the right way to get it
        created_date: new Date(),
        title: req.body.title,
        description: req.body.description,
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

export default router;