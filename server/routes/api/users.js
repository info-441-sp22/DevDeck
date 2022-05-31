import express from 'express';
import bcrypt from 'bcryptjs';
import fs from 'fs';
// Image upload stuff
import multer from 'multer';
const storage = multer.diskStorage({
  destination: function (req, res, cb) {
      cb(null, './uploads/')
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    cb(null, `uploads/${file.originalname}-${Date.now()}.${ext}`);
  }
});
const upload = multer({ storage: storage });
var router = express.Router();

/* GET users listing. */
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
  res.json({
    message: 'User information successfully fetched.',
    payload: user,
    status: 'success'
  });
});

router.post('/imgUpload', upload.single('image'), async (req, res, next) => {
  // Error guard - wrong image file type
  if (!req.file.originalname.match('/\.(jpg|JPG|jpeg|JPEG]png|PNG)$/)')) {
    res.send({
      message: 'Only image files (jpg, jpeg, png) are allowed!'
    });
  }

  const body = req.body;
  // const image = new req.models.Image({
  //   username: body.username,
  //   image_type: body.imageType,
  //   data: fs.readFileSync(req.file.path),
  //   content_type: 'images/jpg' 
  // });
  console.log(req.file);
  // const image = new req.models.Image(req.file)

  // // Save image
  // image.save();

  // // Debug
  // const uploadedImage = req.models.Image.findOne({ username: body.username });

  // console.log(uploadedImage);

  res.json({
    message: 'Image uploaded.',
    status: 'success'
  })
;});

/* Signup/Login Stuff */
router.post('/login', async function(req, res, next) {
  const body = req.body;
  let session = req.session;

  if (session.userId) { // already logged in
    res.send('Error: you are already logged in as ' + session.userId);
  }

  const user = await req.models.User.findOne({ username: body.username });

  // Error guard for unfound users
  if (!user) {
    res.status(404).json({
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
        // Authenticate user
        session.isAuthenticated = true;

        const data = {
          userId: user._id,
          username: user.username,
          first_name: user.first_name,
          last_name: user.last_name
        }

        res.json({
          message: 'Successfully signed in - session started.',
          payload: data,
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
