var express = require('express');
var http = require('http');
var path = require('path');
var routes = require('./routes');
var index = require('./routes/index');
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
var server = http.createServer(app);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'view')));
app.use(express.session({
	secret: "very secret"
}));
// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}
app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.get('/', index.index);
app.get('/sheet', index.getSheet)
app.post('/addrows', index.addRows)
app.post('/editrows/:row/:column', index.editRows)
var server = http.createServer(app);
server.listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});
