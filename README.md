# Introduction to Node.js Workshop :: Sample Application

Example application for workshop students and attendees.

### Organization

### Step X

These branches contain the steps we take along the way to build the final app. They are the milestones we hope to hit after each "Code Along" section of the workshop.

# Branches

## Master

Master will contain the final project, as we envision it.



## Step 1 - NPM

__Student Steps__

1. npm install express -g
2. express [APP_NAME]
3. Create an Instagram App account



## Step 2 - Express

Express Configured, Routes Set Up, Lots of Dummy Code for DB/Instagram API.

__Student Steps__

1. Re-work the routes
2. Add Instagram library
3. Add a call to the explore route to get the popular images.
4. Understand how JSON stringify works.
5. Sort locations by longitude/latitude. 
6. Add links to a location view on click of an image.
7. Set up route parameters within our location route links.
8. Search to find most recent location details based on a users' click on profile image.
9. Location Media Recent call to Instagram using location id of first picture.
10. Add a new view called "Location"	 



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



