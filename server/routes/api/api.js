import express from 'express';
var router = express.Router();

import postsRouter from './posts.js';
// import urlsRouter from './urls.js';
// import commentsRouter from './comments.js';

router.use('/posts', postsRouter);
// router.use('/urls', urlsRouter);
// router.use('/comments', commentsRouter);


export default router;
