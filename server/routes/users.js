import express from 'express';
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

router.post("/login", function(req, res, next) {
  let session = req.session;
  console.log(`session at start of login: ${session}`);

  if (session.userId) { // already logged in
    res.send('Error: you are already logged in as ' + session.userId);
  }

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

router.post("/logout", function(req, res, next) {
  req.session.destroy();
  res.send("You are logged out.");
})
  
  
})

export default router;
