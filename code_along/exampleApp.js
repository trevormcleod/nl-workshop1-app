/****************************
		STEP 1 app.js
****************************/

/**
 * Module dependencies.
 **/

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

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

app.get('/', routes.index);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});


/****************************
		STEP 1 index.js
****************************/


/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

/*****************************************************************************
*****************************************************************************/

/****************************
		STEP 2 app.js
****************************/


/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path');

var app = express();

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

routes.create(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});



/****************************
		STEP 2 index.js
****************************/

var ig = require('instagram-node').instagram();

ig.use({
  client_id: '048746d02c444198b88697aa3920b5b4',
  client_secret: '0a32a7b0349a4d33b16c4bbb2dbf3fec'
});

module.exports.create = function (app) {
  app.get('/', function (req, res) {
    res.render('index', {
      title: "home"
    });
  });

  app.get('/explore', function (req, res, next) {
    ig.media_popular(function(err, medias, limit) {
      if (err) {
        console.log(err);
        // Explain error handling w/ next()
        return next(err);
      }

      console.log(require('util').inspect(medias));

      res.json(medias);
    });
  });

  // Illustrate route parameters
  app.get('/location/:latitude/:longitude', function (req, res, next) {
    var lat = Number(req.param('latitude'))
    var lng = Number(req.param('longitude'))

    ig.media_search(lat, lng, function(err, medias, limit) {
      if (err) {
        console.log(err);
        return next(err);
      }

      res.json(medias);
    });
  });
}

/*****************************************************************************
*****************************************************************************/

/****************************
		STEP 3 layout.jade
****************************/
doctype 5
html
  head
    title= title
    link(rel='stylesheet', href='/stylesheets/style.css')
    script(src='https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js', type='text/javascript')
  body
    block content


/****************************
		STEP 3 index.jade
****************************/
	var ig = require('instagram-node').instagram();

	ig.use({
	  client_id: '048746d02c444198b88697aa3920b5b4',
	  client_secret: '0a32a7b0349a4d33b16c4bbb2dbf3fec'
	});

	module.exports.create = function (app) {
	  app.get('/', function (req, res) {
	    res.render('index', {
	      title: "home"
	    });
	  });

	  app.get('/explore', function (req, res, next) {
	    ig.media_popular(function(err, medias, limit) {
	      if (err) {
	        console.log(err);
	        // Explain error handling w/ next()
	        return next(err);
	      }

	      console.log(require('util').inspect(medias));

	      res.render('explore', {
	        title: 'explore',
	        medias: medias
	      });
	    });
	  });

	  // Illustrate route parameters
	  app.get('/location/:latitude/:longitude', function (req, res, next) {
	    var lat = Number(req.param('latitude'))
	    var lng = Number(req.param('longitude'))

	    ig.media_search(lat, lng, function(err, medias, limit) {
	      if (err) {
	        console.log(err);
	        return next(err);
	      }

	      res.render('location', {
	        title: 'location',
	        medias: medias,
	        lat: lat,
	        lng: lng
	      });
	    });
	  });
	}
	

/****************************
		STEP 3 explore.jade
****************************/
extends layout

block content
  h1 Explore!
  #media
    each media in medias
      - if (media.location)
        span #{JSON.stringify(media.location)}
        a(href='/location/#{media.location.latitude}/#{media.location.longitude}')
          img(src='#{media.images.low_resolution.url}')	


/****************************
		STEP 3 location.jade
****************************/
extends layout

block content
  h1 Location: #{lat}, #{lng}
  #media
    each media in medias

/*****************************************************************************
*****************************************************************************/

/****************************
		STEP 4 conf.js
****************************/
module.exports = {
  host: "http://localhost:3000",
  mongo_uri: "mongodb://nodelingo:GAworkshop@linus.mongohq.com:10099/instadb",
  instagram: {
    client_id: '048746d02c444198b88697aa3920b5b4',
    client_secret: '0a32a7b0349a4d33b16c4bbb2dbf3fec'
  }
}


/****************************
	STEP 4 /models/index.js
****************************/
var mongoose = require('mongoose'),
    UserSchema = require('./User'),
    conf = require('../conf');

// connect

var uri = conf.mongo_uri;

mongoose.connect(uri);

// initialize User Model

var User = mongoose.model('User', UserSchema);

module.exports.User = User;
module.exports.uri = uri;


/****************************
	STEP 4 /models/User.js
****************************/
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = Schema({
  name: String,
  username: String,
  accessToken: String,
  id: String,
  following: [FriendSchema],
  followers: [FriendSchema],
  bio: String,
  profileImage: String
});

var FriendSchema = Schema({
  name: String,
  id: String,
  profileImage: String
});

module.exports = UserSchema;


/****************************
	STEP 4 app.js
****************************/
"use strict"
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
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


/****************************
	STEP 4 /routes/index.js
****************************/
var ig = require('instagram-node').instagram(),
    db = require('../models'),
    conf = require('../conf');

ig.use(conf.instagram);

module.exports.create = function (app) {
  app.get('/', function (req, res) {
    res.render('index', {
      title: "home"
    });
  });

  app.get('/explore', function (req, res, next) {
    ig.media_popular(function(err, medias, limit) {
      if (err) {
        console.log(err);
        // Explain error handling w/ next()
        return next(err);
      }

      console.log(require('util').inspect(medias));

      res.render('explore', {
        medias: medias
      });
    });
  });

  app.get('/followers', function (req, res, next) {
    var user = req.session.user;
    console.log(user);

    ig.user_followers(user.id, function(err, followers, pagination, limit) {
      var followerCount = followers.length;
      if (err) {
        console.log(err);
        return next(err);
      }

      console.log(require('util').inspect(followers));

      ig.user_follows(user.id, function(err, follows, pagination, limit) {
        var followingCount = follows.length;
        if(err) {
          console.log(err);
          return next(err);
        }

        console.log(require('util').inspect(follows));

        res.render('followers', {
          followers: followers,
          follows: follows,
          followerCount: followerCount,
          followingCount: followingCount,
          title: 'Followers Page'
        });
      })
    });
  });

  // Illustrate route parameters
  app.get('/location/:latitude/:longitude', function (req, res, next) {
    var lat = Number(req.param('latitude'))
    var lng = Number(req.param('longitude'))

    ig.media_search(lat, lng, function(err, medias, limit) {
      if (err) {
        console.log(err);
        return next(err);
      }

      res.render('location', {
        medias: medias,
        lat: lat,
        lng: lng
      });
    });
  });

  app.get('/authorize', function(req, res, next) {
    res.redirect(ig.get_authorization_url(conf.host + '/handleAuth', { scope: ['basic'], state: 'a state' }));
  });

  app.get('/handleAuth', function(req, res, next) {
    /*
     * { username: '', bio: '', website: '', profile_picture: '', full_name: '', id: '' }
     */
    ig.authorize_user(req.query.code, conf.host + '/handleAuth', function(err, result) {
      if (err) {
        console.log(err);
        res.send("Didn't work");
      } else {
        console.log('Yay! Access token is ' + require('util').inspect(result));
        var username = result.user.username;
        var name = result.user.full_name;
        var access_token = result.access_token;
        var bio = result.user.bio;
        var profile_picture = result.user.profile_picture;
        var id = result.user.id;
   

        db.User.findOne({username: username}, function(err, user) {
          if (err) {
            console.log(err);
            return next(err);
          }

          if (!user) {
            user = new db.User();
            user.username = username;
          }

          user.bio = bio;
          user.accessToken = access_token;
          user.profileImage = profile_picture;
          user.name = name;
          user.id = id;

          user.save(function(err) {
            if (err) {
              console.log(err);
              return next(err);
            }

            req.session.user = user;

            res.redirect('/followers');
          });
        });
      }
    });
  });
};


/****************************
	STEP 4 /views/index.jade
	(REQUIRES CSS EDITS)
****************************/
extends layout
block content
	div.wrap
		div.button
			div.left
				div.red
				div.orange
				div.green
				div.blue
			div.right
				a(href="/authorize") Sign in with Instagram
	div.footer
		p
			a(href="http://dribbble.com/shots/539615-Instagram-CSS-Button") Login button credit
			
			

/****************************
	STEP 4 /views/index.jade
	(REQUIRES CSS EDITS)
****************************/
extends layout
block content
	div.header 
		div.header-text-container Click on any profile for a real-time view of their latest image!
	div#image-container1
		div.heading
			div.heading-text-container
				h1 Followers: <span style="color: #ffd20c;">#{ followerCount }</span>
		each follower in followers
			- if (follower.profile_picture)
				div.photo
					img(src='#{follower.profile_picture}', title='#{follower.username}')
	div#image-container2
		div.heading
			div.heading-text-container
				h1 Following: <span style="color: #ffd20c;">#{ followingCount }</span>
		each followee in follows
			- if (followee.profile_picture)
				div.photo
					img(src='#{followee.profile_picture}', title='#{followee.username}')

/*****************************************************************************
*****************************************************************************/

/****************************
	STEP 5 /routes/index.js
****************************/
var instagram = require('instagram-node'),
    Instastream = require('insta-stream'),
    db = require('../models'),
    _ = require('underscore'),
    encode = require('../lib/encode'),
    conf = require('../conf');

var ig = instagram.instagram();

ig.use(conf.instagram);

var is = new Instastream(conf.instagram);

function createInstagramForUser (user, cb) {
  var newIG = instagram.instagram();
  newIG.use({ access_token: user.accessToken });
  cb(null, newIG);
}

module.exports.create = function (app, io) {
  app.get('/', function (req, res) {
    res.render('index', {
      title: "home"
    });
  });

  app.get('/explore', function (req, res, next) {
    ig.media_popular(function(err, medias, limit) {
      if (err) {
        console.log(err);
        // Explain error handling w/ next()
        return next(err);
      }

      console.log(require('util').inspect(medias));

      res.render('explore', {
        medias: medias
      });
    });
  });

  app.get('/followers', function (req, res, next) {
    var user = req.session.user;
    console.log(user);
    createInstagramForUser(user, function (err, myIg) {
      myIg.user_followers(user.id, function(err, followers, pagination, limit) {
        var followerCount = followers.length;
        if (err) {
          console.log(err);
          return next(err);
        }

        console.log(require('util').inspect(followers));

        myIg.user_follows(user.id, function(err, follows, pagination, limit) {
          var followingCount = follows.length;
          if(err) {
            console.log(err);
            return next(err);
          }

          console.log(require('util').inspect(follows));

          res.render('followers', {
            followers: followers,
            follows: follows,
            followerCount: followerCount,
            followingCount: followingCount,
            title: 'Followers Page'
          });
        })
      });
    });
  });

  app.get('/follow/:userId', function (req, res, next) {
    var user = req.session.user;
    createInstagramForUser(user, function (err, myIg) {
      myIg.user_media_recent(req.params.userId, function (err, medias) {
        if (err) { return next(err); }
        console.log(medias);
        var locationMedia = _.find(medias, function (media) {
          return media.location && media.location.latitude;
        });
        console.log(locationMedia);
        if (locationMedia) {
          res.redirect('/location/'+ locationMedia.location.latitude + '/' + locationMedia.location.longitude);
        } else {
          res.redirect('/nolocation/' + req.params.userId);
        }
      });
    });
  });

  app.get('/nolocation/:userId', function (req, res, next) {
    var user = req.session.user;
    createInstagramForUser(user, function (err, myIg) {
      myIg.user(req.params.userId, function (err, user) {
        if (err) { 
          console.log('anonymous user'); 
          user = { username: 'anonymous'}; 
        }
        console.log(user);
        res.render('nolocation', {
          requestedUser: user
        });
      });
    });
  });

  // Illustrate route parameters
  app.get('/location/:latitude/:longitude', function (req, res, next) {
    var lat = Number(req.param('latitude'));
    var lng = Number(req.param('longitude'));
    var user = req.session.user;

    is.search({ lat: lat, lng: lng, distance: 5000 }, function(stream) {
      io.of('/' + user.id).on('connection', function(socket) {
        stream.on('data', function(medias) {
          socket.emit('data', encode(medias));
        })
      })
    })

    res.render('location', {
      title: 'Location Photos',
      medias: [],
      user: user,
      lat: lat,
      lng: lng,
      host: conf.host
    });
  });

  app.get('/authorize', function(req, res, next) {
    res.redirect(ig.get_authorization_url(conf.host + '/handleAuth', { scope: ['basic'], state: 'a state' }));
  });

  app.get('/handleAuth', function(req, res, next) {
    /*
     * { username: '', bio: '', website: '', profile_picture: '', full_name: '', id: '' }
     */
    var myIg = instagram.instagram();
    myIg.use(conf.instagram);
    myIg.authorize_user(req.query.code, conf.host + '/handleAuth', function(err, result) {

      if (err) {
        console.log(err);
        res.send("Didn't work");
      } else {
        console.log('Yay! Access token is ' + require('util').inspect(result));
        var username = result.user.username;
        var name = result.user.full_name;
        var access_token = result.access_token;
        var bio = result.user.bio;
        var profile_picture = result.user.profile_picture;
        var id = result.user.id;
   

        db.User.findOne({username: username}, function(err, user) {
          if (err) {
            console.log(err);
            return next(err);
          }

          if (!user) {
            user = new db.User();
            user.username = username;
          }

          user.bio = bio;
          user.accessToken = access_token;
          user.profileImage = profile_picture;
          user.name = name;
          user.id = id;

          user.save(function(err) {
            if (err) {
              console.log(err);
              return next(err);
            }

            req.session.user = user;

            res.redirect('/followers');
          });
        });
      }
    });
  });
};


/****************************
		STEP 5 app.js
****************************/
"use strict"
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
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


/****************************
	STEP 5 layout.jade
****************************/
doctype 5
html
  head
    title= title
    link(rel='stylesheet', href='/stylesheets/style.css')
    script(src='https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js', type='text/javascript')
    script(src='/socket.io/socket.io.js', type='text/javascript')
  body
    block content


/****************************
	STEP 5 location.jade
****************************/
extends layout
block content
  h1 Location: #{lat}, #{lng}
  #media
    each media in medias
      img(src='#{media.images.low_resolution.url}')

  script
    var medias = io.connect('#{host}/#{user.id}')
    function strdecode( data ) {
      return JSON.parse( decodeURIComponent( escape ( data ) ) );
    }
    medias.on('data', function(data) {
      
      data = strdecode(data);
      data.forEach(function(media) {
        $('#media').prepend('<img src="' + media.images.low_resolution.url + '" />');
      });
    });