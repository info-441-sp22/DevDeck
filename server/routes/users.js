import express from 'express';
import bcrypt from 'bcryptjs';
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  let session = req.session;

  if (session.userId) {
    res.send('respond with a resource for the user: ', session.username);
  } else {
    res.send('Error: must be logged in.');
  }
});

router.post('/login', async function(req, res, next) {
  const body = req.body;
  let session = req.session;

  if (session.userId) { // already logged in
    res.send('Error: you are already logged in as ' + session.userId);
  }

  const user = await req.models.User.findOne({ username: body.username });

  // Error guard for unfound users
  if (!user) {
    res.status(500).json({
      message: 'User does not exist.',
      error: 'User with the inputted username does not exist.'
    })
  } else {  // User has been found
    // Compare password
    bcrypt.compare(body.password, user.password, (err, isMatch) => {
      if (err) {
        res.status(500).json({
          error: 'Error with comparing passwords.'
        });
      } else if (!isMatch) {
        res.status(401).json({
          message: 'Invalid credentials inputted.',
          error: 'Invalid username and/or password.'
        })
      } else {
        // Start session
        session.userId = user._id;
        session.username = user.username;
        res.json({
          message: 'Successfully signed in - session started.',
          payload: user,
          status: 'success'
        });
      }
    });
  }
});

router.post('/logout', function(req, res, next) {
  req.session.destroy();
  res.json({
    message: 'User is successfully logged out.',
    status: 'success'
  })
});

router.post('/signup', async (req, res, next) => {
  const body = req.body;

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
      res
        .status(500)
        .json({
          message: 'User signup has failed.',
          error: error
        })
    });
});

const encryptPassword = async (plaintext, rounds) => await bcrypt.hashSync(plaintext, await bcrypt.genSalt(rounds));

export default router;
