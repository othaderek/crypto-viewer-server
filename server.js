const express = require('express');
const axios = require('axios');
const c = require('chalk');
const app = express();
const util = require('./utils/utility');
const log = console.log;

const getExchanges = async () => {
  const res = await axios.get(util.url + `?apikey=` + util.key);
  const data = await res.data;
  return data;
}

app.get('/exchanges', async (req, res) => {
  let data = await getExchanges();
  res.json(data);
})

app.listen('3000', () => {
  log(c.green("Connected to port 3000"));
})