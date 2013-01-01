
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , instagram = require('./routes/instagram')
  , user = require('./routes/user')
  , http = require('http')
  , io = require('socket.io')
  , path = require('path');

var app = express()
  , server = http.createServer(app)

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});


//Instagram Realtime API integration

app.get('/popular', instagram.popular);



app.get('/', routes.index);
app.get('/users', user.list);

io.listen(server)

server.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});


