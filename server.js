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

// const jwt = require('jsonwebtoken');
// const jwtFunc = async () => {
//   const token = await jwt.sign({__id: "abc123"}, 'secret');
//   jwtFunc.verify();
//   log(c.blue(token))
// }
// jwtFunc();

app.listen('3000', () => {
  log(c.green("Connected to port 3000"));
})

