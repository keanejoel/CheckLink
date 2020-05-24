const express = require('express');
const { Client } = require('pg');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

const jwt = require('jsonwebtoken');
const jwtkey = 'secretKey';

var app = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/', (req, res) => {
    const client = new Client({
      connectionString: process.env.DATABASE_URL,
      ssl: true,
    });
    const email = req.body.email;
    const query =  `SELECT * FROM users WHERE email = '` + email + `'`;
    client.connect()
        .then(() => {
            return client.query(query);
        })
        .then((results) => {
            if ( !results.rows[0] ) {
                console.log('Invalid email');
                res.send('That email does not exist in our records.')
            } else {
                const compare = bcrypt.compareSync(req.body.password, results.rows[0].password);
                if (!compare) {
                    console.log('Invalid password');
                    res.send('That password does not match the email we have on file.');
                } else {
                    console.log('Everything is OK');
                    let userData = results.rows[0];
                    let token = jwt.sign(userData, jwtkey);
                    res.status(200)
                    .json({token});
                }
            }
        })
        .catch((err) => {
            console.log('error', err);
            res.send('Please enter a valid email.');
        });
});


module.exports = {
    path: '/api/login',
    handler: app
}