import $ from 'jquery';
import getWhereCondition from '../getWhereCond.js';
import makeAjaxCall from '../makeAjaxCall.js';
import lanstyrDefault from '../lanstyrDefault.js';
import {createSelect} from '../../components/selects/select.js';


var regions = [{"id":"Alla","label":"Alla"},{"id":"Aneby","label":"Aneby"},{"id":"Eksjö","label":"Eksjö"},{"id":"Gislaved","label":"Gislaved"},{"id":"Gnosjö","label":"Gnosjö"},{"id":"Habo","label":"Habo"},{"id":"Jönköping","label":"Jönköping"},{"id":"Mullsjö","label":"Mullsjö"},{"id":"Nässjö","label":"Nässjö"},{"id":"Sävsjö","label":"Sävsjö"},{"id":"Tranås","label":"Tranås"},{"id":"Vaggeryd","label":"Vaggeryd"},{"id":"Vetlanda","label":"Vetlanda"},{"id":"Värnamo","label":"Värnamo"}];

function getRegionQueryText(regionSelection) {
    return regionSelection == "Alla" ? "Kommun IS NOT NULL" : "(Kommun='" + regionSelection + "')";
} 

function getRegions(regionSel= "Alla",  circumferenceSel = 100, treetypeSel = "Alla") {


    var whereQuery = getWhereCondition(regionSel, circumferenceSel, treetypeSel);

    var defaults = lanstyrDefault();

    var success = getRegionsSuccess;

    var data = defaults.data;
    data.where = whereQuery;
    data.returnGeometry = false;
    data.outSR = null;
    data.outFields = 'Kommun';
    data.orderByFields = null;
    data.returnDistinctValues = true;
    
    makeAjaxCall(defaults.url, data, defaults.type, defaults.datatyp, true, success, defaults.error);
}

var getRegionsSuccess = function (response) { //getCircumferenceRangeSuccess;
    var regions =[{id : "Alla", label : "Alla"}];
    $.each(response.features, function(index, value){
        // console.log(value.attributes.Kommun);
        var obj = {id : value.attributes.Kommun, label : value.attributes.Kommun};
        regions.push(obj  );
    });
    // console.log(regions);
    createSelect (".region-select", regions);
};

export {regions, getRegionQueryText, getRegions};
