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
}















