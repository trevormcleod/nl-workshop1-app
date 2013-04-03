## Step 5 - Streams

_Student Steps_

1. Integrate insta-stream module.
  - npm install -S insta-stream (Thanks, Brian!)
  - [routes/index.js] require and instanciate insta-stream.
2. install and set up socket.io.
  - npm install -S socket.io
  - [app.js] Call http.createServer.
  - [app.js] Establish socket & pass socket.io instance through to routes.
  - [app.js] Call server.listen() for the port.
  - [routes/index.js] Modify create function to accept socket as second parameter.
  - [views/layout.jade] Add reference to '/socket.io/socket.io.js' in layout.
3. Pipe photos into front end templates.
  - [views/location.jade] Connect to socket.io server.
  - [views/location.jade] Add a handler for the data event.
  - [views/location.jade] Use jquery to display new photos as they come in.
  - [routes/index.js] Add a handler for new connections in the location route.
  - [routes/index.js] Use insta-stream search function to get a stream of new data for any existing connnections.
  - [routes/index.js] Send data from stream through socket, voila!
4. [BONUS] Hack, hack, hack!
  - [routes/index.js] Create a function createInstagramForUser
  - [routes/index.js] Create new instances of our instagram library for each user in /handleAuth and /followers
  - [routes/index.js] Now multiple people can log in to your app!

