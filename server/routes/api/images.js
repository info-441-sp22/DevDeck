import express from 'express';
import mongoose from "mongoose";
import multer from 'multer';
import GridFsBucket from 'gridfs-stream';
import path from 'path';
import { __dirname } from '../../app.js';
import { unlinkSync } from 'fs';

var id_queue = [];
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
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) { 
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

    const existingProfileImage = await req.models.Image.findOne({ username: username, purpose: 'profile' });

    if (existingProfileImage) { // Error guard, profile image already exists
      // Delete the image connection
      await req.models.Image.deleteOne({ username: username, purpose: 'profile' });

      // Delete the image in uploads
      unlinkSync(path.join(__dirname, 'uploads', existingProfileImage.filename));
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

router.post('/post/metadata', async (req, res) => {
  const username = req.body.username;
  const post_id = req.body.post_id;

  // Create the queue ticket
  const queueTicket = {
    username: username,
    post_id: post_id
  };

  // Add to the queue
  id_queue.push(queueTicket);
  
  // Send the ticket to the client
  return res.json({
    message: 'Queue ticket metadata created.',
    payload: queueTicket,
    status: 'success'
  });
});

router.post('/post', upload.single('file'), async (req, res) => {
  // Error guard for no file provided
  if (!req.file) {
    // Status error
    return res.status(404).json({
      error: 'No file was received.',
      message: 'Please send over a valid file.'
    });
  } 
  const filename = req.file.filename;
  const username = req.session.username;

  // Find the queue ticket
  const queueTicket = id_queue.find(ticket => ticket.username === username);

  // Error guard - ticket not found
  if (!queueTicket) return res.status(404).json({
    error: 'No queue ticket was found.',
    message: 'Error uploading the post file.'
  });

  // Save the connection into the DB
  const query = { 
    username: username, 
    post: queueTicket.post_id, 
    purpose: 'post' 
  };

  const existingProfileImage = await req.models.Image.findOne(query);

  if (existingProfileImage) { // Error guard, image already exists
    // Delete the image connection
    await req.models.Image.deleteOne(query);

    // Delete the image in uploads
    unlinkSync(path.join(__dirname, 'uploads', existingProfileImage.filename));
  }

  const image = new req.models.Image({
    username: username,
    filename: filename,
    purpose: 'post',
    post: queueTicket.post_id,
    created_date: Date.now()
  });

  image.save();

  return res.json({
    message: 'Image has been successfully uploaded.',
    status: 'success'
  })
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
  const image = await req.models.Image.findOne({ username: username, purpose: 'profile' });

  if (!image) { // Error guard - image not found
    res.set('Content-Type', `image/png`);
    return res.sendFile(path.join(__dirname, 'uploads', 'blank_profile_image.png'));
  }

  const tokens = image.filename.split('.');

  res.set('Content-Type', `image/${tokens[tokens.length - 1]}`);
  return res.sendFile(path.join(__dirname, 'uploads', image.filename));
});

router.get('/post', async (req, res) => {
  const username = req.query.username;
  const image = await req.models.Image.findOne({ username: username, purpose: 'post' });

  if (!image) { // Error guard - image not found
    res.set('Content-Type', `image/png`);
    return res.sendFile(path.join(__dirname, 'uploads', 'blank_profile_image.png'));
  }

  const tokens = image.filename.split('.');

  res.set('Content-Type', `image/${tokens[tokens.length - 1]}`);
  return res.sendFile(path.join(__dirname, 'uploads', image.filename));
});

export default router;