import express from 'express';
import path from 'path';
import { __dirname } from '../app.js';
var router = express.Router();

/* GET home page. */
router.get('/*', function(req, res, next) {
  // Get welcome text, featured project, all project?
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

export default router;
