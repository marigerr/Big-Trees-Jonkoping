import 'leaflet/dist/leaflet.css';
import styles from './stylesheets/app.css';

import $ from 'jquery';
import 'leaflet';
import 'leaflet.markercluster';

import { map } from './map/map.js';
import makeAjaxCall from './data/makeAjaxCall.js';
import getPoints from './data/getPoints.js';
import findLocationWithNavigator from './components/locate/locate.js';
import {addDropdowns, updateDropdowns} from './components/selects/select.js';

addDropdowns();

var circumferenceSel = "100";
var treetypeSel = "Alla";
var regionSel = "Alla";
var resultRecordCount = 500;

// getStamomkretRange(regionSel, treetypeSel);
getPoints(regionSel, circumferenceSel, treetypeSel, resultRecordCount); 



$("#regionSel").change(function (e) {
    $("#results").hide();
    var circumferenceSel = $("#circumferenceSel").val();
    var regionSel = $("#regionSel").val();
    var treetypeSel = $("#treetypeSel").val();
    getPoints(regionSel, circumferenceSel, treetypeSel); 
    updateDropdowns(regionSel, circumferenceSel, treetypeSel, "notRegion" );

    //   alert( $("#complaintDD option:selected"));
    //   console.log(e.target.value);
    // $("#circumferenceSel").val(1);
    // $("#circumferenceSel option:selected")
    // updateMap(e.target.value);
    // sidebar.close();
    // getPoints(e.target.value);
});

$("#circumferenceSel").change(function (e) {
    $("#results").hide();
    var circumferenceSel = $("#circumferenceSel").val();
    var regionSel = $("#regionSel").val();
    var treetypeSel = $("#treetypeSel").val();
    getPoints(regionSel, circumferenceSel, treetypeSel); 
    updateDropdowns(regionSel, circumferenceSel, treetypeSel, "notCircumference" );
    // console.log(e.target.value);
    // console.log(regionSel);
    
       
    // $('#regionSel').find(":selected").text())
    // updateDropdowns(e.target.value);
    // updateSelects(e.target.value, 'stamomkret');
    //   alert( $("#complaintDD option:selected"));
    // console.log(e.target.value);
    // filterMap(e.target.value, $('#regionSel').find(":selected").text());
});

$("#treetypeSel").change(function (e) {
    $("#results").hide();
    var circumferenceSel = $("#circumferenceSel").val();
    var regionSel = $("#regionSel").val();
    var treetypeSel = $("#treetypeSel").val();
    getPoints(regionSel, circumferenceSel, treetypeSel); 
    updateDropdowns($("#regionSel").val(), circumferenceSel, treetypeSel, 'notTreetype');
        
    // updateSelects(e.target.value, 'stamomkret');
    //   alert( $("#complaintDD option:selected"));
    // console.log(e.target.value);
    // filterMap(e.target.value, $('#regionSel').find(":selected").text());
});


$("#findTreesBtn").click(function () {
    var circumferenceSel = $("#circumferenceSel").val();
    var regionSel = $("#regionSel").val();
    var treetypeSel = $("#treetypeSel").val();
    getPoints(regionSel, circumferenceSel, treetypeSel); 
});

$("#locateBtn").click(function () {
    //   alert( $("#complaintDD option:selected"));
    // $("#noResults").hide();
    // console.log(e.target.value);
    // filterMap(e.target.value, $('#regionSel').find(":selected").text());
    // findLocationWithNavigator();
    console.log("locate btn clicked");
    findLocationWithNavigator();
});
