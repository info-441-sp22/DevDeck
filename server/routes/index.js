import express from 'express';
import { __dirname } from '../app.js';
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // Get welcome text, featured project, all project?
  
  res.sendFile('/public/client/index.html', { root: __dirname });
});

export default router;
