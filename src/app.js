import 'leaflet/dist/leaflet.css';
import styles from './stylesheets/app.css';

import $ from 'jquery';
import 'leaflet';
import 'leaflet.markercluster';

import { map } from './map/map.js';
import makeAjaxCall from './svrCalls/makeAjaxCall.js';
import { lanstyrDefault } from './svrCalls/lanstyrDefault.js';
import getPoints from './svrCalls/getPoints.js';


var stamomkretSel = "100";
var tradslagSel = "All";
var kommunSel = "";
var resultRecordCount = 500;

// getStamomkretRange(kommunSel, tradslagSel);

getPoints(kommunSel, tradslagSel, stamomkretSel, resultRecordCount);

$("#kommunSel").change(function (e) {
    updateSelects(e.target.value, 'kommun');
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

$("#locateBtn").click(function (e) {
    //   alert( $("#complaintDD option:selected"));
    // $("#noResults").hide();
    // console.log(e.target.value);
    // filterMap(e.target.value, $('#kommunSel').find(":selected").text());
    // findLocationWithNavigator();
    findLocationWithGoogleGeolocation();
});



function getStamomkretRange(kommunSel, tradslagSel) {
    var outStats = JSON.stringify([
        {
            "statisticType": "min",
            "onStatisticField": "Stamomkret",
            "outStatisticFieldName": "minStamomkret"
        },
        {
            "statisticType": "max",
            "onStatisticField": "Stamomkret",
            "outStatisticFieldName": "maxStamomkret"
        }
    ]);

    var url = "http://ext-planeringsunderlag.lansstyrelsen.se/arcgis/rest/services/vektor/LSTF_webbgis_planeringsunderlag/MapServer/58/query";
    var data = {
        // where: whereQuery,
        // outFields: "OBJECTID, obj_idnr, OBJECTID_1, geodb_oid, Rev_datum, Kommun,Lokalnamn,Tradslag,Stamomkret,Tradstatus",
        geometryType: "esriGeometryEnvelope",
        spatialRel: "esriSpatialRelIntersects",
        outStatistics: outStats,
        returnGeometry: false,
        returnTrueCurves: false,
        returnIdsOnly: false,
        returnCountOnly: false,
        returnZ: false,
        returnM: false,
        returnDistinctValues: false,
        // outSR: 4326,
        f: "pjson"
    };
    var type = "GET";
    var datatype = "json";
    var success = function (response) { //getCircumferenceRangeSuccess;
        console.log("minStamomkret " + response.features[0].attributes.minStamomkret);
        console.log("maxStamomkret " + response.features[0].attributes.maxStamomkret);
    };
    var error = function (xhr) {
        console.log("there was an error" + xhr.statusText);
    };
    makeAjaxCall(url, data, type, datatype, success, error);
}


function findLocationWithNavigator() {
    console.log("findlocation navigator function called");
    if (navigator.geolocation) {

        var options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };

        navigator.geolocation.getCurrentPosition(navLocatesuccess, navLocateerror, options);
    } else {
        console.log("Browser doesn't support Geolocation");
        findLocationWithGoogleGeolocation();

        // $("#noResults").show();
        // Browser doesn't support Geolocation
        //   handleLocationError(false, infoWindow, map.getCenter());
        // }
    }
}

function navLocatesuccess(pos) {
    var crd = pos.coords;

    console.log('Your current position is:');
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`Accuracy ${crd.accuracy} meters.`);
    map.setView(L.latLng(crd.latitude, crd.longitude), 15);
    sidebar.close();
}

function navLocateerror(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
    findLocationWithGoogleGeolocation();

}

function findLocationWithGoogleGeolocation() {
    console.log("google geolcation called");
    var url = "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyALDj8UcNZ1fQlXcoMlJ84lSavkcyODExI";
    var type = "POST";
    var data;
    var datatype = "json";
    var success = function (response) {
        console.log(response);
        var lat = response.location.lat;
        var lng = response.location.lng;
        console.log("Accuracy: " + response.accuracy + " meters");

        map.setView(L.latLng(lat, lng), 14);
        var userLocation = "latlng=" + lat + "," + lng;
        // latlng=40.714224,-73.961452
        determineRegion(userLocation);
        sidebar.close();
    };
    var error = function (xhr) {
        console.log(xhr.statusText);
    };

    makeAjaxCall(url, data, type, datatype, success, error);
}

function determineRegion(userLocation) {
    var GoogleKey = "AIzaSyALDj8UcNZ1fQlXcoMlJ84lSavkcyODExI";
    var url = "https://maps.googleapis.com/maps/api/geocode/json?" + userLocation + "&key=" + GoogleKey;
    var type = "POST";
    var data;
    var datatype = "json";
    var success = function (response) {
        console.log(response);
        console.log(response.results[4].address_components[0].short_name);
        var region = response.results[4].address_components[0].short_name;
        // var strArr = region.split(" ");
        // console.log(strArr[0]);
        updateMap(region);
        $("#kommunSel").val(region);


        // var lat = response.location.lat;
        // var lng = response.location.lng;
        // console.log("Accuracy: " + response.accuracy + " meters");

        // map.setView(L.latLng(lat, lng), 14);
        // sidebar.close();
    };
    var error = function (xhr) {
        console.log(xhr.statusText);
    };

    makeAjaxCall(url, data, type, datatype, success, error);
}







