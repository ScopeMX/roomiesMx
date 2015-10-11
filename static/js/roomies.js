
    $(document).ready(function(){
      $('.parallax').parallax();
      // When the window has finished loading create our google map below
    google.maps.event.addDomListener(window, 'load', init);

        function init() {
            // Basic options for a simple Google Map
            // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
            var mapOptions = {
                    // How zoomed in you want the map to start at (always required)
                    zoom: 11,

                    // The latitude and longitude to center the map (always required)
                    center: new google.maps.LatLng(40.6700, -73.9400), // New York

                    // How you would like to style the map. 
                    // This is where you would paste any style found on Snazzy Maps.
                    styles: [   {       featureType:'water',        stylers:[{color:'#46bcec'},{visibility:'on'}]   },{     featureType:'landscape',        stylers:[{color:'#f2f2f2'}] },{     featureType:'road',     stylers:[{saturation:-100},{lightness:45}]  },{     featureType:'road.highway',     stylers:[{visibility:'simplified'}] },{     featureType:'road.arterial',        elementType:'labels.icon',      stylers:[{visibility:'off'}]    },{     featureType:'administrative',       elementType:'labels.text.fill',     stylers:[{color:'#444444'}] },{     featureType:'transit',      stylers:[{visibility:'off'}]    },{     featureType:'poi',      stylers:[{visibility:'off'}]    }]
                };

                // Get the HTML DOM element that will contain your map 
                // We are using a div with id="map" seen below in the <body>
                var mapElement = document.getElementById('map');

                // Create the Google Map using out element and options defined above
                var map = new google.maps.Map(mapElement, mapOptions);
            }

    });
    function initMap() {
  // Create a map object and specify the DOM element for display.
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    scrollwheel: false,
    zoom: 8
  });
}
