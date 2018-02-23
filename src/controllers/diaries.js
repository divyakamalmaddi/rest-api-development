const Diary = require('../models/Diary');
const User = require('../models/User');

const createDiaryEntry = (req, res) => {
  User.findByToken({ token: req.body.token }, (err, user) => {
    if (err || user == null) {
      res.status(200).send({
        status: false,
        error: 'Invalid authentication token.',
      });
    } else {
      const newDiaryEntry = new Diary({
        author: user.username,
        title: req.body.title,
        public: req.body.public,
        text: req.body.text,
      });

      newDiaryEntry.save((error, entry) => {
        if (error) {
          console.log(error);
          res.status(200).send({
            status: false,
            error: 'Invalid authentication token.',
          });
        } else {
          console.log('Successfully created a Diary entry.');
          res.status(201).send({
            status: true,
            result: entry.id,
          });
        }
      });
    }
  });
};

const deleteEntry = (req, res) => {
  User.findByToken({ token: req.body.token }, (err, user) => {
    if (err || user == null) {
      res.status(200).send({
        status: false,
        error: 'Invalid authentication token.',
      });
    } else {
      Diary.findOne({
        author: user.username,
        id: req.body.id,
      }).exec((error, entry) => {
        if (error || user == null) {
          res.status(200).send({
            status: false,
            error: 'No such entry',
          });
        } else {
          entry.remove((err2) => {
            if (err2) {
              console.log(err2);
              res.status(200).send({
                status: false,
                error: 'Invalid authentication token.',
              });
            } else {
              console.log('Successfully deleted a Diary entry.');
              res.status(200).send({
                status: true,
              });
            }
          });
        }
      });
    }
  });
};

const editPermission = (req, res) => {
  User.findByToken({ token: req.body.token }, (err, user) => {
    if (err || user == null) {
      res.status(200).send({
        status: false,
        error: 'Invalid authentication token.',
      });
    } else {
      Diary.findOne({
        author: user.username,
        id: req.body.id,
      }).exec((error, entry) => {
        if (error || entry == null) {
          res.status(200).send({
            status: false,
            error: 'No such entry',
          });
        } else {
          entry.update({ public: req.body.public }, (err2) => {
            if (err2) {
              console.log(err2);
              res.status(200).send({
                status: false,
                error: 'Invalid authentication token.',
              });
            } else {
              console.log('Successfully changed permission of a Diary entry.');
              res.status(200).send({
                status: true,
              });
            }
          });
        }
      });
    }
  });
};

const getAllPublicDiaries = (req, res) => {
  Diary.getAllPublicDiaries((err, entries) => {
    if (err) {
      console.log(err);
      res.status(200).send({
        status: true,
        result: [],
      });
    } else {
      res.status(200).send({
        status: true,
        result: entries,
      });
    }
  });
};

const getEntriesByUsername = (req, res) => {
  User.findByToken({
    token: req.body.token,
  }, (err, user) => {
    if (err || user == null) {
      res.status(200).send({
        status: false,
        error: 'Invalid authentication token.',
      });
    } else {
      Diary.getAllEntriesByAuthor(user.username, (error, entries) => {
        if (error) {
          console.log(error);
          res.status(200).send({
            status: false,
            error: 'Invalid authentication token.',
          });
        } else {
          res.status(200).send({
            status: true,
            result: entries,
          });
        }
      });
    }
  });
};

module.exports = {
  createDiaryEntry,
  deleteEntry,
  editPermission,
  getAllPublicDiaries,
  getEntriesByUsername,
};
