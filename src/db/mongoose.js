const mongoose = require('mongoose');
const assert = require('assert');

// Making mongoose use the default promise and not a third-party promise
mongoose.Promise = global.Promise;

const url = 'mongodb://localhost:27017/cs5331';

mongoose.connect(url, (error, db) => {
  assert.equal(null, error);
  console.log('Connected correctly to server');
});
