import express from 'express';
import bcrypt from 'bcrypt';

import User from '../models/userModel.js';
import Psyholog from '../models/psyhologModel.js';

import { sessionUserChecker } from '../middleware/sessionUserChecker.js';
import Card from '../models/cardModel.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.render('home');
});

router.get('/errors', (req, res) => {
  res.render('errors');
});

router.get('/logout', async (req, res) => {
  if (req.session.user) {
    await req.session.destroy();
    res.clearCookie('user_sid');
    res.redirect('/login');
  }
  });


router.get('/login', sessionUserChecker, (req, res) => {
  res.render('login')
})


router.post('/login', async (req, res) => {
  const { userEmail, userPassword } = req.body;
  // console.log(userEmail, userPassword);
  try {
    const findUser = await User.findOne({ userEmail });
    console.log(findUser);
    if (!findUser) {
      throw new Error('user not found');
    }
    if (findUser && await bcrypt.compare(userPassword, findUser.userPassword)) {
      req.session.user = findUser;
      res.json({ loginSuccess: true });
    }
  } catch (error) {
    res.json({ loginSuccess: false, errorMessage: error.message });
  }
});

router.get('/psyhologlogin', sessionUserChecker, (req, res) => {
  res.render('psyhologlogin');
});

router.post('/psyhologlogin', async (req, res) => {
  const { PsyhologEmail, PsyhologPassword } = req.body;
  // console.log(PsyhologEmail, PsyhologPassword);
  try {
    const findPsyholog = await Psyholog.findOne({ PsyhologEmail });
    console.log(findPsyholog);
    if (!findPsyholog) {
      throw new Error('Psyholog not found');
    }
    if (findPsyholog && await bcrypt.compare(PsyhologPassword, findPsyholog.PsyhologPassword)) {
      req.session.Psyholog = findPsyholog;
      res.json({ loginSuccess: true });
    }
  } catch (error) {
    res.json({ loginSuccess: false, errorMessage: error.message });
  }
});

router.get('/test', async (req, res) => {
  const decks = await Card.find();
  console.log(decks);
  const { picturePath } = decks[1];
  res.render('cards', { picturePath });
});

export default router;
