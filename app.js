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

app.use('/wiki', router);

app.get('/', function(req, res, next) {
	res.render('index', {title: 'wikistack'});
	// res.redirect('/');
});


models.User.sync({force: true})
	.then(function(){
		return models.Page.sync({})
	})
	.then(function() {
		app.listen(3000, function(){
			console.log('Server listening on port 3000');
		})
	})
	.catch(console.error);
