import express from 'express';
import Card from '../models/cardModel.js';

import { sessionUserChecker, sessionUserUnChecker } from '../middleware/sessionUserChecker.js';

const router = express.Router();

router.route('/', sessionUserUnChecker)
  .get(async (req, res) => {
    const deck1 = await Card.find({ deckTitle: 'deck1' });
    // console.log(deck1);
    const { picturePath1 } = deck1[0];
    const { picturePath2 } = deck1[0];
    const { coverPath } = deck1[0];
    const deck1Id = deck1[0]._id.toString();
    const deck2 = await Card.find({ deckTitle: 'deck2' });
    const picturePath12 = deck2[0].picturePath1;
    const picturePath22 = deck2[0].picturePath2;
    const coverPath2 = deck2[0].coverPath;
    const deck2Id = deck2[0]._id.toString();
    // console.log(typeof deck2Id);
    const deck3 = await Card.find({ deckTitle: 'deck3' });
    const coverPath3 = deck3[0].coverPath;
    const deck4 = await Card.find({ deckTitle: 'deck4' });
    const coverPath4 = deck4[0].coverPath;
    const deck5 = await Card.find({ deckTitle: 'deck5' });
    const coverPath5 = deck5[0].coverPath;
    const deck6 = await Card.find({ deckTitle: 'deck6' });
    const coverPath6 = deck6[0].coverPath;
    const deck7 = await Card.find({ deckTitle: 'deck7' });
    const coverPath7 = deck7[0].coverPath;
    res.render('gameGround', {
      picturePath1,
      picturePath2,
      coverPath,
      picturePath12,
      picturePath22,
      coverPath2,
      deck2Id,
      deck1Id,
      coverPath3,
      coverPath4,
      coverPath5,
      coverPath6,
      coverPath7
    });
  });

router.get('/:id', sessionUserUnChecker, async (req, res) => {
  const deck = await Card.find({ _id: req.params.id });
  // console.log(deck);
  const { picturePath1, picturePath2 } = deck[0];
  // console.log(picturePath1, picturePath2);
  res.json({ picturePath1, picturePath2 });
});

export default router;
