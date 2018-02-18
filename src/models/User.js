const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const uuidv4 = require('uuid/v4');

const Schema = { mongoose };

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  token: {
    type: String,
  },
});

/* eslint func-names: ["error", "never"] */
UserSchema.pre('save', function (next) {
  const user = this;

  if (user.isModified('password')) {
    bcrypt.genSalt(10, (error, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) console.error(error);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

UserSchema.methods.generateAuthToken = function () {
  const user = this;
  const token = uuidv4();
  user.token = token;

  return user.save().then(() => token);
};

UserSchema.methods.removeAuthToken = function () {
  const user = this;
  const token = uuidv4();
  user.token = token;

  return user.update({
    token: '',
  });
};

UserSchema.statics.findByToken = function (token) {
  const User = this;

  return User.findOne({
    token,
  });
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
