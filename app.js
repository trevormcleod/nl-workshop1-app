"use strict"
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , instagram = require('instagram-node')
  , dbUrl = require('./conf').mongo_uri;

var MongoStore = require('connect-mongo')(express);

var app = express();

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
        , url: dbUrl
      })
    }));
  app.use(express.methodOverride());
  app.use(function(req, res, next) {
    var ig = instagram.instagram();
    ig.use({
      client_id: '048746d02c444198b88697aa3920b5b4',
      client_secret: '0a32a7b0349a4d33b16c4bbb2dbf3fec'
    });

    req.ig = ig;
    next();
  });
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

routes.create(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
