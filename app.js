const express = require('express');
const morgan = require('morgan');
const nunjucks = require('nunjucks');
const fs = require('fs');
const bodyParser = require('body-parser');
const models = require('./models');
const router = require('./routes/wiki');
const app = express();


var env = nunjucks.configure('views', {noCache: true});
app.set('view engine', 'html');
app.engine('html', nunjucks.render);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res, next) {
	res.render('index', {title: 'wikistack'});
})

app.use('/wiki', router);

models.User.sync({})
	.then(function(){
		return models.Page.sync({})
	})
	.then(function() {
		app.listen(3000, function(){
			console.log('Server listening...');
		})
	})
	.catch(console.error);
