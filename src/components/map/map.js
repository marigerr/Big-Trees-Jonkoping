import $ from 'jquery';
import 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../../../node_modules/sidebar-v2/js/leaflet-sidebar.min.js';
import '../../../node_modules/sidebar-v2/css/leaflet-sidebar.min.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import '../../stylesheets/leaflet.markerCluster.custom.css';
import 'leaflet.markercluster';
import getColor from './getColor';
import {getPointSize} from '../../data/models/circumference.js';
import {trees} from '../../data/models/treetype.js';



var topo = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFyaWdlcnIiLCJhIjoiY2l6NDgxeDluMDAxcjJ3cGozOW1tZnV0NCJ9.Eb2mDsjDBmza-uhme0TLSA', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
    '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    'Imagery © <a href="http://mapbox.com">Mapbox</a>',
    id: 'mapbox.streets'
});

var satellite = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFyaWdlcnIiLCJhIjoiY2l6NDgxeDluMDAxcjJ3cGozOW1tZnV0NCJ9.Eb2mDsjDBmza-uhme0TLSA', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
    '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    'Imagery © <a href="http://mapbox.com">Mapbox</a>',
    id: 'mapbox.satellite'
});

var baseLayers = {
    "Topo": topo,
    "Satellite": satellite
};

var map = L.map('map', { layers: [topo] });//, center: latlng, zoom: 13, zoomControl : false
// L.control.zoom( {position : 'bottomright'} ).addTo(map);
L.control.layers(baseLayers, {}, { position: 'topleft' }).addTo(map);

var sidebar = L.control.sidebar('sidebar', { position: 'right' }).addTo(map);
var markers = L.markerClusterGroup({ showCoverageOnHover: false, maxClusterRadius: 80, disableClusteringAtZoom: 8, spiderfyOnMaxZoom: false }); //, chunkedLoading: true, chunkProgress :checkProgress

var geojsonLayer = L.geoJSON().addTo(map);

function updateGeojsonLayer(geojson) {//, filterCondition) {
    if (geojsonLayer) {
        markers.removeLayer(geojsonLayer);
        geojsonLayer = {};
    }
    // if (!filterCondition) {
        geojsonLayer = L.geoJSON(geojson, {pointToLayer: pointToLayer, onEachFeature: onEachFeature });
    // } else {
    //     var evaluatedFilterCond = eval(filterCondition);
    //     var filter =  function (feature, layer) {return evaluatedFilterCond;};
    //     // console.log("this is updateGeoJsonLayer function geojson return value");
    //     // console.log(geojson);
    //     geojsonLayer = L.geoJSON(geojson, { filter: filter, pointToLayer: pointToLayer, onEachFeature: onEachFeature});
    // }
}

function onEachFeature(feature, layer) {
    // console.log(feature);
    var popupContent = "";
    if (feature.properties) {
        popupContent += "Id: " + feature.properties.Id + "</br>";
        popupContent += "Stamomkret: " + feature.properties.Stamomkret + " cm</br>";
        popupContent += "Tradslag: " + feature.properties.Tradslag + "</br>";
        popupContent += "Status: " + feature.properties.Tradstatus + "</br>";
    }
    // console.log(layer);
    layer.bindPopup(popupContent);
    // markers.addLayer(layer);
}

function pointToLayer(feature, latlng) {
    var radius = getPointSize(feature.properties.Stamomkret);
    // console.log("point to layer function called");
    // console.log(radius);
    
    return new L.CircleMarker(latlng, {
        radius: radius,
        // fillColor: colors[feature.properties.Tradslag],
        fillColor: getColor(feature.properties.Tradslag),
        color: getColor(feature.properties.Tradslag),
        weight: 1,
        opacity: 1,
        fillOpacity: 1,
        clickable: true
    });
}

var legend = L.control({position: 'topleft'});

legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'legend'),
        labels = [];

    // var reversedBreaks = stats.breakpoints.slice().reverse();
    for (var i = 1; i < trees.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(trees[i].id) + '"></i> ' +  trees[i].id + '</br>';
    }

    return div;
};

function updateLegend(filteredTrees){
    $(".legend.leaflet-control").empty();
    var newLegendContent = '';
    for (var i = 0; i < filteredTrees.length; i++) {
        // console.log(i);
        // console.log(filteredTrees[i].id);
        if(!(filteredTrees[i].id == "Alla")){
            newLegendContent += '<i style="background:' + getColor(filteredTrees[i].id) + '"></i> ' +  filteredTrees[i].id + '</br>';
        }
    } 
    $(".legend.leaflet-control").html(newLegendContent); 
    // map.setView(geojsonLayer.getBounds().getCenter(), 5);     
}

legend.addTo(map);

export { map, sidebar, markers, geojsonLayer, updateLegend , updateGeojsonLayer};
