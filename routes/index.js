const express = require('express');
const router = express.Router();

// Define your routes here
router.get('/isWorking', (req, res) => {
    res.send('api.js file is working');
});

// Authentication Routes 
router.use('/joke', require('./Jokes'))

// User Routes
router.use('/update', require('./update'));



module.exports = router 