import express from 'express';
var router = express.Router();

import postsRouter from './posts.js';
import usersRouter from './users.js';

router.use('/posts', postsRouter);
router.use('/users', usersRouter);


export default router;
