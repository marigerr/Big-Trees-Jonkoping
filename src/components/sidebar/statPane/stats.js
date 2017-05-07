//import $ from 'jquery';
import makeAjaxCall from 'Data/makeAjaxCall.js';
import lanstyrDefault from 'Data/lanstyrDefault.js';
import getWhereCondition from 'Data/getWhereCond.js';
import { getPoints, getPointsSuccess } from 'Data/getPoints.js';
import {trees} from 'Data/models/treetype.js';

var stats = [
    // { id: "", label: "Choose Stats" },
    { id: "top20", label: "Largest Trees" },
    { id: "MostCommon", label: "Most Common" },
    { id: "AvgMax", label: "Average Cirumference" }
];

function showTop20(regionSel, treetypeSel) {
    $(".statpaneSelectTreeDiv").show();
    var whereQuery = getWhereCondition(regionSel, null, treetypeSel);
    var defaults = lanstyrDefault();
    var success = function(response){ 
        getPointsSuccess(response);
        $.each(response.features, function(index, value){
            response.features[index].Tradslag = response.features[index].attributes.Tradslag.replace("-släktet", "");
            response.features[index].Stamomkret = response.features[index].attributes.Stamomkret.toString();// + " cm";
            response.features[index].Lokalnamn = response.features[index].attributes.Lokalnamn;
        });
        var treeOrTrees = response.features.length > 1 ? "trees" : "tree";
        var title = `Largest ${treetypeSel == "Alla" ? "" : treetypeSel} ${treeOrTrees} in ${regionSel == "Alla" ? "JKPG Lan" : regionSel}`;
        addTableCaption(title);
        createTableHeader(["Tree type", "cm", "Place"]);
        addTableData(response.features, ["Tradslag", "Stamomkret", "Lokalnamn"]);
    };
    var data = defaults.data;
    data.where = whereQuery;
    data.resultRecordCount = 20;

    makeAjaxCall(defaults.url, data, defaults.type, defaults.datatyp, defaults.async, success, defaults.error);
}

function showMostCommon(regionSel, treetypeSel) {
    $(".statpaneSelectTreeDiv").hide();
    $("select.statpaneSelect.treetype-select").prop('selectedIndex', 0);
    var whereQuery = getWhereCondition(regionSel, null, treetypeSel);
    var outStats = JSON.stringify([
        {
            "statisticType": "count",
            "onStatisticField": "Tradslag",
            "outStatisticFieldName": "TradslagCounts"
        }
    ]);
    var defaults = lanstyrDefault();
    var success = function(response){
        var treeFreqList = response.features;
        var groupedTrees = groupTrees(treeFreqList);
        groupedTrees.sort(function(a, b) { 
            return b.total - a.total;
        });
        var title = `Tree totals in ${regionSel == "Alla" ? "Jönköping Lan" : regionSel}`;
        addTableCaption(title);
        createTableHeader(["Tree Type", "Total"]);
        addTableData(groupedTrees,["label", "total"]);
        var sumTotal = 0;
        $.each(groupedTrees, function(index, value){
            sumTotal += groupedTrees[index].total; 
        });
        var sumRow$ = $('<tr class="boldRow"/>');
        sumRow$.append($('<td/>').html("Total"));
        sumRow$.append($('<td/>').html(sumTotal));
        $(".stat-table").append(sumRow$);
        // getPoints(regionSel, "Alla", treeFreqList[0].attributes.Tradslag);
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

function showAvg(regionSel, treetypeSel) {
    $(".statpaneSelectTreeDiv").show();

    var whereQuery = getWhereCondition(regionSel, "Alla", treetypeSel);
    var defaults = lanstyrDefault();
    var success = function(response){ 
        var dataObjArray = [{avgStamomkret: response.features[0].attributes.avgStamomkret}];
        addTableCaption(`${treetypeSel == "Alla" ? "" : treetypeSel} ${regionSel == "Alla" ? "JKPG Lan" : regionSel}`);
        
        createTableHeader(["Average Circumference"]);
        addTableData(dataObjArray, ["avgStamomkret"]);
    };
    var outStats = JSON.stringify([
        {
            "statisticType": "avg",
            "onStatisticField": "Stamomkret",
            "outStatisticFieldName": "avgStamomkret"
        }        
    ]);    
    var data = defaults.data;
    data.where = whereQuery;
    data.outStatistics = outStats;
    data.returnGeometry = false;
    data.outSR = null;
    data.orderByFields = null;

    makeAjaxCall(defaults.url, data, defaults.type, defaults.datatyp, defaults.async, success, defaults.error);
}
     
function addTableCaption(caption) {
    $(".stat-table").empty();
    var caption$ = $('<caption/>');
    caption$.html(caption);
    $(".stat-table").append(caption$); 
}

function createTableHeader(columns){
    var header$ = $('<tr/>');
    $.each(columns, function(index, value){
        header$.append($('<th/>').html(value));        
    });
    $(".stat-table").append(header$); 
}

function addTableData(array, columns){
    var arrayLength = array.length;
    for (var i = 0; i < arrayLength; i++) {
        var row$ = $('<tr/>');
        for (var colIndex = 0; colIndex < columns.length; colIndex++) {           
            row$.append($('<td/>').html(array[i][columns[colIndex]]));
        }
        $(".stat-table").append(row$);
    }  
    $(".stat-table").show();
}

function groupTrees(treeFreqList){
    var groupedTrees = trees();
    groupedTrees.shift();
    var i, j;
    for (i = 0; i < treeFreqList.length; i++) {  
        for (j = 0; j < groupedTrees.length; j++) {          
            if(treeFreqList[i].attributes.Tradslag.match(groupedTrees[j].matchWith)){
                if (groupedTrees[j].total === undefined) {
                    groupedTrees[j].total = 0;
                }
                groupedTrees[j].total += treeFreqList[i].attributes.TradslagCounts;
                break;    
            }    
        }        
    }       
    groupedTrees = $.grep(groupedTrees, function(tree){
        return tree.total !== undefined;
    });
    return groupedTrees;
}

export { showTop20, showMostCommon, showAvg, stats, addTableCaption, createTableHeader, addTableData };





