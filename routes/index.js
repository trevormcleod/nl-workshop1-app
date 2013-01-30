var ig = require('instagram-node').instagram(),
    db = require('../models');

/*
 * GET home page.
 */

// exports.index = function(req, res){
//   res.render('index', { title: 'Express' });
// };

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
        medias: medias
      });
    });
  });

  // Illustrate route parameters
  app.get('/location/:latitude/:longitude', function (req, res, next) {
    var lat = Number(req.param('latitude'))
    var lng = Number(req.param('longitude'))

    ig.location_search({ lat: lat, lng: lng }, function(err, result, limit) {
      if (err) {
        console.log(err);
        return next(err);
      }

      if (result.length == 0) {
        return res.send('empty');
      }

      var location = result[0]
 
      ig.location_media_recent(location.id, function(err, result, pagination, limit) {
	if (err) {
	  console.log(err);
	  return next(err);
	}

        console.log(require('util').inspect(result));
        console.log(require('util').inspect(limit));

        res.render('location', {
          medias: result,
          location: location
        });
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

          user.save(function(err) {
            if (err) {
              console.log(err);
              return next(err);
            }

            res.redirect('/explore');
          });
        });
      }
    });
  });
};
