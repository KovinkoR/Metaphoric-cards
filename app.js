/* eslint-disable import/extensions */
import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import FileStoreGeneral from 'session-file-store';

import useErrorHandlers from './middleware/error-handlers.js';
import sessionLocals from './middleware/sessionLocals.js';

import indexRouter from './routes/IndexRouter.js';
import registrationRouter from './routes/registrationRouter.js';
import psyhologRegistrationRouter from './routes/psyhologRegistrationRouter.js';
import gameRouter from './routes/gameRouter.js';
import deckRouter from './routes/deckRouter.js';
import callRouter from './routes/callRouter.js';

const app = express();
const FileStore = FileStoreGeneral(session);
dotenv.config();

app.set('view engine', 'hbs');
app.use(express.static(path.join(process.env.PWD, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(
  session({
    store: new FileStore(),
    key: 'user_sid',
    secret: 'kataus litcom po klave',
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 1000 * 60 * 60 * 24 * 365,
    },
  }),
);

app.use(sessionLocals);
app.use('/', indexRouter);
app.use('/registration', registrationRouter);
app.use('/psyhologregistration', psyhologRegistrationRouter);
app.use('/game', gameRouter);
app.use('/deck', deckRouter);
app.use('/call', callRouter);

useErrorHandlers(app);

const port = process.env.PORT ?? 3001;

app.listen(port, () => {
  console.log(`${port} is alive!`);
  try {
    mongoose.pluralize(null);
    mongoose.connect('mongodb://localhost:27017/metaphorical-cards', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.log('Db connection failed', error);
  }
});
