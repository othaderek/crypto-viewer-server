const express = require('express');
const c = require('chalk');
const axios = require('axios');
const router = express.Router();
const util = require('../../utils/utility');

const log = console.log;

const getExchanges = async () => {
  const res = await axios.get(util.url + `?apikey=` + util.key);
  const data = await res.data;
  return data;
}

router.get('/exchanges', async (req, res) => {
  let data = await getExchanges();
  res.json(data);
})

module.exports = router;