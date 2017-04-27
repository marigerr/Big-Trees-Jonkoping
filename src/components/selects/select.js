import $ from 'jquery';
import {getPoints} from 'Data/getPoints.js';
import {circumference, getCircumferenceRange} from 'Data/models/circumference.js';
import {regions, getRegions} from 'Data/models/region.js';
import {trees, getTrees} from 'Data/models/treetype.js';
import {updateLegend} from '../map/map.js';
import {showTop10, showMostCommon, stats} from '../statPane/stats.js';


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
        //console.log(e.target.className);
        $("#results").hide();
        var circumferenceSel = $(".circumference-select").val();
        var regionSel = $(".region-select").val();
        var treetypeSel = $(".treetype-select").val();
        getPoints(regionSel, circumferenceSel, treetypeSel); 
        updateDropdowns(regionSel, circumferenceSel, treetypeSel, e.target.classList[1] );
    });

    /* jshint ignore:start */
    $(".statpaneSelect").change(function(e){
       var statSelect = $(".stat-select").val(); 
       statSelect == "top10ByKommun" || statSelect == "MostCommonByKommun" ? $(".statpaneSelectRegionwrapper").show() :
       statSelect == "top10JKPG" ? showTop10("Alla") :
       statSelect == "MostCommonJKPG" ? showMostCommon("Alla") :
       console.log("stat select error");
    });

    $(".statpaneSelect.region-select").change(function(e){
       var statSelect = $(".stat-select").val(); 
       console.log(statSelect);
       var regionSel = $(".statpaneSelect.region-select").val();
       console.log(regionSel);
       statSelect == "top10ByKommun" ? showTop10(regionSel) :
       statSelect == "MostCommonByKommun" ? showMostCommon(regionSel) :
       console.log("stat select error");
    });
       /* jshint ignore:end */             
}

function updateDropdowns(region, circumference, treetype, exclude) {
    // console.log(region);
    // console.log(circumference);
    // console.log(treetype);
    if (circumference == "Alla" && exclude != 'circumference-select'){
        getCircumferenceRange(region, circumference, treetype);
    }
    if (treetype == "Alla" && exclude != 'treetype-select'){
        getTrees(region, circumference, treetype);
        // $('legend.leaflet-control').show();
    } else if(treetype != "Alla" && exclude != 'treetype-select'){
        // $('legend.leaflet-control').hide();
    
    //     updateLegend(filteredTrees, false);
    //  }
    //     var filteredTrees = [{id: treetype}];
    }
    if (region == "Alla" && exclude != 'region-select'){
        getRegions(region, circumference, treetype);
    }    
}

export { createSelect, addDropdowns, updateDropdowns};