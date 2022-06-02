import express from 'express';
var router = express.Router();

import postsRouter from './posts.js';
import usersRouter from './users.js';
import imagesRouter from './images.js';
import commentsRouter from './comments.js';

router.use('/posts', postsRouter);
router.use('/users', usersRouter);
router.use('/images', imagesRouter);
router.use('/comments', commentsRouter);


export default router;
