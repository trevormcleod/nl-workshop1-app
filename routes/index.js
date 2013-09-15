var instagram = require('instagram-node'),
    Instastream = require('insta-stream'),
    db = require('../models'),
    _ = require('underscore'),
    encode = require('../lib/encode'),
    conf = require('../conf');

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
    req.ig.media_popular(function(err, medias, limit) {
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

  app.get('/followers', function (req, res, next) {
    var user = req.session.user;
    console.log(user);

    req.ig.user_followers(user.id, function(err, followers, pagination, limit) {
      var followerCount = followers.length;
      if (err) {
        console.log(err);
        return next(err);
      }

      console.log(require('util').inspect(followers));

      req.ig.user_follows(user.id, function(err, follows, pagination, limit) {
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
    res.redirect(req.ig.get_authorization_url(conf.host + '/handleAuth', { scope: ['basic'], state: 'a state' }));
  });

  app.get('/handleAuth', function(req, res, next) {
    /*
     * { username: '', bio: '', website: '', profile_picture: '', full_name: '', id: '' }
     */
    /* var myIg = instagram.instagram();
    myIg.use(conf.instagram);
    myIg.authorize_user(req.query.code, conf.host + '/handleAuth', function(err, result) { */

    req.ig.authorize_user(req.query.code, conf.host + '/handleAuth', function(err, result) {
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
