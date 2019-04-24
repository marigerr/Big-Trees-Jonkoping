import lanstyrDefault from 'Data/lanstyrDefault.js';
import { map, sidebar, geojsonLayer, updateGeojsonLayer, updateLegend } from 'Map/map.js';
import makeAjaxCall from 'Data/makeAjaxCall.js';
import convertToGeoJson from 'Data/convertToGeoJson.js';
import getWhereCondition from 'Data/getWhereCond.js';
import { removeDuplicateTrees } from 'Data/models/treetype.js';
import { isMobile } from '../app.js';
import { removeLocationMarker } from 'Sidebar/locatePane/locate.js';
import { localStorageKeyExists, addToLocalStorage, getFromLocalStorage, storageAvailable } from 'Data/storeLocally.js';

var hitsCounter = 1000;
var geojson;

function getPointsSuccess(response, mapViewPoint, zoom, keepZoomLevel) {

    hitsCounter = response.features.length;
    console.log(hitsCounter);

    if (response.features.length == 1000) {
        $('.results').html("Visar första 1000 resultat. Klicka på <br>på raden för att zooma in till träd");
        $(".results").show();
    } else {
        $('.results').html("Klicka på raden för att zooma in");
        $(".results").show();
    }
    var result = convertToGeoJson(response.features);
    geojson = result.geojson;

    var treelist = result.trees;
    var noDupesTreeList = removeDuplicateTrees(treelist);
    // noDupesTreeList.sort(function(a,b) {return a.family.localeCompare(b.family);} ); 
    noDupesTreeList.sort(function (a, b) { return (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0); });
    updateLegend(noDupesTreeList);

    updateGeojsonLayer(geojson, mapViewPoint, zoom, keepZoomLevel);
    // console.log(isMobile);
    if (isMobile) {
        sidebar.close();
    }
}

function getTreeCount() {
    var whereQuery = "Kommun is not null";
    var defaults = lanstyrDefault();
    var data = defaults.data;
    data.where = whereQuery;
    var async = true;
    data.returnGeometry = false;
    data.outSR = null;
    data.orderByFields = null;
    data.returnCountOnly = true;
    var success = function (response) {
        addToLocalStorage("JkpgLanTreeCount", response.count);
        $("#loader").hide();
    };
    makeAjaxCall(defaults.url, data, defaults.type, defaults.datatype, async, success, defaults.error);
}



export { getPointsSuccess, getTreeCount };
