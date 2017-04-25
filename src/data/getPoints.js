import $ from 'jquery';
import lanstyrDefault from './lanstyrDefault.js';
import { map, markers, geojsonLayer, updateGeojsonLayer } from '../map/map.js';
import makeAjaxCall from './makeAjaxCall.js';
import convertToGeoJson from './convertToGeoJson.js';
import {getTradslagCond } from './getCondition.js';
import {getCircumferenceQueryText} from './models/circumference.js';
import {getRegionQueryText} from './models/region.js';
import {getTreetypeQueryText} from './models/treetype.js';

function getPointsSuccess(response) {
    // console.log("getPoints Response =" + response.spatialReference.wkid);
    // console.log("# of points=" + response.features.length);
    if (response.features.length > 999) {
        $('#results').html("Too many result, only showing first 1000  <br/>Try narrowing query");
        $("#results").show();
        console.log("over 1000 hits");
    }
    // else {
    var geojson = convertToGeoJson(response.features);
    // console.log(geojson);
    updateGeojsonLayer(geojson);
    // if (geojsonLayer) {
    //     markers.removeLayer(geojsonLayer);
    //     geojsonLayer = {};
    // }
    // geojsonLayer = L.geoJSON(geojson, { pointToLayer: pointToLayer, onEachFeature: onEachFeature });
    markers.addLayer(geojsonLayer);
    map.addLayer(markers);
    map.fitBounds(markers.getBounds());
    // var lat = response.location.lat;
    // var lng = response.location.lng;
    // console.log("Accuracy: " + response.accuracy + " meters");

    // map.setView(L.latLng(lat, lng), 14);
    // var userLocation = "latlng=" + lat + "," + lng;
    // // latlng=40.714224,-73.961452
    // determineRegion(userLocation);
    // sidebar.close();
    // }
}




export default function getPoints(kommunSel, tradslagSel = "All", stamomkretSel = 100, resultRecordCount = 100) {
    // var kommunCond = getKommunCond(kommunSel);
    var kommunCond = getRegionQueryText(kommunSel);
    var tradslagCond = getTreetypeQueryText(tradslagSel);
    var stamomkretCond = getCircumferenceQueryText(stamomkretSel);

    // console.log("Stamomkret query param is " + stamomkretCond);
    var whereQuery;
    whereQuery = [
        kommunCond,
        tradslagCond,
        stamomkretCond,
    ].join(" AND ");

    var defaults = lanstyrDefault();

    var url = defaults.url;
    var data = defaults.data;
    data.where = whereQuery;
    data.resultRecordCount = resultRecordCount;
    var type = defaults.type;
    var datatype = defaults.datatype;
    var async = true;
    var success = getPointsSuccess;
    var error = defaults.error;
    makeAjaxCall(url, data, type, datatype, async, success, error);
}