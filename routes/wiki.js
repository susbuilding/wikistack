var express = require('express');
var router = express.Router();
var app = require('../app.js');
module.exports = router;


router.get('/', function(req, res, next) {
    res.send('retrieve all wiki pages');
});

router.post('/', function(req, res, next) {
    res.send('submit a new page to the database');
});

router.get('/add', function(req, res, next) {
    // res.send("retrieve the 'add a page' form");
    res.render('addpage');
});

