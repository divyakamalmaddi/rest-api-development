const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.connection);

const Schema = { mongoose };

const DiarySchema = new Schema({
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
    type: String,
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

const Diary = mongoose.model('Diary', DiarySchema);

module.exports = Diary;
