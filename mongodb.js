const { MongoClient, ObjectID } = require('mongodb');
const c = require('chalk');
const log = console.log;

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'cryptoviewer';

const id = new ObjectID();
log(c.blue(id));

MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
  if (err) return log(c.red(err));
  
  const db = client.db(databaseName);

  // db.collection('users').insertOne({
  //   username: "leah",
  //   password: "12345"
  // }, (err, res) => {
  //   if (err) return log(c.red('Unable to insert user', err));
  //   log(c.green(JSON.stringify(res.ops)));
  // })

  // db.collection('users').insertMany([
  //   {
  //     username: 'test1',
  //     password: '12345'
  //   },
  //   {
  //     username: 'test2',
  //     password: '67890'
  //   }
  // ], (err, res) => {
  //   if (err) return log(c.red('Unbale to insert users', err))
  //   log(c.green('Users inserted successfully!'), res.ops)
  // })
})
