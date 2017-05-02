//import $ from 'jquery';
import makeAjaxCall from 'Data/makeAjaxCall.js';
import lanstyrDefault from 'Data/lanstyrDefault.js';
import { map, sidebar } from '../map/map.js';
import {getPoints, getPointsSuccess} from 'Data/getPoints.js';

var locationMarker;

function findLocationWithNavigator() {
    if (navigator.geolocation) {
        removeLocationMarker();

        // var options = {
        //     enableHighAccuracy: true,
        //     timeout: 5000,
        //     maximumAge: 0
        // };

        navigator.geolocation.getCurrentPosition(navLocatesuccess, navLocateerror);//, options);
    } else {
        // Browser doesn't support Geolocation
        //   handleLocationError(false, infoWindow, map.getCenter());
        // }
    }
}

function navLocatesuccess(pos) {
    var crd = pos.coords;
    createLocationMarker(crd.latitude, crd.longitude, crd.accuracy);
    var mapViewPoint = L.latLng(crd.latitude, crd.longitude);
    // console.log('Your current position is:');
    // console.log(`Latitude : ${crd.latitude}`);
    // console.log(`Longitude: ${crd.longitude}`);
    // console.log(`Accuracy ${crd.accuracy} meters.`);
    sidebar.close();
    // var userLocation = "latlng=" + crd.latitude + "," + crd.longitude;
    var searchEnvelope = getSearchArea(crd.latitude, crd.longitude);
    findNearTrees(searchEnvelope, mapViewPoint);    
}

function navLocateerror(err) {
    console.warn(`navigator.geolocation error(${err.code}): ${err.message}`);
    findLocationWithGoogleGeolocation();
}

function getSearchArea(lat, lng) {
    // use leaflet toBounds  toBounds(<Number> sizeInMeters)	LatLngBounds	
    //Returns a new LatLngBounds object in which each boundary is sizeInMeters/2 meters apart from the LatLng.
    return L.latLng(lat, lng).toBounds(4000).toBBoxString(); // search area 4000 meters
}

function findNearTrees(searchEnvelope, mapViewPoint) {
    var defaults = lanstyrDefault();
    var success = function(response){getPointsSuccess(response, mapViewPoint, 16);};
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
    // if (feature.properties) {
        popupContent += "Your approx location with" + "</br>";
        popupContent += "an accuracy of " + Math.round(accuracy) + " meters</br>";
    // }
    locationMarker.bindPopup(popupContent).openPopup();
}

function findLocationWithGoogleGeolocation() {
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
        findNearTrees(searchEnvelope, mapViewPoint);   

        sidebar.close();
    };
    var error = function (xhr) {
        console.log(xhr.statusText);
    };

    makeAjaxCall(url, data, type, datatype, async, success, error);
}

function searchVisibleMap() {
    var bounds = map.getBounds().toBBoxString();
    findNearTrees(bounds);
}

export {removeLocationMarker, findLocationWithGoogleGeolocation, findLocationWithNavigator, searchVisibleMap};