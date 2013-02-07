var ig = require('instagram-node').instagram(),
    Instastream = require('insta-stream'),
    db = require('../models'),
    _ = require('underscore');

/*
 * GET home page.
 */

ig.use({
  client_id: '048746d02c444198b88697aa3920b5b4',
  client_secret: '0a32a7b0349a4d33b16c4bbb2dbf3fec'
});

var is = new Instastream({
  client_id: '048746d02c444198b88697aa3920b5b4',
  client_secret: '0a32a7b0349a4d33b16c4bbb2dbf3fec'
});

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

  app.get('/follow/:userId', function (req, res, next) {
    ig.user_media_recent(req.params.userId, function (err, medias) {
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

  app.get('/nolocation/:userId', function (req, res, next) {
    ig.user(req.params.userId, function (err, user) {
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

  // Illustrate route parameters
  app.get('/location/:latitude/:longitude', function (req, res, next) {
    var lat = Number(req.param('latitude'));
    var lng = Number(req.param('longitude'));

    ig.location_search({ lat: lat, lng: lng }, function(err, result, limit) {
      if (err) {
        console.log(err);
        return next(err);
      }

      if (result.length == 0) {
        return res.send('empty');
      }

      var location = result[0]

      is.search({ lat: lat, lng: lng }, function(stream) {
        io.of('/' + location.id).on('connection', function(socket) {
          stream.on('data', function(medias) {
            socket.emit('data', medias)
          })
        })
      })

      res.render('location', {
        title: location.name,
        medias: [],
        location: location
      });
    });
  });

  app.get('/authorize', function(req, res, next) {
    res.redirect(ig.get_authorization_url('http://localhost:3000/handleAuth', { scope: ['basic'], state: 'a state' }));
  });

  app.get('/handleAuth', function(req, res, next) {
    /*
     * { username: '', bio: '', website: '', profile_picture: '', full_name: '', id: '' }
     */
    ig.authorize_user(req.query.code, 'http://localhost:3000/handleAuth', function(err, result) {
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
