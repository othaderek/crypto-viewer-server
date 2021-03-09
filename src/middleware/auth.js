const c = require('chalk');
const log = console.log;

const auth = async (req, res, next) => {
  log(c.blueBright('auth middleware'));
  next();
}

module.exports =  auth;