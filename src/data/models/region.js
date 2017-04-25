import $ from 'jquery';
import {getCircumferenceQueryText} from './circumference.js';
import {getTreetypeQueryText} from './treetype.js';
import makeAjaxCall from '../makeAjaxCall.js';
import lanstyrDefault from '../lanstyrDefault.js';
import {createSelect} from '../../components/selects/select.js';


var regions = [{"id":"Alla","label":"Alla"},{"id":"Aneby","label":"Aneby"},{"id":"Eksjö","label":"Eksjö"},{"id":"Gislaved","label":"Gislaved"},{"id":"Gnosjö","label":"Gnosjö"},{"id":"Habo","label":"Habo"},{"id":"Jönköping","label":"Jönköping"},{"id":"Mullsjö","label":"Mullsjö"},{"id":"Nässjö","label":"Nässjö"},{"id":"Sävsjö","label":"Sävsjö"},{"id":"Tranås","label":"Tranås"},{"id":"Vaggeryd","label":"Vaggeryd"},{"id":"Vetlanda","label":"Vetlanda"},{"id":"Värnamo","label":"Värnamo"}];

function getRegionQueryText(regionSelection) {
    return regionSelection == "Alla" ? "Kommun IS NOT NULL" : "(Kommun='" + regionSelection + "')";
} 

function getRegions(regionSel= "Alla",  circumferenceSel = 100, treetypeSel = "Alla") {

    var regionQueryText = getRegionQueryText(regionSel);
    var circumferenceQueryText = getCircumferenceQueryText(circumferenceSel);
    var treetypeQueryText = getTreetypeQueryText(treetypeSel);


    // console.log("Stamomkret query param is " + stamomkretCond);
    var whereQuery;
    whereQuery = [
        regionQueryText,
        circumferenceQueryText,
        treetypeQueryText,
    ].join(" AND ");

    var defaults = lanstyrDefault();

    var success = getRegionsSuccess;
    var error = GetRegionsError;

    var data = defaults.data;
    data.where = whereQuery;
    data.returnGeometry = false;
    data.outSR = null;
    data.outFields = 'Kommun';
    data.orderByFields = null;
    data.returnDistinctValues = true;
    
    makeAjaxCall(defaults.url, data, defaults.type, defaults.datatyp, true, success, error);
    // console.log(range.max);
}

var getRegionsSuccess = function (response) { //getCircumferenceRangeSuccess;
    var regions =[{id : "Alla", label : "Alla"}];
    $.each(response.features, function(index, value){
        console.log(value.attributes.Kommun);
      var obj = {id : value.attributes.Kommun, label : value.attributes.Kommun};
      regions.push(obj  );
    });
    console.log(regions);
    createSelect ("#regionSel", regions)

    // var range = {min: response.features[0].attributes.minStamomkret, max :response.features[0].attributes.maxStamomkret};
    // // console.log(range.max);
    // updateCircumferenceSel(range);
    // console.log("minStamomkret " + response.features[0].attributes.minStamomkret);
    // console.log("maxStamomkret " + response.features[0].attributes.maxStamomkret);
};
var GetRegionsError = function (xhr) {
    console.log("there was an error" + xhr.statusText);
};

export {regions, getRegionQueryText, getRegions};

// A car "class"
// function Car ( model ) {
 
//   this.model = model;
//   this.color = "silver";
//   this.year = "2012";
 
//   this.getInfo = function () {
//     return this.model + " " + this.year;
//   };
 
// }