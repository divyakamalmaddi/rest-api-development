const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
// Remember to update this list
const endpointList = ['/', '/meta/heartbeat', '/meta/members'];
const pathToFile = path.join(__dirname, '..', 'team_members.txt');

let teamMembers = [];

fs.readFile(pathToFile, 'utf8', (error, data) => {
  if (error) console.error('There was a problem retrieving team members', error);
  else teamMembers = data.trim().split('\n');
});

router.get('/', (req, res) => {
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

module.exports = router;
