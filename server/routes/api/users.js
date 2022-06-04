import express from 'express';
import bcrypt from 'bcryptjs';
// Image upload stuff
import multer from 'multer';
import { authorizationRequired } from '../../middleware/auth.js';
const upload = multer({ dest: 'uploads/' });
var router = express.Router();

/* GET users listing. */
router.get('/heartbeat', async (req, res, next) => {
  const session = req.session;

  if (session.cookie && !session.isAuthenticated) {   // If there's a cookie with no info, then it's expired
    return res.json({
        error: 'User session has expired.',
        message: 'Session has expired. Please log in again.'
    });
  }

  return res.status(200).json({
    message: 'Session is still active.',
    status: 'success'
  })
})

router.get('/', async (req, res, next) => {
  const username = req.query.username;

  // Error guard for empty query
  if (!username) res.status(400).json({ message: 'Empty username query.', error: 'Client provided no query with endpoint.'});

  // Find the user with the `username`
  const user = await req.models.User.findOne({ username: username });

  // Error guard for user that doesn't exist
  if (!user) res.status(404).json({ message: 'User info fetch failed.', error: 'User with the username does not exist.'});

  // Remove the password field
  user.password = null;

  // Return the user information
  return res.json({
    message: 'User information successfully fetched.',
    payload: user,
    status: 'success'
  });
});

/* Signup/Login Stuff */
router.post('/login', async function(req, res, next) {
  const body = req.body;

  console.log(req.session);

  const user = await req.models.User.findOne({ username: body.username });

  // Error guard for unfound users
  if (!user) {
    return res.status(404).json({
      message: 'User does not exist.',
      error: 'User with the inputted username does not exist.'
    })
  } else {  // User has been found
    // Compare password
    bcrypt.compare(body.password, user.password, (err, isMatch) => {
      if (err) {
        return res.status(500).json({
          error: 'Error with comparing passwords.'
        });
      } else if (!isMatch) {
        return res.status(401).json({
          message: 'Invalid credentials inputted.',
          error: 'Invalid username and/or password.'
        })
      } else {
        // Start session
        req.session.userId = user._id;
        req.session.username = user.username;
        // Authenticate user
        req.session.isAuthenticated = true;

        req.session.save();

        const data = {
          userId: user._id,
          username: user.username,
          first_name: user.first_name,
          last_name: user.last_name
        }

        return res.json({
          message: 'Successfully signed in - session started.',
          payload: data,
          status: 'success'
        });
      }
    });
  }
});

router.delete('/logout', function(req, res, next) {
  req.session.destroy();
  return res.send('User successfully logged out.');
});

router.post('/signup', async (req, res, next) => {
  const body = req.body;
  // Error guard - check to see if username exists
  const uniqueUser = await req.models.User.findOne({ username: body.username });

  if (uniqueUser) {
    return res.status(401).json({
      error: 'User with the name already exists.',
      message: 'Username already taken. Please enter a unique username name.'
    })
  }

  // Encrypt the password
  const encryptedPassword = await encryptPassword(body.password, 10);

  // Create new user doc
  const user = new req.models.User({ 
    first_name: body.first_name,
    last_name: body.last_name,
    username: body.username,
    password: encryptedPassword,
    email: body.email,
    created_date: Date.now(),
    followers: [],
    following: [],
    posts: [], 
    urls: [],
    skillset: []
  });

  user.save() 
    .then((doc) => {
      res
        .status(201)
        .json({
          message: 'User has successfully signed up!',
          payload: doc
        });
    })
    .catch((error) => {
      console.log(JSON.stringify(error));
      res
        .status(500)
        .json({
          message: 'User signup has failed.',
          error: error
        })
    });
});

router.put('/bio', authorizationRequired, async function(req, res, next) {
  if (req.session.isAuthenticated) {
      let user = await req.models.User.findOne({username: req.body.username})
      console.log("found user")
      try {
          user.bio = req.body.bio;
          await user.save();
          return res.json({"status": "success"});
      } catch (error) {
          console.log(error);
          return res.status(500).json({"status": "error", "error": error});
      }
  } else {
      return res.status(401).json({
          status: "error",
          error: "not logged in"
      });
  }
});

router.put('/links', authorizationRequired, async function(req, res, next) {
  if (req.session.isAuthenticated) {
      try {
          let user = await req.models.User.findOne({username: req.body.username})
          console.log("found user")
          user.urls.push(req.body.linkName + '+' + req.body.linkURL);
          await user.save();
          return res.json({"status": "success"});
      } catch (error) {
          console.log(error);
          return res.status(500).json({"status": "error", "error": error});
      }
  } else {
      return res.status(401).json({
          status: "error",
          error: "not logged in"
      });
  }
});

router.put('/skills', authorizationRequired, async function(req, res, next) {
  if (req.session.isAuthenticated) {
      try {
          let user = await req.models.User.findOne({username: req.body.username})
          user.skillset.push(req.body.skill);
          await user.save();
          return res.json({"status": "success"});
      } catch (error) {
          console.log(error);
          return res.status(500).json({"status": "error", "error": error});
      }
  } else {
      return res.status(401).json({
          status: "error",
          error: "not logged in"
      });
  }
});

const encryptPassword = async (plaintext, rounds) => await bcrypt.hashSync(plaintext, await bcrypt.genSalt(rounds));

export default router;
