var express = require('express');
var router = express.Router();
var app = require('../app.js');
var models = require('../models');
var Page = models.Page;
var User = models.User;
module.exports = router;


// router.get('/', function(req, res, next) {
//     res.render('index', {title: 'wikistack'});
//     res.redirect('/');
// });

router.post('/', function(req, res, next) {

    var page = Page.build({
    title: req.body.title,
    content: req.body.content
    });

    page.save();
    res.redirect('/');
});

router.get('/add', function(req, res, next) {
    // res.send("retrieve the 'add a page' form");
    res.render('addpage');
});


router.get('/users/', function(req, res, next) {

});

router.get('/users/:id', function(req, res, next) {

});

router.post('/users/', function(req, res, next) {

});

router.put('/users/:id', function(req, res, next) {

});

router.delete('/users/:id', function(req, res, next) {

});
