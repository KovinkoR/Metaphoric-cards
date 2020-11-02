import express from 'express';

import { sessionUserChecker, sessionUserUnChecker } from '../middleware/sessionUserChecker.js';

const router = express.Router();

router.get('/', sessionUserUnChecker, (req, res) => {
  res.render('call')
})

export default router;
