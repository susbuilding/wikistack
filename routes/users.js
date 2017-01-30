var express = require('express');
var router = express.Router();
var app = require('../app.js');
var models = require('../models');
var Page = models.Page;
var User = models.User;
var Promise = require('bluebird');
module.exports = router;


router.get('/', function(req, res, next) {
    User.findAll({})
        .then(function(users) {
            res.render('users', {
                users: users
            })
        })
        .catch(next)
});

router.get('/:id', function(req, res, next) {

    var userPromise = User.findById(req.params.id);
    var pagesPromise = Page.findAll({
         where: {
             authorId: req.params.id
         }
     });

    Promise.all([userPromise, pagesPromise])
    .then(function(values) {
        var user = values[0];
        var pages = values[1];
        res.render('userspage', {
            user: user,
            pages: pages
        })
    })
    .catch(next)
});

// router.post('/users/', function(req, res, next) {

// });

// router.put('/users/:id', function(req, res, next) {

// });

// router.delete('/users/:id', function(req, res, next) {

// });
