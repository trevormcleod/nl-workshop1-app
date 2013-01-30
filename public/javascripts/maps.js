$(function () {

	var MyControl = L.Control.extend({
	    options: {
	        position: 'bottomleft'
	    },

	    onAdd: function (map) {
	        // create the control container with a particular class name
	        var container = L.DomUtil.create('div', 'my-custom-control');

	        // ... initialize other DOM elements, add listeners, etc.

	        return container;
	    }
	});

	var map = L.map('map').setView([40.7142, -74.0064], 13).addControl(new MyControl);
		
	L.tileLayer('http://{s}.tile.cloudmade.com/e955b8e00e4e434da267f451cb4ab9e4/997/256/{z}/{x}/{y}.png', {
		attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
		maxZoom: 18,
		scrollWheelZoom: false
	}).addTo(map);
	
	var circle1 = L.circle([40.7224, -73.9833], 200, {
		color: 'red',
		fillColor: '#f03',
		fillOpacity: 0.5
	});

	$('.photo').mouseenter(function () {
		var lon = $(this).attr("title");
		var lat = $(this).attr("value")
		var popup = L.marker([lat, lon]).addTo(map);
		popup.bindPopup("You're here!").openPopup();
		$(this).mouseleave(function () {
			popup.closePopup();
			popup.setOpacity(0);

		});
	});

});