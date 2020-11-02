import mongoose from "mongoose";

const psyhologScheme = mongoose.Schema({
  psyhologName: String,
  psyhologPassword: {
    type: String,
    // required: [true, 'Введите логин'],
  },
  psyhologEmail: {
    type: String,
    // unique: [true, 'Эта почта уже зарегестрирована'],
    // required: true,
  },
  scrf_token: {
    type: String,
  },
  vkontakteId: String,
});

psyhologScheme.statics.findOrCreate = function findOrCreate(profile, cb) {
  const psyhologObj = new this();
  // console.log(userObj );
  // req.session.user = userObj;
  this.findOne({ _id: profile.id }, (err, result) => {
    if (!result) {
      psyhologObj.psyhologgName = profile.displayName;
      // ....
      psyhologObj.save(cb);
      // console.log(req.session);
    } else {
      cb(err, result);
    }
  });
};

export default mongoose.model('psyhologs', psyhologScheme);
