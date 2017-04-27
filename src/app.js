import 'leaflet/dist/leaflet.css';
import styles from './stylesheets/app.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'Stylesheets/leaflet.markerCluster.custom.css';
import '../node_modules/sidebar-v2/css/leaflet-sidebar.min.css';
import 'Stylesheets/sidebar.custom.css';

// import 'leaflet';
// //import $ from 'jquery';
import 'leaflet.markercluster';

import { map } from 'Components/map/map.js';
import {getPoints} from 'Data/getPoints.js';
import {findLocationWithGoogleGeolocation} from 'Components/locate/locate.js';
import {addDropdowns, updateDropdowns} from 'Components/selects/select.js';
import {initMap} from 'Components/map/map.js';

initMap();
addDropdowns();

$("#findTreesBtn").click(function () {
    var circumferenceSel = $(".circumference-select").val();
    var regionSel = $(".region-select").val();
    var treetypeSel = $(".treetype-select").val();
    getPoints(regionSel, circumferenceSel, treetypeSel); 
});

$("#locateBtn").click(function () {
    // findLocationWithNavigator();
    findLocationWithGoogleGeolocation();
});

