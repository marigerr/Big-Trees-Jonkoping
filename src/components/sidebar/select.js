//import $ from 'jquery';
import {getPoints} from 'Data/getPoints.js';
import {circumference, getCircumferenceRange} from 'Data/models/circumference.js';
import {regions, getRegions} from 'Data/models/region.js';
import {trees, getTrees} from 'Data/models/treetype.js';
import {updateLegend, emptyMap} from 'Map/map.js';
import {showTop20, showMostCommon, showAvg, stats} from './statPane/stats.js';


function createSelect (selectDiv, arr) {
    // if select has options, empty to create new option list
    var optionExistCheck = selectDiv + " option";
    if($(optionExistCheck).length > 0){
        $(selectDiv).empty();
    }
    var sel = $(selectDiv);
    var fragment = document.createDocumentFragment();
    $.each(arr, function (i) {
        var opt = document.createElement('option');
        opt.innerHTML = arr[i].label;
        opt.value = arr[i].id;
        fragment.appendChild(opt);
    });
    sel.append(fragment);
}


function addDropdowns() {
    var treeArray = trees();
    var dropdowns = [{div: ".circumference-select", arr: circumference}, {div: ".region-select", arr: regions}, {div: ".treetype-select", arr: treeArray}, {div: ".stat-select", arr: stats} ];
    $.each(dropdowns, function(index, value){
        createSelect(value.div, value.arr);
    });

    addListeners();
}

function addListeners(){
    $(".filterSelect").change(function (e) {
        $("#results").hide();
        var circumferenceSel = $(".filterSelect.circumference-select").val();
        var regionSel = $(".filterSelect.region-select").val();
        //console.log( e.target.classList[1]);
        var treetypeSel = $(".filterSelect.treetype-select").val();
        getPoints(regionSel, circumferenceSel, treetypeSel); 
        updateDropdowns(regionSel, circumferenceSel, treetypeSel, e.target.classList[1] );
    });

    /* jshint ignore:start */
        $(".statpaneSelect").change(function(e){
    //    $(".statpaneSelectRegionDiv").show();
    //    $(".statpaneSelectTreeDiv").show();
        emptyMap();
       var statSelect = $(".stat-select").val(); 
       var regionSel = $(".statpaneSelect.region-select").val();
       var treetypeSel = $(".statpaneSelect.treetype-select").val();
       $(".stat-table").empty();
       statSelect == "top20" ? showTop20(regionSel, treetypeSel) :
       statSelect == "MostCommon" ? showMostCommon(regionSel, "Alla") :
       statSelect == "AvgMax" ? showAvg(regionSel, treetypeSel) :
       reset();
    });
    /* jshint ignore:end */ 

    function reset(){
        $("select.statpaneSelect.treetype-select").prop('selectedIndex', 0);
        $("select.statpaneSelect.region-select").prop('selectedIndex', 0);
        emptyMap();
        console.log("no choice made");
    }
 
}

function updateDropdowns(region, circumference, treetype, exclude) {
    if (circumference == "Alla" && exclude != 'circumference-select'){
        getCircumferenceRange(region, circumference, treetype);
    }
    if (treetype == "Alla" && exclude != 'treetype-select'){
        getTrees(region, circumference, treetype);
    } else if(treetype != "Alla" && exclude != 'treetype-select'){

    }
    if (region == "Alla" && exclude != 'region-select'){
        getRegions(region, circumference, treetype);
    }    
}

export { createSelect, addDropdowns, updateDropdowns};