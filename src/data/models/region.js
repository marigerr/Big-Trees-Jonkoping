import $ from 'jquery';

var regions = [{"id":"All","label":"All"},{"id":"Aneby","label":"Aneby"},{"id":"Eksjö","label":"Eksjö"},{"id":"Gislaved","label":"Gislaved"},{"id":"Gnosjö","label":"Gnosjö"},{"id":"Habo","label":"Habo"},{"id":"Jönköping","label":"Jönköping"},{"id":"Mullsjö","label":"Mullsjö"},{"id":"Nässjö","label":"Nässjö"},{"id":"Sävsjö","label":"Sävsjö"},{"id":"Tranås","label":"Tranås"},{"id":"Vaggeryd","label":"Vaggeryd"},{"id":"Vetlanda","label":"Vetlanda"},{"id":"Värnamo","label":"Värnamo"}];

function getRegionQueryText(regionSelection) {
    return regionSelection == "All" ? "Kommun IS NOT NULL" : "Kommun='" + regionSelection + "'";
} 

function getRegions(kommunSel= "All", tradslagSel = "All", stamomkretSel = 100) {

    var circumferenceQueryText = getCircumferenceQueryText(kommunSel);
    // var tradslagCond = getTradslagCond(tradslagSel);
    // var stamomkretCond = getCircumferenceQueryText(stamomkretSel);

    // console.log("Stamomkret query param is " + stamomkretCond);
    var whereQuery;
    whereQuery = [
        circumferenceQueryText,
        // tradslagCond,
        // stamomkretCond,
    ].join(" AND ");

    var defaults = lanstyrDefault();

    var success = getRegionsSuccess;
    var error = GetRegionsError;

    var data = defaults.data;
    data.where = whereQuery;
    data.returnGeometry = false;
    data.outSR = null;
    data.outFields = Kommun;
    data.orderByFields = null;
    data.returnDistinctValues = true;
    
    makeAjaxCall(defaults.url, data, defaults.type, defaults.datatyp, async, success, error);
    // console.log(range.max);
}

var getRegionsSuccess = function (response) { //getCircumferenceRangeSuccess;
    var regions =[{id : "All", label : "All"}];
    $.each(response.features, function(index, value){
      var obj = {id : value, label : value};
      regions.push(value);
    });
    // createSelect (selectDiv, arr)

    // var range = {min: response.features[0].attributes.minStamomkret, max :response.features[0].attributes.maxStamomkret};
    // // console.log(range.max);
    // updateCircumferenceSel(range);
    // console.log("minStamomkret " + response.features[0].attributes.minStamomkret);
    // console.log("maxStamomkret " + response.features[0].attributes.maxStamomkret);
};
var GetRegionsError = function (xhr) {
    console.log("there was an error" + xhr.statusText);
};

export {regions, getRegionQueryText};

// A car "class"
// function Car ( model ) {
 
//   this.model = model;
//   this.color = "silver";
//   this.year = "2012";
 
//   this.getInfo = function () {
//     return this.model + " " + this.year;
//   };
 
// }