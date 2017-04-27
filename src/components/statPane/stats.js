import $ from 'jquery';
import makeAjaxCall from 'Data/makeAjaxCall.js';
import lanstyrDefault from 'Data/lanstyrDefault.js';
import getWhereCondition from 'Data/getWhereCond.js';

// create selects  just need kommun dropdowns
// possibly a select dropdown to choose which stats to see
// could probably actually just put this in same pane with main tree dropdowns

function getTenLargestTrees(regionSel){
    var whereQuery = getWhereCondition(regionSel);
    var defaults = lanstyrDefault();
    // var success = getTenLargestSuccess;
    var success = defaults.success;

    var data = defaults.data;
    data.where = whereQuery;
    data.resultRecordCount = 10;
    
    makeAjaxCall(defaults.url, data, defaults.type, defaults.datatyp, defaults.async, success, defaults.error);    
}

// function getTenLargestTrees(regionSel){
//     var whereQuery = getWhereCondition(regionSel);
//     var defaults = lanstyrDefault();
//     var success = getTenLargestSuccess;
//     var data = defaults.data;
//     data.where = whereQuery;
//     data.returnGeometry = false;
//     data.outSR = null;
//     data.outFields = 'Tradslag';
//     data.orderByFields = 'Tradslag';
//     data.returnDistinctValues = true;
    
//     makeAjaxCall(defaults.url, data, defaults.type, defaults.datatyp, defaults.async, success, defaults.error);    
// }

export { getTenLargestTrees };





