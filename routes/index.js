var db = require('../models'),
    conf = require('../conf');

module.exports.create = function (app) {
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

    req.ig.media_search(lat, lng, function(err, medias, limit) {
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
