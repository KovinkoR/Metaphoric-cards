import mongoose from "mongoose";

const userScheme = mongoose.Schema({
  userName: String,
  userPassword: {
    type: String,
    required: [true, 'Введите логин'],
  },
  userEmail: {
    type: String,
    unique: [true, 'Эта почта уже зарегестрирована'],
    required: true,
  },
});

export default mongoose.model("users", userScheme);
