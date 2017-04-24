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

var stamomkretSel = "100";
var tradslagSel = "All";
var kommunSel = "All";
var resultRecordCount = 500;

// getStamomkretRange(kommunSel, tradslagSel);

getPoints(kommunSel, tradslagSel, stamomkretSel, resultRecordCount);

$("#kommunSel").change(function (e) {
    updateDropdowns(e.target.value);
    $("#results").hide();

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
    updateSelects(e.target.value, 'stamomkret');
    //   alert( $("#complaintDD option:selected"));
    // console.log(e.target.value);
    // filterMap(e.target.value, $('#kommunSel').find(":selected").text());
});

$("#tradslagSel").change(function (e) {
    $("#results").hide();
    updateSelects(e.target.value, 'stamomkret');
    //   alert( $("#complaintDD option:selected"));
    // console.log(e.target.value);
    // filterMap(e.target.value, $('#kommunSel').find(":selected").text());
});

function updateSelects(selection, whichSel) {

}

$("#findTreesBtn").click(function () {
    var stamomkretSel = $("#circumferenceSel").val();
    var kommunSel = $("#kommunSel").val();
    var tradslagSel = $("#tradslagSel").val();
    getPoints(kommunSel, tradslagSel, stamomkretSel);
});

$("#locateBtn").click(function () {
    //   alert( $("#complaintDD option:selected"));
    // $("#noResults").hide();
    // console.log(e.target.value);
    // filterMap(e.target.value, $('#kommunSel').find(":selected").text());
    // findLocationWithNavigator();
    console.log("locate btn clicked");
    findLocationWithNavigator();
});
