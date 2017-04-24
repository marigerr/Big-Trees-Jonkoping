import $ from 'jquery';
import getCircumferenceRange from '../../data/getCircumferenceRange.js';

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

var circumferences = [
    { html: 'All', value: 100 },
    { html: '100-250', value: 1 },
    { html: '250-500', value: 2 },
    { html: '500-750', value: 5 },
    { html: '750-1000', value: 7 },
    { html: 'Over 1000 cm', value: 10 },
];

function initCircumferenceSel() {
    var sel = $("#circumferenceSel");
    var fragment = document.createDocumentFragment();
    $.each(circumferences, function (i) {
        // console.log(response.features[i].properties.complaint_type);
        var opt = document.createElement('option');
        opt.innerHTML = circumferences[i].html;
        opt.value = circumferences[i].value;
        fragment.appendChild(opt);
    });
    sel.append(fragment);
}

function updateCircumferenceSel(range) {
    console.log("back in select updateCirc");
    console.log(range.max);
    console.log(range.min);
    
    var circumArrRef =  range.max < 250 ? 2 :
                        range.max >= 250 && range.max < 500 ? 3 :
                        range.max >= 500 && range.max < 750 ? 4 :
                        range.max >= 750 && range.max < 1000 ? 5 :
                        range.max >= 1000 ? 6 :
                        6;    

    var newCircumferences = circumferences.slice(0,circumArrRef);
    console.log(newCircumferences);
    var sel = $("#circumferenceSel").empty();
    var fragment = document.createDocumentFragment();
    $.each(newCircumferences, function (i) {
        // console.log(response.features[i].properties.complaint_type);
        var opt = document.createElement('option');
        opt.innerHTML = newCircumferences[i].html;
        opt.value = newCircumferences[i].value;
        fragment.appendChild(opt);
    });
    sel.append(fragment);    


}

function addDropdowns() {
    initRegionSel();
    initCircumferenceSel();
}

function updateDropdowns(region, circumference, treetype) {
    console.log("inside updateDropdowns in select.js");
    getCircumferenceRange(region);
    // console.log(range);

}

export { addDropdowns, updateDropdowns, updateCircumferenceSel};