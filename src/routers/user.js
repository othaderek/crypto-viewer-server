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

router.patch('/users/:id', async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['username', 'password'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
  log(isValidOperation)
  if (!isValidOperation) return send.status(400).send({error: 'Invalid updates!'});

  try {
    log(req.body)
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!user) return res.status(404).send();

    res.send(user);
  } catch (e) {
    res.status(400).send(e)
  }

})

router.post('/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.username, req.body.password)
    res.send(user)
  } catch (e) {
    res.status(400).send(e)
  }
  // Issue a jwt token/ save it to user
})

module.exports = router;