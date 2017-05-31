//import $ from 'jquery';
import makeAjaxCall from 'Data/makeAjaxCall.js';
import lanstyrDefault from 'Data/lanstyrDefault.js';
import { map, sidebar } from 'Map/map.js';
import {getPoints, getPointsSuccess} from 'Data/getPoints.js';
import {searchCounter, incrementCounter} from 'App/app.js';
import { buildTable, addRowClickHandler } from 'Sidebar/createTable.js';

var locationMarker;

function findLocationWithNavigator(enableHighAccuracy) {
    incrementCounter();
    console.log("findLocationWithNavigator");
    
    var options = {maximumAge: 0};
    if (navigator.geolocation) {
        removeLocationMarker();
        if(enableHighAccuracy){
            console.log("using high accuracy");
            options = {
                enableHighAccuracy: true,
                timeout: 20000,
                maximumAge: 0
            };
        } else {
            console.log("not using high accuracy");
        }

        navigator.geolocation.getCurrentPosition(function(pos){navLocatesuccess(pos, enableHighAccuracy);}, function(err){navLocateerror(err, enableHighAccuracy);}, options);
    } else {
        // Browser doesn't support Geolocation
        //   handleLocationError(false, infoWindow, map.getCenter());
        // }
    }
}

function navLocatesuccess(pos, enableHighAccuracy) {
    var crd = pos.coords;
    var mapViewPoint = L.latLng(crd.latitude, crd.longitude);
    // console.log('Your current position is:');
    // console.log(`Latitude : ${crd.latitude}`);
    // console.log(`Longitude: ${crd.longitude}`);
    // console.log(`Accuracy ${crd.accuracy} meters.`);
    sidebar.close();
    // var userLocation = "latlng=" + crd.latitude + "," + crd.longitude;
    var searchEnvelope = getSearchArea(crd.latitude, crd.longitude);
    if (!enableHighAccuracy) {
        findNearTrees(searchEnvelope, mapViewPoint);  
    }
    if( crd.accuracy > 250 && searchCounter < 2){
        findLocationWithNavigator(true);
    } else {
        createLocationMarker(crd.latitude, crd.longitude, crd.accuracy);
    }
}

function navLocateerror(err, enableHighAccuracy) {
    console.warn(`navigator.geolocation error(${err.code}): ${err.message}`);
    if (!enableHighAccuracy) {
        findLocationWithGoogleGeolocation();
    }
}

function getSearchArea(lat, lng) {
    // use leaflet toBounds  toBounds(<Number> sizeInMeters)	LatLngBounds	
    //Returns a new LatLngBounds object in which each boundary is sizeInMeters/2 meters apart from the LatLng.
    return L.latLng(lat, lng).toBounds(4000).toBBoxString(); // search area 4000 meters
}

function findNearTrees(searchEnvelope, mapViewPoint, keepZoomLevel) {
    var defaults = lanstyrDefault();
    var success;
    if (mapViewPoint) {
        success = function(response){
            getPointsSuccess(response, mapViewPoint, 16);
            buildTable(".locate-table", response, true);
            addRowClickHandler();            
        };
    } else {
        success = function(response){
            getPointsSuccess(response, null, null, keepZoomLevel);
            buildTable(".locate-table", response, true);
            addRowClickHandler();
        };
    }
    var data = defaults.data;
    data.where = '';
    data.geometry = JSON.stringify(searchEnvelope);
    data.outSR = 4326;
    data.inSR = 4326;
    data.spatialRel = 'esriSpatialRelContains';
    makeAjaxCall(defaults.url, data, defaults.type, defaults.datatyp, defaults.async, success, defaults.error);
}

function removeLocationMarker() {
    if(locationMarker){
        locationMarker.remove();
    }
}

function createLocationMarker(lat,lng, accuracy) {
    locationMarker = L.marker([lat, lng]).addTo(map);
    var popupContent = "";
    popupContent += "Your location" + "</br>";
    popupContent += "Accuracy: " + Math.round(accuracy) + " meters</br>";
    locationMarker.bindPopup(popupContent, {autoPanPaddingTopLeft:[65, 5], autoPanPaddingBottomRight:[45, 5]}); //.openPopup();
}

function findLocationWithGoogleGeolocation() {
    incrementCounter();
    removeLocationMarker();
    //console.log("google geolocation called");
    var url = "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyALDj8UcNZ1fQlXcoMlJ84lSavkcyODExI";
    var type = "POST";
    var data;
    var datatype = "json";
    var async = true;
    var success = function (response) {
        //console.log(response);
        var lat = response.location.lat;
        var lng = response.location.lng;
        createLocationMarker(lat, lng, response.accuracy);

        
        //console.log("Accuracy: " + response.accuracy + " meters");
        var mapViewPoint = L.latLng(lat, lng);
        
        var searchEnvelope = getSearchArea(lat, lng);
        // if (!enableHighAccuracy) {
            findNearTrees(searchEnvelope, mapViewPoint);   
        // }

        sidebar.close();
    };
    var error = function (xhr) {
        console.log(xhr.statusText);
    };

    makeAjaxCall(url, data, type, datatype, async, success, error);
}

function searchVisibleMap() {
    $("table").empty();
    $(".tableBtns").hide();
    var bounds = map.getBounds().toBBoxString();
    findNearTrees(bounds, null, true);
}

export {removeLocationMarker, findLocationWithGoogleGeolocation, findLocationWithNavigator, searchVisibleMap};