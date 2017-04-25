import $ from 'jquery';
// import getCircumferenceRange from '../../data/getCircumferenceRange.js';
import {circumference, getCircumferenceRange} from '../../data/models/circumference.js';
import {regions} from '../../data/models/region.js';
import {trees, getTrees} from '../../data/models/treetype.js';



function initRegionSel() {
    var regions = ["All", "Aneby", "Eksjö", "Gislaved", "Gnosjö", "Habo", "Jönköping", "Mullsjö", "Nässjö", "Sävsjö", "Tranås", "Vaggeryd", "Vetlanda", "Värnamo"];
    var sel = $("#kommunSel");
    var fragment = document.createDocumentFragment();
    $.each(regions, function (i) {
        // console.log(response.features[i].properties.complaint_type);
        var opt = document.createElement('option');
        opt.innerHTML = regions[i];
        opt.value = regions[i];
        fragment.appendChild(opt);
    });
    sel.append(fragment);
}

function updateRegionSel() {
    $.each(response.features, function (i) {
        // console.log(response.features[i].properties.complaint_type);
        var opt = document.createElement('option');
        opt.innerHTML = response.features[i].properties.complaint_type;
        opt.value = response.features[i].properties.complaint_type;
        fragment.appendChild(opt);
    });
    sel.append(fragment);
}

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

function updateCircumferenceSel(range) {
    console.log(range.max);

    var circumArrRef =  range.max < 250 ? 2 :
                        range.max >= 250 && range.max < 500 ? 3 :
                        range.max >= 500 && range.max < 750 ? 4 :
                        range.max >= 750 && range.max < 1000 ? 5 :
                        range.max >= 1000 ? 6 :
                        6;

    var newCircumferences = circumference.slice(0,circumArrRef);
    console.log(newCircumferences);
    createSelect("#circumferenceSel", newCircumferences);

}

function initTreetypeSel() {
    var treetype = [

    ];
}

function addDropdowns() {
    var dropdowns = [{div: "#circumferenceSel", arr: circumference}, {div: "#kommunSel", arr: regions}, {div: "#tradslagSel", arr: trees} ];
    $.each(dropdowns, function(index, value){
        createSelect(value.div, value.arr);
    });

    // initRegionSel();
}

function updateDropdowns(region, circumference, treetype) {
    console.log("inside updateDropdowns in select.js");
    getCircumferenceRange(region);
    getTrees(region, circumference, treetype);
    // console.log(range);

}

export { createSelect, addDropdowns, updateDropdowns, updateCircumferenceSel};