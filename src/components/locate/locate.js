//import $ from 'jquery';
import makeAjaxCall from 'Data/makeAjaxCall.js';
import { map, sidebar } from '../map/map.js';
import {getPoints} from 'Data/getPoints.js';


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
    console.log("google geoloation called");
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

        map.setView(L.latLng(lat, lng), 14);
        var userLocation = "latlng=" + lat + "," + lng;
        // latlng=40.714224,-73.961452
        determineRegion(userLocation);
        sidebar.close();
    };
    var error = function (xhr) {
        console.log(xhr.statusText);
    };

    makeAjaxCall(url, data, type, datatype, async, success, error);
}

function determineRegion(userLocation) {
    var GoogleKey = "AIzaSyALDj8UcNZ1fQlXcoMlJ84lSavkcyODExI";
    var url = "https://maps.googleapis.com/maps/api/geocode/json?" + userLocation + "&key=" + GoogleKey;
    var type = "POST";
    var data;
    var datatype = "json";
    var async = true;
    var success = function (response) {
        console.log(response);
        console.log(response.results[4].address_components[0].short_name);
        var region = response.results[4].address_components[0].short_name;
        // var strArr = region.split(" ");
        // console.log(strArr[0]);
        getPoints(region);
        // updateMap(region);
        $(".region-select").val(region);


        // var lat = response.location.lat;
        // var lng = response.location.lng;
        // console.log("Accuracy: " + response.accuracy + " meters");

        // map.setView(L.latLng(lat, lng), 14);
        // sidebar.close();
    };
    var error = function (xhr) {
        console.log(xhr.statusText);
    };

    makeAjaxCall(url, data, type, datatype, async, success, error);
}

export {findLocationWithGoogleGeolocation, findLocationWithNavigator};