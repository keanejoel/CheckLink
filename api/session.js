const express = require('express');
const {Client} = require('pg');

var app = express.Router();

app.get('/', (req, res) => {
    const client = new Client();
    const email = req.query.email;
    const query =  `SELECT * FROM users WHERE email = '` + email + `'`;
    client.connect()
        .then(() => {
            return client.query(query);
        })
        .then((results) => {
            if ( !results.rows[0] ) {
                console.log('That email and name does not match.');
            } else {
                console.log('Success!');
                let data = results.rows[0];
                res.status(200)
                .json(data);
            }
        })
        .catch((err) => {
            console.log('error', err);
            res.send('Please enter a valid email.');
        });
})

module.exports = {
    path: '/api/session',
    handler: app
}