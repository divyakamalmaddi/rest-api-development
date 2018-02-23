const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.connection);

const DiarySchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  publish_date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  public: {
    type: Boolean,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});

DiarySchema.plugin(autoIncrement.plugin, { model: 'Diary', field: 'id', startAt: 1 });

/* eslint func-names: ["error", "never"] */
DiarySchema.statics.getAllPublicDiaries = function (callback) {
  const Diary = this;

  Diary.find({ public: true }).exec((err, entries) => {
    if (err) return callback(err);

    return callback(err, entries);
  });
};

DiarySchema.statics.getAllEntriesByAuthor = function (username, callback) {
  const Diary = this;

  Diary.find({ author: username }).exec((err, entries) => {
    if (err) return callback(err);

    return callback(err, entries);
  });
};

const Diary = mongoose.model('Diary', DiarySchema);

module.exports = Diary;
