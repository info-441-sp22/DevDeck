export const DEBUG = true;

import express from 'express';
import cors from 'cors';
import path from 'path';
import multer from 'multer';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import sessions from 'express-session';
import Grid from 'gridfs-stream';

import indexRouter from './routes/index.js';
import apiRouter from './routes/api/api.js';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

// Local file imports
import models from './models.js';

var app = express();
var upload = multer();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
    origin: (DEBUG) ? 'http://localhost:3001' : 'http://devdeck.me',  
    credentials: true
}));
app.use(cookieParser());
app.use(upload.array());
app.use(cors({ origin: '*' }));

// MongoDB
app.use((req, res, next) => {
    req.models = models;
    next();
});

const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret: 'This is some secret key.',
    saveUninitialized: true,
    cookie: {
        maxAge: oneDay
    },
    resave: false
}));
app.use(express.static('public'));

app.use('/api', apiRouter);
app.use('/', indexRouter);  // Make sure it's at the end

export default app;
