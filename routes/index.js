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















