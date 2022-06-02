export const DEBUG = true;

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import sessions from 'express-session';

import indexRouter from './routes/index.js';
import apiRouter from './routes/api/api.js';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

// Local file imports
import models from './models.js';

const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001', 'https://www.devdeck.me'];
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
    origin: (origin, callback) => {
        // allow requests with no origin 
        // (like mobile apps or curl requests)
        if(!origin) return callback(null, true);
        if(allowedOrigins.indexOf(origin) === -1){
        var msg = 'The CORS policy for this site does not ' +
                    'allow access from the specified Origin.';
        return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    // origin: '*',
    credentials: true
}));
app.use(cookieParser());

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
