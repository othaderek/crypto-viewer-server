const express = require('express');
const axios = require('axios');
const c = require('chalk');
const app = express();
const cors = require('cors');
require('./src/db/mongoose')
const util = require('./utils/utility');
const User = require('./src/db/models/user');
const log = console.log;

app.use(cors());
app.use(express.json());

const getExchanges = async () => {
  const res = await axios.get(util.url + `?apikey=` + util.key);
  const data = await res.data;
  return data;
}

app.get('/exchanges', async (req, res) => {
  log(c.yellow(JSON.stringify(req.query)));
  let data = await getExchanges();
  res.json(data);
})

app.get('/users', async (req, res) => {
  const users = await User.find({});
  log(req);
  res.send(users);
})

app.post('/users', async (req, res) => {
  // Create user
  log(res.body);
  const user = await new User(req.body)
  user.save().then(() => {
    res.send(user)
  }).catch((err) => {
    log(err)
  })
  log(c.green('User created'));
})

app.listen('3000', () => {
  log(c.green("Connected to port 3000"));
})