import express from 'express';
import bcrypt from 'bcrypt';

import { sessionUserChecker } from '../middleware/sessionUserChecker.js';
import User from '../models/userModel.js';

const router = express.Router();

router.get('/', sessionUserChecker, (req, res) => {
  res.render('registrationForm');
});

router.post('/', async (req, res) => {
  const {
    userName,
    userPassword,
    userEmail,
  } = req.body;
  try {
    const newUser = new User({
      userName,
      userPassword: await bcrypt.hash(userPassword, 10),
      userEmail,
    });
    await newUser.save();
    req.session.user = newUser;
    res.json({ status: 200 });
  } catch (error) {
    res.json({ status: 'error' });
  }
});

export default router;
