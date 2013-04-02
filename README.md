## Step 2 - Express

Express Configured, Routes Set Up, Lots of Dummy Code for DB/Instagram API.

__Student Steps__

1. Re-work the routes.
	- [app.js]: Delete the routes. 
	- [app.js]: Delete user.js route and require.
	- [routes/index.js]: Delete exports.index.
	- [routes/index.js]: Add module.exports.create, define this as a function which accepts app object - allowing us to add routes to it.
	- [routes/index.js]: Add the app.get('/') route.
	- [app.js]: Add routes.create(app)
2. Add Instagram library (including client_id and client_secret).
	- npm install -S instagram-node
	- [routes/index.js]: add require to top
	- [routes/index.js]: add ig.use() with client_id and client_secret
3. Add a '/explore' route to show popular images.
	- [routes/index.js]: add app.get('/explore')
	- [routes/index.js]: add ig.media_popular to '/explore' handler
	- [routes/index.js]: add res.json() to send data to browser
4. Add a '/location' route to find media by lat/lng.
	- [routes/index.js]: Set up location route with parameters: app.get('/location/:latitude/:longitude')
	- [routes/index.js]: Convert params to Numbers: var lat = Number(req.param('latitude'))
	- [routes/index.js]: Call ig.media_search wit lat/lng params
	- [routes/index.js]: Return result with res.json()
	- Test by grabbing lat/lng from /explore route and pump into /location
5. Add a new view called "Location"
