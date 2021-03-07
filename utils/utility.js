require('dotenv').config();
module.exports.url = 'https://rest.coinapi.io/v1/exchanges/';
module.exports.key = process.env.API_KEY;
module.exports.sanitizeUsername = (user) => {
  user.username = user.username.replace(/\s+/g, '')
  return user
}