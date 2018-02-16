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

router.post('/users/register', (req, res) => {
  const newUser = req.body;

  // Create a new user
  // If success
  res.status(201).send({
    status: true,
  });

  // If error
  res.status(200).send({
    status: false,
    error: 'User already exists!',
  });
});

router.post('/users/authenticate', (req, res) => {
  const user = req.body;

  // Check if user exists
  // If success
  res.status(200).send({
    status: true,
    token: 123, // uuidv4 string auth token
  });

  // If error
  res.status(201).send({
    status: false,
  });
});

router.post('/users/expire', (req, res) => {
  const userToken = req.body.token;

  // Check if token exists and invalidate it
  // If success
  res.status(200).send({
    status: true,
  });

  // If error
  res.status(200).send({
    status: false,
  });
});

router.post('/users', (req, res) => {
  const userToken = req.body.token;

  // Retrieve user
  // If success
  res.status(200).send({
    status: true,
    username: 'user',
    fullname: 'fullname',
    age: 20,
  });

  // If error
  res.status(200).send({
    status: false,
    error: 'Invalid authentication token',
  });
});

module.exports = router;
