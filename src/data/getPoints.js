import $ from 'jquery';
import lanstyrDefault from 'Data/lanstyrDefault.js';
import { map, markers, geojsonLayer, updateGeojsonLayer } from 'Components/map/map.js';
import makeAjaxCall from 'Data/makeAjaxCall.js';
import convertToGeoJson from 'Data/convertToGeoJson.js';
import getWhereCondition from 'Data/getWhereCond.js';

var hitsCounter = 1000;
var geojson;

function getPoints(regionSel = "Alla", circumferenceSel = "Alla", treetypeSel = "Alla", resultRecordCount = 1000) {
    var whereQuery = getWhereCondition(regionSel, circumferenceSel, treetypeSel);
    var defaults = lanstyrDefault();
    var data = defaults.data;
    data.where = whereQuery;
    data.resultRecordCount = resultRecordCount;
    var async = true;
    var success = getPointsSuccess;
    makeAjaxCall(defaults.url, data, defaults.type, defaults.datatype, async, success, defaults.error);
}

function getPointsSuccess(response) {

    hitsCounter = response.features.length;

    if (response.features.length == 1000) {
        $('#results').html("Too many results</br>Only showing first 1000<br/>Try narrowing query");
        $("#results").show();
        console.log("over 1000 hits");
    }
    geojson = convertToGeoJson(response.features);
    updateGeojsonLayer(geojson);
    markers.addLayer(geojsonLayer);
    map.addLayer(markers);
    var bounds = markers.getBounds();
    var roughBoundsArea = calcRoughArea(bounds);
    if (roughBoundsArea < 0.005) {
        map.setView(bounds.getCenter(), 12);
    } else {
        map.fitBounds(bounds);
    } 
}

function calcRoughArea(bounds){
    console.log(markers.getBounds().toBBoxString().split(","));
    var coord = markers.getBounds().toBBoxString().split(",");
    var roughArea = Math.abs((coord[0]-coord[2]) * (coord[1] - coord[3]));
    console.log(roughArea);
}

export {getPoints, getPointsSuccess };



//extra code

    // var lat = response.location.lat;
    // var lng = response.location.lng;
    // console.log("Accuracy: " + response.accuracy + " meters");

    // map.setView(L.latLng(lat, lng), 14);
    // var userLocation = "latlng=" + lat + "," + lng;
    // // latlng=40.714224,-73.961452
    // determineRegion(userLocation);
    // sidebar.close();
    // }


        // if (geojsonLayer) {
    //     markers.removeLayer(geojsonLayer);
    //     geojsonLayer = {};
    // }
    // geojsonLayer = L.geoJSON(geojson, { pointToLayer: pointToLayer, onEachFeature: onEachFeature });