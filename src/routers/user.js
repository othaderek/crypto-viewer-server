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
  // Sanitize username
  const u = util.sanitizeUsername(req.body)
  // Add password hashing
  // Create user
  const user = await new User(u);
  try {
    // Save
    await user.save();
    res.status(201).send(user)
    log(c.green('User created'));

  } catch(err) {
    res.status(400).send(err)
    log(c.red(err));
  }
  
})

router.post('/login', async (req, res) => {
  res.send({"message": "login!"})
})

module.exports = router;