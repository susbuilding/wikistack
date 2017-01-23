const express = require('express');
const morgan = require('morgan');
const nunjucks = require('nunjucks');
// const makesRouter = require('./routes');
const fs = require('fs');
const bodyParser = require('body-parser');
const models = require('./models');
const router = require('./routes/wiki');
const app = express();

// module.exports = app;

app.use('/wiki', router);

var env = nunjucks.configure('views', {noCache: true});
app.set('view engine', 'html');
app.engine('html', nunjucks.render);

app.get('/', function(req, res, next) {
	res.render('index', {title: 'wikistack'});
})

// app.use(makesRouter());


models.User.sync({})
	.then(function(){
		return models.Page.sync({})
	})
	.then(function() {
		router.listen(3000, function(){
			console.log('Server listening...');
		})
	})
	.catch(console.error);
//})
