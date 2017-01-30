var express = require('express');
var router = express.Router();
var app = require('../app.js');
var models = require('../models');
var Page = models.Page;
var User = models.User;
var Promise = require('bluebird');
module.exports = router;


router.get('/', function(req, res, next) {
    // res.render('index', {title: 'wikistack'});
    //res.redirect('/');
    Page.findAll({})
        .then(function(pages) {
            res.render('index', {
                pages: pages
            })
        })
        .catch(next)

});

router.post('/', function(req, res, next) {
    User.findOrCreate({
        where: {
            name: req.body.name,
            email: req.body.email
        }
    })
    .then(function(values) {
        var user = values[0];

        var page = Page.build({
            title: req.body.title,
            content: req.body.content
    });
        return page.save()
        .then(function(page) {
           return page.setAuthor(user);
        })
    })
    .then(function(createdPage) {
        res.redirect(createdPage.route);
    })
    .catch(next);
})

router.get('/search', function(req, res, next) {
	Page.findByTag(req.query.search)
	.then(function (pages){
		res.render('index', {
        pages: pages
        });
	})
    .catch(next);
});

router.get('/add', function(req, res, next) {
    // res.send("retrieve the 'add a page' form");
    res.render('addpage');
});

router.get('/:urlTitle', function(req, res, next) {
    Page.findOne({
        where: {
            urlTitle: req.params.urlTitle
        },
        include: [
            {model: User, as: 'author'}
        ]
    })
    .then(function(matchingPage){
        // page instance will have a .author property
        // as a filled in user object ({ name, email })
        if (matchingPage === null) {
            res.status(404).send();
        } else {
        res.render('wikipage', {
            page: matchingPage
        });
       // res.redirect(page.get('route'));
        }
    })
    .catch(next);
});
