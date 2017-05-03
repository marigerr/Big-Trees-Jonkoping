// import 'leaflet';
// //import $ from 'jquery';
// import 'leaflet/dist/leaflet.css';
import styles from './stylesheets/app.css';
import '../node_modules/sidebar-v2/css/leaflet-sidebar.min.css';
import 'Stylesheets/sidebar.custom.css';
import mobileAndTabletcheck from 'Utilities/checkIfMobile.js';


import { map } from 'Components/map/map.js';
import {getPoints} from 'Data/getPoints.js';
import {findLocationWithNavigator, searchVisibleMap} from 'Components/locate/locate.js';
import {addDropdowns, updateDropdowns} from 'Components/selects/select.js';
import {initMap} from 'Components/map/map.js';

var isMobile = mobileAndTabletcheck();
var searchCounter;
initMap();
addDropdowns();

$("#findTreesBtn").click(function () {
    var circumferenceSel = $(".circumference-select").val();
    var regionSel = $(".region-select").val();
    var treetypeSel = $(".treetype-select").val();
    getPoints(regionSel, circumferenceSel, treetypeSel); 
});

$("#locateBtn").click(function () {
    searchCounter = 0;
    findLocationWithNavigator();
    // findLocationWithGoogleGeolocation();
});

function incrementCounter(){
    console.log(searchCounter);
    
    searchCounter ++;    
}

$("#searchVisibleBtn").click(function () {
    searchVisibleMap();
    // findLocationWithGoogleGeolocation();
});

export {isMobile, searchCounter, incrementCounter};



