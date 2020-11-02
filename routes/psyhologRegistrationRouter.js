import express from 'express';
import bcrypt from 'bcrypt';

import { sessionUserChecker } from '../middleware/sessionUserChecker.js';
import Psyholog from '../models/psyhologModel.js';

const router = express.Router();

router.get('/', sessionUserChecker, (req, res) => {
  res.render('psyhologRegistration');
});

router.post('/', async (req, res) => {
  const {
    psyhologName,
    psyhologPassword,
    psyhologEmail,
  } = req.body;
  try {
    const newPsyholog = new Psyholog({
      psyhologName,
      psyhologPassword: await bcrypt.hash(psyhologPassword, 10),
      psyhologEmail,
    });
    await newPsyholog.save();
    req.session.user = newPsyholog;
    res.json({ status: 200 });
  } catch (error) {
    res.json({ status: 'error' });
  }
});

export default router;
