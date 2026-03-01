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

    map.addSource('rivers-data', { //add geoJSON from github repo
        type: 'geojson',
        data: 'https://kaedanyu.github.io/Lab-2/Lost_Rivers_20170705__last_edited.geojson' //URL to geojson file via github (update once published!)
    });


    map.addLayer({
        'id': 'rivers-data',
        'type': 'line',
        'source': 'rivers-data',
        'paint': {
            'line-color': '#B4D2FF',
            'line-width': 2
        }
    });


});