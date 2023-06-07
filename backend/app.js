// DEPENDENCIES

const express = require('express');
const cors = require('cors');
const usersController = require('./controllers/usersController');
const userGamesController = require('./controllers/userGamesController');
const gamesController = require('./controllers/gamesController');
const tradeController = require('./controllers/tradeController');
const threadController = require('./controllers/threadController');
const postController = require('./controllers/postController')
// const { application } = require("express");

// CONFIGURATION
const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// ROUTES
app.get('/', (req, res) => {
  res.send('Welcome to Game Switch NYC');
});

// route of games
app.use('/games', gamesController);
//route of users
app.use('/users', usersController);

//route for userGames
app.use('/loggedin', userGamesController);

//route for trades
app.use('/trades', tradeController);

//route for fourm
app.use('/thread', threadController)

app.use('/post', postController)

app.get('*', (req, res) => {
  res.status(404).send('Not found!');
});

// EXPORT
module.exports = app;
