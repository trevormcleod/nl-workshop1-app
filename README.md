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
  - [/models/index.js] Connect to MongoHQ instance and create/export User model.
4. Add connect-mongo and set up session storage.
  - npm install -S connect-mongo
  - [app.js] Create MongoStore
  - [app.js] Add middleware - bodyparser, cookieparser, session
  - NOTE: express -s option will include these by default.
5. Add an '/authorize' route, which calls the getAuthorization URL of the Instagram library.
6. Add an Instagram login page/button on '/'.
7. Add a route for the callback after the successful authorization, which reads all the user info, checks if the user is in the db and if not, creates a new user and saves the new user.
8. Add a route for an unsuccessful authorization.
9. Styling overhaul. 
