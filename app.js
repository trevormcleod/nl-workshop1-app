"use strict"
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , instagram = require('instagram-node')
  , conf = require('./conf');

var MongoStore = require('connect-mongo')(express);

var app = express()
  , server = http.createServer(app)
  , io = require('socket.io').listen(server)

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.session({
      secret: 'Node Rocks!'
    , store: new MongoStore({
          db: 'instadb'
        , url: conf.mongo_uri
      })
    }));
  app.use(express.methodOverride());
  app.use(function(req, res, next) {
    var ig = instagram.instagram();

    if (req.session.user) {
      ig.use({access_token: req.session.user.accessToken});
    } else {
      ig.use(conf.instagram);
    }

    req.ig = ig;
    next();
  });
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

routes.create(app, io);

server.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
