Instagram = require('insta-stream')

module.exports = function(app, io) {
  var exports = {}

  var client_id = 'b6911936292d4ddda1767aba4b38e9a7'
  var client_secret = '4429264c9d3a40189b383da9868a2b80'

  exports.popular = function (req, res) {
    res.render('popular', {
      title: 'Popular Media',
      client_id: client_id
    })

    io.of('/' + client_id)
      .on('connection', function(socket) {
        var insta = new Instagram({client_id: client_id, client_secret: client_secret})

        insta.stream('popular', '', function(stream) {
          stream.on('data', function(data) {
            socket.emit('popular', {
              posts: data
            })
          })
        })
    })
  }

  return exports
}
