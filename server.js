const express = require('express')
const cors = require('cors');
const c = require('chalk');
const app = express();
const userRouter = require('./src/routers/user');
const exchangesRouter = require('./src/routers/exchanges');
require('./src/db/mongoose')
const log = console.log;

app.use(cors());
app.use(express.json());
app.use(userRouter);
app.use(exchangesRouter)

const bcrypt = require('bcryptjs');

const hashString = async (string) => {
  const hashedString = await bcrypt.hash(string, 8)
  const isMatch = await bcrypt.compare("hello", hashedString);
  
  log(string, hashedString);
  log(isMatch)
}
hashString("hello");

app.listen('3000', () => {
  log(c.green("Connected to port 3000"));
})

