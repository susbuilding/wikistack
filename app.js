const express = require('express');
const morgan = require('morgan');
const nunjucks = require('nunjucks');
const makesRouter = require('./routes');
const fs = require('fs');
const bodyParser = require('body-parser');

var app = express();

var env = nunjucks.configure('views', {noCache: true});
app.set('view engine', 'html');
app.engine('html', nunjucks.render);

app.get('/', function(req, res, next) {
	res.render('index', {title: 'wikistack'});
})

// app.use(makesRouter());

app.listen(3000, function() {
	console.log('Server listening...');
})