import express from 'express';
import CardModel from '../models/cardModel.js';
import multer from 'multer';

const router = express.Router();

router.get('/', (req, res) => {
    res.render('uploadDeck')
})

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // cb(null, './uploads')
        cb(null, './public/img/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload = multer({ storage: storage });
const arrUpload = upload.array('cards', 4);
// upload.single('avatar')
router.post('/', upload.single('avatar'), async function (req, res, next) {
    // console.log(req.file);
    // console.log(req.body)
    const deckTitle = JSON.parse(JSON.stringify(req.body))
    // console.log(deckTitle);
    // console.log(req.session.user);
    let newDeck;
    newDeck = await new CardModel({
        deckTitle: deckTitle.deckTitle,
        coverPath: `/img/${deckTitle.deckTitle}/${req.file.filename}`
    });
    await newDeck.save();
    console.log(newDeck);
    if (req.file.mimetype === 'image/png' ||
        req.file.mimetype === 'image/jpg' ||
        req.file.mimetype === 'image/jpeg') {
        res.redirect('/deck');
    }
    else
        res.send("Ошибка при загрузке файла");
//     // req.file - файл `avatar`
//     // req.body сохранит текстовые поля, если они будут
})


export default router;