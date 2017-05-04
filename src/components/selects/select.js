//import $ from 'jquery';
import {getPoints} from 'Data/getPoints.js';
import {circumference, getCircumferenceRange} from 'Data/models/circumference.js';
import {regions, getRegions} from 'Data/models/region.js';
import {trees, getTrees} from 'Data/models/treetype.js';
import {updateLegend} from '../map/map.js';
import {showTop20, showMostCommon, stats} from '../statPane/stats.js';


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
    var dropdowns = [{div: ".circumference-select", arr: circumference}, {div: ".region-select", arr: regions}, {div: ".treetype-select", arr: trees}, {div: ".stat-select", arr: stats} ];
    $.each(dropdowns, function(index, value){
        createSelect(value.div, value.arr);
    });

    addListeners();
}

function addListeners(){
    $(".filterSelect").change(function (e) {
        $("#results").hide();
        var circumferenceSel = $(".circumference-select").val();
        var regionSel = $(".region-select").val();
        //console.log( e.target.classList[1]);
        var treetypeSel = $(".treetype-select").val();
        getPoints(regionSel, circumferenceSel, treetypeSel); 
        updateDropdowns(regionSel, circumferenceSel, treetypeSel, e.target.classList[1] );
    });

    /* jshint ignore:start */
    $(".statpaneSelect").change(function(e){
       $(".stat-table").empty();
       var statSelect = $(".stat-select").val(); 
       statSelect == "top20ByKommun" || statSelect == "MostCommonByKommun" ? $(".statpaneSelectRegionwrapper").show() :
       statSelect == "top20JKPG" ? showTop20("Alla") :
       statSelect == "MostCommonJKPG" ? showMostCommon("Alla") :
       console.log("no choice made");
    });

    $(".statpaneSelect.region-select").change(function(e){
       var statSelect = $(".stat-select").val(); 
       var regionSel = $(".statpaneSelect.region-select").val();
       statSelect == "top20ByKommun" ? showTop20(regionSel) :
       statSelect == "MostCommonByKommun" ? showMostCommon(regionSel) :
       console.log("stat select error");
    });
       /* jshint ignore:end */             
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