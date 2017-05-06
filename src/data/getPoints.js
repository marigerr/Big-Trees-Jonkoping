//import $ from 'jquery';
import lanstyrDefault from 'Data/lanstyrDefault.js';
import { map, sidebar, geojsonLayer, updateGeojsonLayer, updateLegend } from 'Components/map/map.js';
import makeAjaxCall from 'Data/makeAjaxCall.js';
import convertToGeoJson from 'Data/convertToGeoJson.js';
import getWhereCondition from 'Data/getWhereCond.js';
import { removeDuplicateTrees } from 'Data/models/treetype.js';
import { isMobile } from '../app.js';
import { removeLocationMarker } from 'Components/locate/locate.js';
import { localStorageKeyExists, addToLocalStorage, getFromLocalStorage, storageAvailable } from 'Data/storeLocally.js';

var hitsCounter = 1000;
var geojson;

function getPoints(regionSel = "Alla", circumferenceSel = "Alla", treetypeSel = "Alla", resultRecordCount = 1000) {
    removeLocationMarker();
    var whereQuery = getWhereCondition(regionSel, circumferenceSel, treetypeSel);
    var defaults = lanstyrDefault();
    var data = defaults.data;
    data.where = whereQuery;
    data.resultRecordCount = resultRecordCount;
    var async = true;
    var success = function (response) {
        if (regionSel == "Alla" && circumferenceSel == "Alla" && treetypeSel == "Alla") {
            addToLocalStorage("top1000Jkpg", response);
        }
        getPointsSuccess(response);
    };
    makeAjaxCall(defaults.url, data, defaults.type, defaults.datatype, async, success, defaults.error);
}

function getPointsSuccess(response, mapViewPoint, zoom) {

    hitsCounter = response.features.length;
    console.log(hitsCounter);

    if (response.features.length == 1000) {
        $('#results').html("Too many results!</br>Only showing first 1000 trees<br/>Try narrowing search");
        $("#results").show();
    }
    var result = convertToGeoJson(response.features);
    geojson = result.geojson;

    var treelist = result.trees;
    var noDupesTreeList = removeDuplicateTrees(treelist);
    // noDupesTreeList.sort(function(a,b) {return a.family.localeCompare(b.family);} ); 
    noDupesTreeList.sort(function (a, b) { return (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0); });
    updateLegend(noDupesTreeList);

    updateGeojsonLayer(geojson, mapViewPoint, zoom);
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
    };
    makeAjaxCall(defaults.url, data, defaults.type, defaults.datatype, async, success, defaults.error);
}



export { getPoints, getPointsSuccess, getTreeCount };
