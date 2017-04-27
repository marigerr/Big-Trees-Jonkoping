import 'leaflet/dist/leaflet.css';
import styles from './stylesheets/app.css';

import 'leaflet';
import 'leaflet.markercluster';

import { map } from 'Components/map/map.js';
import $ from 'jquery';
import {getPoints} from 'Data/getPoints.js';
import {findLocationWithGoogleGeolocation} from 'Components/locate/locate.js';
import {addDropdowns, updateDropdowns} from 'Components/selects/select.js';
// import {getTenLargestTrees} from 'Components/statPane/stats.js';
import {initMap} from 'Components/map/map.js';

initMap();
addDropdowns();



// $("#findLargestTreesBtn").click(function () {

//     getTenLargestTrees("Habo");
//     // var circumferenceSel = $(".circumference-select").val();
//     // var regionSel = $(".region-select").val();
//     // var treetypeSel = $(".treetype-select").val();
//     // getPoints(regionSel, circumferenceSel, treetypeSel); 
// });

$("#findTreesBtn").click(function () {
    var circumferenceSel = $(".circumference-select").val();
    var regionSel = $(".region-select").val();
    var treetypeSel = $(".treetype-select").val();
    getPoints(regionSel, circumferenceSel, treetypeSel); 
});

$("#locateBtn").click(function () {
    //   alert( $("#complaintDD option:selected"));
    // $("#noResults").hide();
    // console.log(e.target.value);
    // filterMap(e.target.value, $('.region-select').find(":selected").text());
    // findLocationWithNavigator();
    console.log("locate btn clicked");
    // findLocationWithNavigator();
    findLocationWithGoogleGeolocation();
});

