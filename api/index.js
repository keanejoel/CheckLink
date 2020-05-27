const express = require('express');
const { Client } = require('pg');
const { uuid } = require('uuidv4');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

const jwt = require('jsonwebtoken');
const jwtkey = 'secretKey';

require('dotenv').config();

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.get('/', (req, res) => {
  const client = new Client({
    connectionString: process.env.DATABASE_URL || 'postgres://masterUsername:Tehrani123@rds-postgresql-10mintutorial.cjwnht3a9cat.us-east-1.rds.amazonaws.com:5432/myDatabase',
    ssl: process.env.DATABASE_URL ? true : false
  });
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
  const client = new Client({
    connectionString: process.env.DATABASE_URL || 'postgres://masterUsername:Tehrani123@rds-postgresql-10mintutorial.cjwnht3a9cat.us-east-1.rds.amazonaws.com:5432/myDatabase',
    ssl: process.env.DATABASE_URL ? true : false
  });
  const saltRounds = 8;
  const hash = bcrypt.hashSync(req.body.password, saltRounds);
  client.connect()
    .then(() => {
      // do query stuff
      const sql = 'INSERT INTO users (id, email, password) VALUES ($1, $2, $3)'
      const params = [uuid(), req.body.email, hash]
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
