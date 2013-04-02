## Step 2 - Express

Express Configured, Routes Set Up, Lots of Dummy Code for DB/Instagram API.

__Student Steps__

1. Re-work the routes.
	- Delete the routes from app.js file. 
	- Delete user.js route and require.
	- Delete index export from index.js file.
	- Add module.exports.create, define this as a function which accepts app object - allowing us to add routes to it. Also add the app.get('/') route using this technique.
2. Add Instagram library (including client_id and client_secret).
3. Add a explore .get() to get the '/explore' route and popular images page.
	a. This GET should res.send our JSON data response.
4. Add a location .get() to get the '/location' route.
	a. Set up route parameters within our location route links. 
	b. Sort locations by longitude/latitude.
	c. This GET should res.send our media result of the locations sort. 
	d. Location Media Recent call to Instagram using location id of first picture.
9. Add a new view called "Location"
