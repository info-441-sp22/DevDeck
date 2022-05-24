import express from 'express';
import bcrypt from 'bcryptjs';
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  let session = req.session;

  if (session.userId) {
    res.send('respond with a resource for the user: ', session.userId);
  } else {
    res.send('Error: must be logged in.');
  }
});

router.post('/login', function(req, res, next) {
  const username = req.body.username;
  const plainTextPassword = req.body.password;
  let session = req.session;

  console.log(`session at start of login: ${session}`);

  if (session.userId) { // already logged in
    res.send('Error: you are already logged in as ' + session.userId);
  }

  // Hash the password 


  //@TODO handle database login stuff
  //check username and password
  // if(req.body.username == "kylethayer" && req.body.password == "asdasd"){
  //   //TODO: start a session
  //   session.userId = "kyleThayer"
  //   console.log(`session after login: ${session}`);
  //   res.send("you logged in")
  // } else if (req.body.username == "other" && req.body.password == "pwd") {
  //   session.userId = "other"
  //   console.log(`session after login: ${session}`);
  //   res.send("you logged in")

  // } else{
  //   //not start session
  // console.log(`session after failed login: ${session}`);
  //   res.send("wrong login info")
  // }
});

router.post('/logout', function(req, res, next) {
  req.session.destroy();
  res.send("You are logged out.");
});

router.post('/signup', async (req, res, next) => {
  const body = req.body;

  // Encrypt the password
  const salt = await bcrypt.genSalt(10);
  const encryptedPassword = await bcrypt.hashSync(body.password, salt);

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

export default router;
