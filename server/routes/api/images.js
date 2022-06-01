import express from 'express';
import mongoose from "mongoose";
import multer from 'multer';
import GridFsBucket from 'gridfs-stream';

var router = express.Router();
const storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, `uploads`);
  },
  filename: function (req, file, callback) {
    const username = req.session.username;
    callback(null, `${username}-${Date.now()}-${file.originalname}.${file.mimetype.split('/')[1]}`);
  }
});
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10000000  // 10 MB
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg)$/)) { 
        // upload only png and jpg format
        return cb(new Error('Please upload only an image as .png or .jpg format under 10 MB.'))
    }
    cb(undefined, true)
  }
});

router.post('/profile', upload.single('file'), async (req, res) => {
  // Error guard for no file provided
  if (!req.file) {
    // Status error
    return res.status(404).json({
      error: 'No file was received.',
      message: 'Please send over a valid file.'
    });

  } else {
    // Save the connection into the DB
    const filename = req.file.filename;
    const username = req.session.username;

    // @TODO handle project image things
    const existingProfileImage = await req.models.Image.findOne({ username: username, purpose: 'profile' });

    if (existingProfileImage) { // Error guard, profile image already exists
      // Delete the image connection
      await req.models.Image.deleteOne({ username: username, purpose: 'profile' });
    }

    const image = new req.models.Image({
      username: username,
      filename: filename,
      purpose: 'profile',
      created_date: Date.now()
    });

    image.save();

    return res.json({
      message: 'Image has been successfully uploaded.',
      status: 'success'
    })
  }
});

router.get('/', async (req, res) => {
  const path = req.query.path;

  if (!path) {  // Error guard
    return res.status(404).json({
      error: 'No path in query.',
      message: 'Please enter a valid path in the query.'
    });
  }

  const tokens = path.split('.');

  res.set('Content-Type', `image/${tokens[tokens.length - 1]}`);
  res.sendFile(path);
});

router.get('/profile', async (req, res) => {
  const username = req.query.username;
  const image = await req.models.Image.findOne({ username: username, purpose: 'profile' });

  console.log(image);

  if (!image) { // Error guard - image not found
    return res.json({
      error: 'Profile image for the specified user is not found.',
      message: 'User needs to upload a profile image.'
    });
  }
  const tokens = image.path.split('.');

  res.set('Content-Type', `image/${tokens[tokens.length - 1]}`);
  res.sendFile(path.join(__dirname, 'public', 'imgs', 'uploads', ));
});

// let gfs;
// const conn = mongoose.connection;
// conn.once("open", function () { // Init gfs
//     gfs = Grid(conn.db, mongoose.mongo);
//     gfs.collection('photos');
// });

// router.post("/upload", upload.single("file"), async (req, res) => {
//   if (req.file === undefined) return res.send("you must select a file.");
//   const imgUrl = `http://localhost:3000/api/images/${req.file.filename}`;
//   return res.send(imgUrl);
// });

// router.get("/:filename", async (req, res) => {
//   try {
//       // const file = await gfs.files.findOne({ filename: req.params.filename });
//       // const readStream = gfs.createReadStream(file.filename);
//       // readStream.pipe(res);
//       await gfs.files.find({ filename: req.params.filename })
//         .toArray((err, files) => { 
//           res.set('Content-Type', 'image/jpeg');
//           console.log(files[0]);
//           // res.send(files[0]);

//           gfs.openDownloadStream(files[0]._id).pipe(res);
//           // gfs.createReadStream({ filename: req.params.filename }).pipe(res);
//         });
//   } catch (error) {
//       res.send(error);
//   }
// });

// router.delete("/:filename", async (req, res) => {
//   try {
//       await gfs.files.deleteOne({ filename: req.params.filename });
//       res.send("success");
//   } catch (error) {
//       console.log(error);
//       res.send("An error occured.");
//   }
// });

// router.post('/upload', upload.single('file'), async (req, res, next) => {
//     if (!req.file) {
//       // @TODO add response code
//       res.json({
//         message: 'You must select a file.',
//         error: 'No file in the request.'
//       });
//     }
//     // Error guard - wrong image file type
//     // if (!req.file.originalname.match('/\.(jpg|JPG|jpeg|JPEG]png|PNG)$/)')) {
//     //   res.send({
//     //     message: 'Only image files (jpg, jpeg, png) are allowed!'
//     //   });
//     // }
  
//     const body = req.body;
//     // const image = new req.models.Image({
//     //   username: body.username,
//     //   image_type: body.imageType,
//     //   data: fs.readFileSync(req.file.path),
//     //   content_type: 'images/jpg' 
//     // });
//     console.log(req.file);
//     // const image = new req.models.Image(req.file)
  
//     // // Save image
//     // image.save();
  
//     // // Debug
//     // const uploadedImage = req.models.Image.findOne({ username: body.username });
  
//     // console.log(uploadedImage);
  
//     res.json({
//       message: 'Image uploaded.',
//       status: 'success'
//     })
//   ;});

// router.get("/:filename", async (req, res) => {
//     try {
//         const file = await gfs.files.findOne({ filename: req.params.filename });
//         const readStream = gfs.createReadStream(file.filename);
//         readStream.pipe(res);
//     } catch (error) {
//         res.send("not found");
//     }
// });

// router.delete("/:filename", async (req, res) => {
//     try {
//         await gfs.files.deleteOne({ filename: req.params.filename });
//         res.send("success");
//     } catch (error) {
//         console.log(error);
//         res.send("An error occured.");
//     }
// });

export default router;