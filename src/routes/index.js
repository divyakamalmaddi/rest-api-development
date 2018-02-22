const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
// Remember to update this list
const endpointList = ['/', '/meta/heartbeat', '/meta/members'];
const pathToFile = path.join(__dirname, '..', 'team_members.txt');

var user_controller = require('../controllers/users');
var diary_controller = require('../controllers/diaries');
let teamMembers = [];

fs.readFile(pathToFile, 'utf8', (error, data) => {
  if (error) console.error('There was a problem retrieving team members', error);
  else teamMembers = data.trim().split('\n');
});

router.get('/', (req, res) => {
  // Return list of implemented endpoints
  res.status(200).send({
    status: true,
    result: endpointList,
  });
});

router.get('/meta/heartbeat', (req, res) => {
  res.status(200).send({
    status: true,
  });
});

router.get('/meta/members', (req, res) => {
  res.status(200).send({
    status: 200,
    result: teamMembers,
  });
});

router.post('/users/register', user_controller.registerUser);

router.post('/users/authenticate', user_controller.authenticateUser);

router.post('/users/expire', user_controller.expireUserToken);

router.post('/users', user_controller.getUserByToken);

router.get('/diary', diary_controller.getAllPublicDiaries);

router.post('/diary', diary_controller.getEntriesByUsername);

router.post('/diary/create', diary_controller.createDiaryEntry);

router.post('/diary/delete', diary_controller.deleteEntry);

router.post('/diary/permission', diary_controller.editPermission);

module.exports = router;
