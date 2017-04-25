import $ from 'jquery';
import {circumference, getCircumferenceRange} from '../../data/models/circumference.js';
import {regions, getRegions} from '../../data/models/region.js';
import {trees, getTrees} from '../../data/models/treetype.js';


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
    var dropdowns = [{div: "#circumferenceSel", arr: circumference}, {div: "#regionSel", arr: regions}, {div: "#treetypeSel", arr: trees} ];
    $.each(dropdowns, function(index, value){
        createSelect(value.div, value.arr);
    });
}

function updateDropdowns(region, circumference, treetype, exclude) {
    console.log(region);
    console.log(circumference);
    console.log(treetype);
    if (exclude != 'notCircumference'){
        getCircumferenceRange(region, circumference, treetype);
    }
    if (exclude != 'notTreetype'){
        getTrees(region, circumference, treetype);
    }
    if (exclude != 'notRegion'){
        getRegions(region, circumference, treetype);
    }    
}

export { createSelect, addDropdowns, updateDropdowns};