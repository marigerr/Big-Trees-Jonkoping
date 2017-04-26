import 'leaflet/dist/leaflet.css';
import styles from './stylesheets/app.css';

import $ from 'jquery';
import 'leaflet';
import 'leaflet.markercluster';

import { map } from './components/map/map.js';
import makeAjaxCall from './data/makeAjaxCall.js';
import getPoints from './data/getPoints.js';
import findLocationWithNavigator from './components/locate/locate.js';
import {addDropdowns, updateDropdowns} from './components/selects/select.js';

addDropdowns();

var circumferenceSel = "Alla";
var treetypeSel = "Alla";
var regionSel = "Alla";
var resultRecordCount = 500;

getPoints(regionSel, circumferenceSel, treetypeSel, resultRecordCount); 

$(".filterSelect").change(function (e) {
    //console.log(e.target.className);
    $("#results").hide();
    var circumferenceSel = $(".circumference-select").val();
    var regionSel = $(".region-select").val();
    var treetypeSel = $(".treetype-select").val();
    getPoints(regionSel, circumferenceSel, treetypeSel); 
    updateDropdowns(regionSel, circumferenceSel, treetypeSel, e.target.classList[1] );
});





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
    findLocationWithNavigator();
});

