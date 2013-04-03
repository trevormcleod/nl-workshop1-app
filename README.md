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
