const polyline = require('@mapbox/polyline');
const { PolyUtil } = require('node-geometry-library');

// Get data from json file
const hills = require('./hills.json');

// Get the encoded polyline from the text file
const encodedPolyline = require('fs').readFileSync('./encodedPolyline.txt', 'utf8');

const decodedPolyline = PolyUtil.decode(encodedPolyline);

// Loop through each hill
hills.forEach(hill => {
    // Get the longitude and latitude from the hill
    const { longitude, latitude } = hill;

    // Check isLocationOnPath
    const isLocationOnPath = PolyUtil.isLocationOnEdge({ lat: latitude, lng: longitude }, decodedPolyline, 250, false);

    if (isLocationOnPath) {
        console.log(`${hill.name} ${hill.county} is on the Strava Activity`);
    }

});
