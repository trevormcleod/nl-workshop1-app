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
3. Add a explore .get() to get the '/explore' route and popular images page.
	a. This GET should res.send our JSON data response.
4. Add a location .get() to get the '/location' route.
	a. Set up route parameters within our location route links. 
	b. Sort locations by longitude/latitude.
	c. This GET should res.send our media result of the locations sort. 
	d. Location Media Recent call to Instagram using location id of first picture.
9. Add a new view called "Location"
