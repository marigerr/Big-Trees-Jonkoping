import $ from 'jquery';
import makeAjaxCall from 'Data/makeAjaxCall.js';
import lanstyrDefault from 'Data/lanstyrDefault.js';
import getWhereCondition from 'Data/getWhereCond.js';
import { getPoints, getPointsSuccess } from 'Data/getPoints.js';

// create selects  just need kommun dropdowns
// possibly a select dropdown to choose which stats to see
// could probably actually just put this in same pane with main tree dropdowns

var stats = [
    { id: "top10JKPG", label: "Largest 10 Trees Lan" },
    { id: "top10ByKommun", label: "Largest 10 Trees Kommun" },
    { id: "MostCommonJKPG", label: "Most Common Tree Lan" },
    { id: "MostCommonByKommun", label: "Most Common Tree Kommun" }
    // {id: "7", label: "750-1000"},
    // {id: '10', label: "Over 1000 cm"},
];

function showTop10(regionSel) {
    if (regionSel == "Alla") {
        $(".statpaneSelectRegionwrapper").hide();
        $("select.statpaneSelect.region-select").prop('selectedIndex', 0);
    }
    var whereQuery = getWhereCondition(regionSel);
    var defaults = lanstyrDefault();
    // var success = getTenLargestSuccess;
    var success = getPointsSuccess;

    var data = defaults.data;
    data.where = whereQuery;
    data.resultRecordCount = 10;

    makeAjaxCall(defaults.url, data, defaults.type, defaults.datatyp, defaults.async, success, defaults.error);
}

// function showMostCommonJKPG() {
//     $(".statpaneSelectRegionwrapper").hide();
// }

function showMostCommon(regionSel) {
    if (regionSel == "Alla") {
        $(".statpaneSelectRegionwrapper").hide();
        $("select.statpaneSelect.region-select").prop('selectedIndex', 0);
    }
    var whereQuery = getWhereCondition(regionSel);
    var outStats = JSON.stringify([
        {
            "statisticType": "count",
            "onStatisticField": "Tradslag",
            "outStatisticFieldName": "TradslagCounts"
        }
    ]);
    var defaults = lanstyrDefault();
    // var success = getTenLargestSuccess;
    // var success = defaults.success;
    var success = function(response){
        var treeFreqList = response.features;

        treeFreqList.sort(function(a, b) { 
            return b.attributes.TradslagCounts - a.attributes.TradslagCounts;
        });
        console.log(treeFreqList[0].attributes.Tradslag);
        getPoints(regionSel, "Alla", treeFreqList[0].attributes.Tradslag);
        console.log(treeFreqList);
    };
    

    var data = defaults.data;
    data.where = whereQuery;
    data.outStatistics = outStats;
    data.returnGeometry = false;
    data.outSR = null;
    data.orderByFields = null;
    data.groupByFieldsForStatistics='Tradslag';

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

export { showTop10, showMostCommon , stats };





