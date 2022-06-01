import express from 'express';
import mongoose from "mongoose";
import multer from 'multer';
import GridFsBucket from 'gridfs-stream';
import path from 'path';
import { __dirname } from '../../app.js';

var router = express.Router();
const storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, `uploads`);
  },
  filename: function (req, file, callback) {
    const username = req.session.username;
    callback(null, `${Date.now()}-${file.originalname}.${file.mimetype.split('/')[1]}`);
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
    console.log('username', username);

    // @TODO handle project image things
    const existingProfileImage = await req.models.Image.findOne({ username: username, purpose: 'profile' });

    if (existingProfileImage) { // Error guard, profile image already exists
      console.log(existingProfileImage);
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
  return res.sendFile(path);
});

router.get('/profile', async (req, res) => {
  const username = req.query.username;
  console.log(username);
  const image = await req.models.Image.findOne({ username: username, purpose: 'profile' });

  console.log(image);

  if (!image) { // Error guard - image not found
    return res.json({
      error: 'Profile image for the specified user is not found.',
      message: 'User needs to upload a profile image.'
    });
  }
  const tokens = image.filename.split('.');

  res.set('Content-Type', `image/${tokens[tokens.length - 1]}`);
  return res.sendFile(path.join(__dirname, 'uploads', image.filename));
});

export default router;