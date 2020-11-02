import mongoose from "mongoose";

const cardSchema = mongoose.Schema({
    deckTitle: String,
    coverPath: String,
    picturePath1: Array,
    picturePath2: Array
});

export default mongoose.model("cards", cardSchema);