//import $ from 'jquery';
import lanstyrDefault from 'Data/lanstyrDefault.js';
import { map, sidebar, geojsonLayer, updateGeojsonLayer, updateLegend } from 'Components/map/map.js';
import makeAjaxCall from 'Data/makeAjaxCall.js';
import convertToGeoJson from 'Data/convertToGeoJson.js';
import getWhereCondition from 'Data/getWhereCond.js';
import {removeDuplicateTrees} from 'Data/models/treetype.js';
import {isMobile} from '../app.js';
import {removeLocationMarker} from 'Components/locate/locate.js';

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
    var success = function(response){ getPointsSuccess(response);};
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
    updateLegend(noDupesTreeList);

    updateGeojsonLayer(geojson, mapViewPoint, zoom);
    // console.log(isMobile);
    if (isMobile){
        sidebar.close();
    }

}


export {getPoints, getPointsSuccess };
