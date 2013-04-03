# Introduction to Node.js Workshop :: Sample Application

Example application for workshop students and attendees.

### Organization :: Step X

These branches contain the steps we take along the way to build the final app. They are the milestones we hope to hit after each "Code Along" section of the workshop.

# Branches

## Master

Master will contain the final project, as we envision it.



## Step 1 - NPM

__Student Steps__

1. npm install express -g
2. express [APP_NAME]
3. cd [APP_NAME] && npm install
4. npm start (make sure app starts on port 3000)
5. Create an Instagram App account
    - http://instagram.com/developer -> click on 'Manage Clients'
    - Website: http://localhost:3000
    - Redirect URL: http://localhost:3000/handleAuth
    - Make note of client secret and ID



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



## Step 3 - Jade

Sexier Views, Using JQuery on the Front End

__Student Steps__

1. Add jQuery.
2. Add a script tag.
3. Students can check out Leaflet, Google Maps, others to hack around with their Jade files and make them sexy.



## Step 4 - Mongo

Instagram login button set up. Storing Users in DB, Shows List of Followers/Following with Locations on Front End.

__Student Steps__

1. Add an Instagram login page/button.
2. Create MongoHQ accounts.
3. Connect Sample App to MongoHQ.
4. Add an /authorize route, which calls the getAuthorization URL of the Instagram library.
5. Add a route for the callback after the successful authorization, which reads all the user info, checks if the user is in the db and if not, creates a new user and saves the new user.
6. Add a route for an unsuccessful authorization.
7. Add sessions handling using Connect middleware.
8. Styling overhaul.  



## Step 5 - Streams

1. Instagram API integrated
2. Pipe photos into front end templates.



## Step 6 - Deploy!

1. Make app deployment ready.
2. Create Nodejitsu accounts.
3. Log into Nodejitsu accounts.
4. 'jitsu deploy' and bask in beautiful new creations.
5. Hack time, vote on best apps, choose winner!



