const express = require('express');
const router = express.Router();

// Controller
const { addJoke, getAllJokes } = require('../controller/JokesController');

// Route to create a joke
router.post('/createJoke', addJoke);

router.get('/getAllJokes',getAllJokes)

module.exports = { JokesRoutes: router };
