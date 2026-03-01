//Button data taken from lab 1
// Create variable for button element using ID
const button = document.getElementById("btn2");

// Define function to return message
function openNewTab() {
    const url = 'https://lost-rivers-utoronto.hub.arcgis.com/datasets/de18bb479a5441d68e9c3536cccd5492_0/explore';
    window.open(url, '_blank');
}

// Add event listener to button element with function to open dialogue box with message
button.addEventListener("click", openNewTab2);

// Create variable for button element using ID
const button2 = document.getElementById("btn1");

// Define function to return message
function openNewTab2() {
    const url = 'https://www.youtube.com/watch?v=RvW16nVVgjQ';
    window.open(url, '_blank');
}
// i dont understand why but whenever i touch the buttons the map just breaks

// Add event listener to button element with function to open dialogue box with message
button2.addEventListener("click", openNewTab);

mapboxgl.accessToken = 'pk.eyJ1Ijoia2FlZGFueXUiLCJhIjoiY21rYXJpNHF6MGltODNkcHE3dHM5cmxlZyJ9.nnYd9wh7kN2DJFgtuewiyg' //mapbox public token

const map = new mapboxgl.Map({
    container: 'my-map', //map container id
    style: 'mapbox://styles/kaedanyu/cml6bsqrf005q01s6e2sxgikd', // style url
    center: [-79.38, 43.67], //starting position viewing downtown Toronto
    zoom: 10.5, //zoomed in
    pitch: 50, //angled camera view
});

map.on('load', () => {

    map.addSource('ncr-data', { //add geoJSON from github repo
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/kaedanyu/lab-3/main/neighbourhood-crime-rates.geojson' //URL to geojson file via github (update once published!)
    });

    //adding choropleth symbology to data layer
    map.addLayer({
        'id': 'ncr-data',
        'type': 'fill',
        'source': 'ncr-data',
        'paint': {
            'fill-color': [
                'step', // STEP expression produces stepped results based on value pairs
                ['get', 'ASSAULT_2025'], // GET expression retrieves property value from 'population' data field
                '#fd8d3c', // Colour assigned to any values < first step
                50, '#fc4e2a', // Colours assigned to values >= each step
                100, '#e31a1c',
                150, '#bd0026',
                200, '#800026'
            ],
            'fill-opacity': 0.5,
            'fill-outline-color': '#6D4C41'
        }
    });


});

//  Filter data layer to show selected CT data from dropdown selection
let ASSAULT_2025value;

document.getElementById("ASSAULT_2025").addEventListener('change', (e) => {
    ASSAULT_2025value = document.getElementById('ASSAULT_2025').value;
})

// navigation
map.addControl(new mapboxgl.NavigationControl());
map.addControl(new mapboxgl.FullscreenControl());

const geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl,
    countries: "ca"
});

document.getElementById('geocoder').appendChild(geocoder.onAdd(map));