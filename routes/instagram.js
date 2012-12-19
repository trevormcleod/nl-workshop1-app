Instagram = require('instagram-node-lib');

Instagram.set('client_id', 'b6911936292d4ddda1767aba4b38e9a7');
Instagram.set('client_secret', '4429264c9d3a40189b383da9868a2b80');

exports.popular = function (req, res) {
	console.log(Instagram.media.popular());
	res.send('hello');
}

Instagram.media.popular();