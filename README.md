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

1. Add jQuery using a script tag.
	- [views/layout.jade] Add this 'script' tag within the 'head' tag.
		- script(src='https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js', type='text/javascript')
2. Create a new explore.jade view and show a res.render with just title.
	- [views] Create a new file, call it 'explore.jade'.
	- [routes/index.js] Take note of the 'title' and 'medias' variables passed from the res.render function in app.get('/explore').
	- Save and reload application to see title value being passed to the /explore view.
3. Upgrade explore view with media data and iteration.
	- [views/explore.jade] Add #media id.
	- [views/explore.jade] Add each loop iterating through each result in medias array.
	- [views/explore.jade] Use a 'span' to display the media location.
	- [views/explore.jade] Add an link tag to attach links to media locations.
	- [views/explore.jade] Insert location images from medias array.
4. Create location view to display location images.
	- [views/location.jade] Create a file in the 'views' folder called 'location.jade'.
	- [views/location.jade] Iterate through 'medias' array and create an image tag to display media images at each iteration.
BONUS Check out Leaflet, Google Maps, others to hack around with their Jade files and make them sexy.



## Step 4 - Mongo

__Student Steps__

1. Create MongoHQ accounts.
  - Create an account at [MongoHQ](http://mongohq.com)!
  - Set up a new DB (sandbox plan)
  - Create a user with read/write permissions
  - Remember your user/pass!
2. Create conf.js to hold configuration info.
  - [conf.js] Make a conf.js file that exports a JSON object
  - [conf.js] Add instagram credentials, mongohq uri, and host to this file
3. Create Models Directory
  - npm install -S mongoose
  - [/models] Add index.js, User.js in /models
  - [/models/User.js] Create/export User Schema in User.js
  - NOTE: User is capitalized. Be sure to require('./User');
  - [/models/index.js] Connect to MongoHQ instance and create/export User model.
4. Add connect-mongo and set up session storage.
  - npm install -S connect-mongo
  - [app.js] Create MongoStore
  - [app.js] Add middleware - bodyparser, cookieparser, session
  - NOTE: express -s option will include these by default.
5. Add an '/authorize' route, which calls the getAuthorization URL of the Instagram library.
  - [routes/index.js] Add 2 new routes '/authorize', '/handleAuth'
  - [routes/index.js] Make '/authorize' route redirect to the url returned by get_authorization_url function in our instagram library.
  - [routes/index.js] Set up '/handleAuth' so that it passes the returned code back to instagram through the authorize_user function.
  - [routes/index.js] Handle errors and successful authorizations differently.
6. Add an Instagram login page/button on '/'.
  - [routes/index.js] Create '/' route.
  - [views/index.jade] Add a link to '/authorize'
7. After the successful authorization, use the user info.
  - [routes/index.js] Checks if the user is in the db.
  - [routes/index.js] If not, create a new user and save him/her.
  - [routes/index.js] Create a simple dummy '/followers' route
  - [routes/index.js] Redirect to '/' on unsuccessful auth, or to '/followers' on success.
8. Create followers route.
  - [routes/index.js] Get the user object from req.session.
  - [routes/index.js] Call user_followers from the instagram library, passing in the user's instagram id (user.id).
  - [routes/index.js] Do the same for user_follows.
  - [routes/index.js] Pass along followers, following, and their respective counts to res.render of ...
  - [views/followers.jade] Iterate through followers and followings and show profile pics for each
9. Relax, you made it!
  



## Step 5 - Streams

1. Instagram API integrated
2. Pipe photos into front end templates.



## Step 6 - Deploy!

1. Make app deployment ready.
2. Create Nodejitsu accounts.
3. Log into Nodejitsu accounts.
4. 'jitsu deploy' and bask in beautiful new creations.
5. Hack time, vote on best apps, choose winner!



