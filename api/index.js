const express = require('express');
const { Client } = require('pg');
//const { uuid } = require('uuidv4');
//const bcrypt = require('bcrypt');
require('dotenv').config();

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"


var app = express();

app.get('/', (req, res) => {
  var client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true
  });
  //const client = new Client();
  const query = {
    text: `SELECT * FROM users`
  }
  client.connect()
    // when connection is made the following code will run ...
    .then(() => {
      console.log('connected to database');
      return client.query(query);
    })
    .then((results) => {
      res.status(200)
      .json(results.rows);
    })
    .catch((err) => {
      console.log('error', err);
      res.send('Something went wrong with the server...');
    });
});

app.post('/', (req, res) => {
  const client = new Client();
  //const saltRounds = 8;

  //const hash = bcrypt.hashSync(req.body.password, saltRounds)
  client.connect()
    .then(() => {
      // do query stuff
      const sql = 'INSERT INTO users (id, email, password) VALUES ($1, $2, $3)'
      const params = [req.body.id, req.body.email, req.body.password];
      return client.query(sql, params);
    })
    .then(() => {
      res.send('User has been added!');
    })
    .catch((err) => {
      console.log('error', err);
      res.send('Something went wrong...');
    });
});


module.exports = {
  path: '/api/users',
  handler: app
}
