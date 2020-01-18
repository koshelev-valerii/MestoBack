/* eslint-disable prefer-template, no-path-concat, eol-last */
const express = require('express');
const users = require('./routes/users');
const cards = require('./routes/cards');
const router = require('./routes/router');

const { PORT = 3000 } = process.env;
const app = express();


app.use(express.static(__dirname + '/public'));
app.use(users);
app.use(cards);
app.use(router);

app.listen(PORT, () => {});