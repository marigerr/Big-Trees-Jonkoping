//import $ from 'jquery';
import makeAjaxCall from 'Data/makeAjaxCall.js';
import lanstyrDefault from 'Data/lanstyrDefault.js';
import { map, sidebar } from '../map/map.js';
import {getPoints, getPointsSuccess} from 'Data/getPoints.js';


function findLocationWithNavigator() {
    console.log("findlocation navigator function called");
    if (navigator.geolocation) {

        // var options = {
        //     enableHighAccuracy: true,
        //     timeout: 5000,
        //     maximumAge: 0
        // };

        navigator.geolocation.getCurrentPosition(navLocatesuccess, navLocateerror);//, options);
    } else {
        console.log("Browser doesn't support Geolocation");
        //findLocationWithGoogleGeolocation();

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
    sidebar.close();
    // var userLocation = "latlng=" + crd.latitude + "," + crd.longitude;
    var searchEnvelope = getSearchArea(crd.latitude, crd.longitude);
    findNearTrees(searchEnvelope);    
}

function navLocateerror(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
    findLocationWithGoogleGeolocation();

}

function getSearchArea(lat, lng) {
    var latSearchDistance = 0.015;
    var lngSearchDistance = 0.04;
    var xmin = lng - lngSearchDistance;
    var ymin = lat - latSearchDistance;
    var xmax = lng + lngSearchDistance;
    var ymax = lat + latSearchDistance;

    return {"xmin" : xmin, "ymin" : ymin, "xmax" : xmax, "ymax" : ymax, "spatialReference" : {"wkid" : 4326}};
}

function findNearTrees(searchEnvelope) {
    var defaults = lanstyrDefault();
    var success = getPointsSuccess;
    var data = defaults.data;
    data.where = '';
    data.geometry = JSON.stringify(searchEnvelope);
    data.outSR = 4326;
    data.inSR = 4326;
    data.spatialRel = 'esriSpatialRelContains';
    makeAjaxCall(defaults.url, data, defaults.type, defaults.datatyp, defaults.async, success, defaults.error);
}

// function determineRegion(userLocation) {
//     var GoogleKey = "AIzaSyALDj8UcNZ1fQlXcoMlJ84lSavkcyODExI";
//     var url = "https://maps.googleapis.com/maps/api/geocode/json?" + userLocation + "&key=" + GoogleKey;
//     var type = "POST";
//     var data;
//     var datatype = "json";
//     var async = true;
//     var success = function (response) {
//         console.log(response);
//         console.log(response.results[4].address_components[0].short_name);
//         var region = response.results[4].address_components[0].short_name;
//         // var strArr = region.split(" ");
//         // console.log(strArr[0]);
//         getPoints(region);
//         // updateMap(region);
//         $(".region-select").val(region);
//         // var lat = response.location.lat;
//         // var lng = response.location.lng;
//         // console.log("Accuracy: " + response.accuracy + " meters");
//         // map.setView(L.latLng(lat, lng), 14);
//         // sidebar.close();
//     };
//     var error = function (xhr) {
//         console.log(xhr.statusText);
//     };

//     makeAjaxCall(url, data, type, datatype, async, success, error);
// }

function findLocationWithGoogleGeolocation() {
    console.log("google geolocation called");
    var url = "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyALDj8UcNZ1fQlXcoMlJ84lSavkcyODExI";
    var type = "POST";
    var data;
    var datatype = "json";
    var async = true;
    var success = function (response) {
        console.log(response);
        var lat = response.location.lat;
        var lng = response.location.lng;
        console.log("Accuracy: " + response.accuracy + " meters");
        var searchEnvelope = getSearchArea(lat, lng);
        findNearTrees(searchEnvelope);   
        // map.setView(L.latLng(lat, lng), 14);
        // var userLocation = "latlng=" + lat + "," + lng;
        // latlng=40.714224,-73.961452

        // determineRegion(userLocation);
        sidebar.close();
    };
    var error = function (xhr) {
        console.log(xhr.statusText);
    };

    makeAjaxCall(url, data, type, datatype, async, success, error);
}

function searchVisibleMap() {
    var bounds = map.getBounds().toBBoxString();
    console.log(bounds);
    findNearTrees(bounds);
    // var geometryEnvelope = bounds.join(',');
    // console.log(geometryEnvelope);
    // var xmin = bounds[]
    // var ymin = bounds[]
    // var xmax = bounds[]
    // var ymax = bounds[]    
    // return {"xmin" : xmin, "ymin" : ymin, "xmax" : xmax, "ymax" : ymax, "spatialReference" : {"wkid" : 4326}};
}


export {findLocationWithGoogleGeolocation, findLocationWithNavigator, searchVisibleMap};