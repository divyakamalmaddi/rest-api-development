const User = require('../models/User');

const registerUser = (req, res) => {
  const newUser = new User(req.body);

  newUser.save((err) => {
    if (err) {
      console.log(err);
      res.status(200).send({
        status: false,
        error: 'User already exists!',
      });
    } else {
      console.log('Successfully created a user.');
      res.status(201).send({
        status: true,
      });
    }
  });
};

const authenticateUser = (req, res) => {
  User.authenticate(req.body.username, req.body.password, (err, user) => {
    if (err || user.length === 0) {
      res.status(200).send({
        status: false,
      });
    } else {
      res.status(200).send({
        status: true,
        token: user.token, // uuidv4 string auth token
      });
    }
  });
};

const expireUserToken = (req, res) => {
  User.expireToken(req.body, (err, user) => {
    if (err || user == null) {
      res.status(200).send({
        status: false,
      });
    } else {
      res.status(200).send({
        status: true,
      });
    }
  });
};

const getUserByToken = (req, res) => {
  User.findByToken(req.body, (err, user) => {
    if (err || user == null) {
      res.status(200).send({
        status: false,
        error: 'Invalid authentication token.',
      });
    } else {
      // user.status = true;
      res.status(200).send({
        status: true,
        username: user.username,
        fullname: user.fullname,
        age: user.age,
      });
    }
  });
};

module.exports = {
  registerUser,
  authenticateUser,
  expireUserToken,
  getUserByToken,
};
