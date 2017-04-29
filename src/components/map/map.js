//import $ from 'jquery';
// import 'leaflet';
import 'leaflet/dist/leaflet.css';
import styles from 'Stylesheets/app.css';

import '../../../node_modules/sidebar-v2/js/leaflet-sidebar.min.js';
import '../../../node_modules/sidebar-v2/css/leaflet-sidebar.min.css';
import 'Stylesheets/sidebar.custom.css';
import {getPoints} from 'Data/getPoints.js';
import getColor from './getColor';
import { getPointSize } from 'Data/models/circumference.js';
import { trees } from 'Data/models/treetype.js';
import {isMobile} from '../../app.js';

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
// var markers = L.markerClusterGroup({ showCoverageOnHover: false, maxClusterRadius: 80, disableClusteringAtZoom: 8, spiderfyOnMaxZoom: false }); //, chunkedLoading: true, chunkProgress :checkProgress

var geojsonLayer = L.geoJSON().addTo(map);

var legend = L.control({ position: 'topleft' });

legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'legend');
    for (var i = 1; i < trees.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(trees[i].id) + '"></i> ' + trees[i].id + '</br>';
    }
    return div;
};

legend.addTo(map);

function initMap() {
    var circumferenceSel = "Alla";
    var treetypeSel = "Alla";
    var regionSel = "Alla";
    var resultRecordCount = 500;
    getPoints(regionSel, circumferenceSel, treetypeSel, resultRecordCount);
}

function updateGeojsonLayer(geojson) {//, filterCondition) {
    map.removeLayer(geojsonLayer);

    geojsonLayer = L.geoJSON(geojson, { pointToLayer: pointToLayer, onEachFeature: onEachFeature }).addTo(map);
    // markers.addLayer(geojsonLayer);
    // map.addLayer(markers);
    var bounds = geojsonLayer.getBounds();
    var roughBoundsArea = calcRoughArea(bounds);
    if (roughBoundsArea < 0.005) {
        map.setView(bounds.getCenter(), 12);
    } else {
        map.fitBounds(bounds);
    }     
}

function calcRoughArea(bounds){
    var coord = bounds.toBBoxString().split(",");
    var roughArea = Math.abs((coord[0]-coord[2]) * (coord[1] - coord[3]));
}

function onEachFeature(feature, layer) {
    var popupContent = "";
    if (feature.properties) {
        popupContent += "Tradslag: " + feature.properties.Tradslag + "</br>";
        popupContent += "Stamomkret: " + feature.properties.Stamomkret + " cm</br>";
        popupContent += "Status: " + feature.properties.Tradstatus + "</br>";
        popupContent += "Plats: " + feature.properties.Lokalnamn + "</br>";
        popupContent += "Id: " + feature.properties.Id + "</br>";
    }
    layer.bindPopup(popupContent);
    if(!isMobile){
        layer.on({
            mouseover: function(e){
                layer = e.target;
                layer.openPopup();
            },
            mouseout: function(e){
                layer = e.target;
                layer.closePopup();
            },
            // click: highlightFeature
        });
    }
}

function pointToLayer(feature, latlng) {
    var radius = getPointSize(feature.properties.Stamomkret);
    return new L.CircleMarker(latlng, {
        radius: radius,
        fillColor: getColor(feature.properties.Tradslag),
        color: getColor(feature.properties.Tradslag),
        weight: 1,
        opacity: 1,
        fillOpacity: 1,
        clickable: true
    });
}

function updateLegend(filteredTrees) {

    $(".legend.leaflet-control").empty();
    var newLegendContent = '';
    for (var i = 0; i < filteredTrees.length; i++) {
        if (filteredTrees[i].id != "Alla") {
            newLegendContent += '<i style="background:' + getColor(filteredTrees[i].id) + '"></i> ' + filteredTrees[i].id + '</br>';
        }
    }
    $(".legend.leaflet-control").html(newLegendContent);
}

export { initMap, map, sidebar, geojsonLayer, updateLegend, updateGeojsonLayer };


