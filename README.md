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