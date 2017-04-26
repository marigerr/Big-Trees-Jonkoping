import $ from 'jquery';
import lanstyrDefault from './lanstyrDefault.js';
import { map, markers, geojsonLayer, updateGeojsonLayer } from '../components/map/map.js';
import makeAjaxCall from './makeAjaxCall.js';
import convertToGeoJson from './convertToGeoJson.js';
import getWhereCondition from './getWhereCond.js';

var hitsCounter = 1000;
var geojson;

export default function filterPoints(regionSel = "Alla", circumferenceSel = "Alla", treetypeSel = "Alla"){
    // console.log("Before new call hitsCounter= " + hitsCounter);
    // if (hitsCounter == 1000){
        console.log("prior result over 1000");
        getPoints(regionSel, circumferenceSel, treetypeSel);    
    // } else {
    //     filterGeoJson(regionSel, circumferenceSel, treetypeSel);
    // }
}

function getPoints(regionSel, circumferenceSel = "Alla", treetypeSel = "Alla") {
    var whereQuery = getWhereCondition(regionSel, circumferenceSel, treetypeSel);
    var defaults = lanstyrDefault();
    var data = defaults.data;
    data.where = whereQuery;
    // data.resultRecordCount = resultRecordCount;
    var async = true;
    var success = getPointsSuccess;
    makeAjaxCall(defaults.url, data, defaults.type, defaults.datatype, async, success, defaults.error);
}

function getPointsSuccess(response) {

    hitsCounter = response.features.length;
    console.log("getPoints");    
    console.log("After new call hitsCounter= " + hitsCounter);   

    if (response.features.length == 1000) {
        $('#results').html("Too many result, only showing first 1000  <br/>Try narrowing query");
        $("#results").show();
        // console.log("over 1000 hits");
    }
    geojson = convertToGeoJson(response.features);
    // console.log(geojson);
    updateGeojsonLayer(geojson);

    markers.addLayer(geojsonLayer);
    map.addLayer(markers);
    map.fitBounds(markers.getBounds());

}

// function filterGeoJson(regionSel, circumferenceSel, treetypeSel){
//     // hitsCounter = response.features.length;
//     console.log("filterGeoJson");
//     console.log("After new call hitsCounter= " + hitsCounter);

//     // if (geojsonLayer) {
//     //     markers.removeLayer(geojsonLayer);
//     //     geojsonLayer = {};
//     // }
//     // console.log("this is updateGeoJsonLayer function geojson return value");
//     // console.log(geojson);

//     // var Stamomkret = feature.properties.Stamomkret
//     var filterCondition = '(feature.properties.Tradslag == treetypeSel || treetypeSel == "Alla") &&' +
//                            '(feature.properties.Kommun == regionSel || regionSel == "Alla")';
//     // var filter =  function (feature, layer) {
//     //                 return (feature.properties.Tradslag == treetypeSel || treetypeSel == "Alla") &&
//     //                        (feature.properties.Kommun == regionSel || regionSel == "Alla"); //&&
//     //                     //    eval(circumferenceSel);
//     //               };

//     updateGeojsonLayer(geojson, filterCondition);

//     // geojsonLayer = L.geoJSON(geojson, { filter: filter, pointToLayer: pointToLayer, onEachFeature: onEachFeature });

//     // markers.addLayer(geojsonLayer);
//     // map.addLayer(markers);
//     // map.fitBounds(markers.getBounds());    


// 		// filter: function (feature, layer) {
// 		// 	if (feature.properties) {
// 		// 		// If the property "underConstruction" exists and is true, return false (don't render features under construction)
// 		// 		return feature.properties.underConstruction !== undefined ? !feature.properties.underConstruction : true;
// 		// 	}
// 		// 	return false;
		

// }


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