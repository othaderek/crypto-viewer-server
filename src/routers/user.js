const express = require('express');
const c = require('chalk');
const router = express.Router();
const User = require('../models/user');
const util = require('../../utils/utility');

const log = console.log;

// refactor to seperate router files
router.get('/users', async (req, res) => {
  const users = await User.find({}, '-password');
  log(req);
  res.send(users);
})

router.post('/users', async (req, res) => {
  // Create user
  log(req.body);
  // Sanitize username
  let u = util.sanitizeUsername(req.body)
  const user = await new User(u);
  // Add password hashing
  user.save().then(() => {
    res.send(user)
  }).catch((err) => {
    res.status(400);
    res.send(err);
    log(c.red(err));
  })
  log(c.green('User created'));
})

module.exports = router;