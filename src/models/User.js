const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const uuidv4 = require('uuid/v4');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  fullname: {
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

UserSchema.statics.authenticate = function (username, password, callback) {
  User.findOne({ username: username })
    .exec(function (err, user) {
      if (err) {
        return callback(err)
      } else if (!user) {
        var err = new Error('Invalid User credentials.');
        err.status = 401;
        return callback(err);
      }
      bcrypt.compare(password, user.password, function (err, result) {
        if (result === true) {
          user.generateAuthToken();
          return callback(null, user);
        } else {
          var err = new Error('Invalid User credentials.');
          return callback(err);
        }
      })
    });
}

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
UserSchema.statics.expireToken = function (token, callback) {
  User.update(token, { token: '' }, function (err, user) {
    if (err) {
      return callback(err);
    } else {
      return callback(null, user);
    }
  });
}
UserSchema.statics.findByToken = function (token, callback) {
  const User = this;

  return User.findOne(token, { username: 1, fullname: 1, age: 1 }).exec(function (err, user) {
    if (err)
      return callback(new Error('Invalid token'));
    else
      return callback(null, user);
  });
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
