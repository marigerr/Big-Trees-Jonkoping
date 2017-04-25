import $ from 'jquery';
import {getRegionQueryText} from './region.js';
import {getCircumferenceQueryText} from './circumference.js';
import makeAjaxCall from '../makeAjaxCall.js';
import lanstyrDefault from '../lanstyrDefault.js';
import {createSelect} from '../../components/selects/select.js';



var trees = [
    {"id":"All","querytext":"Tradslag is not null","label":"All"},
    {"id":"Al","querytext":"Tradslag like '%Al'","label":"Al"},
    {"id":"Alm","querytext":"Tradslag like '%Alm%'","label":"Alm"},
    {"id":"Ask","querytext":"Tradslag like '%Ask%'","label":"Ask"},
    {"id":"Äpple","querytext":"(Tradslag like '%Apel%' OR Tradslag like '%Äpple%'","label":"Äpple"},
    {"id":"Avenbok","querytext":"Tradslag like '%Avenbok%'","label":"Avenbok"},
    {"id":"Björk","querytext":"Tradslag like '%Björk%'","label":"Björk"},
    {"id":"Bok","querytext":"Tradslag like '%Bok%'","label":"Bok"},
    {"id":"Ek","querytext":"Tradslag like '%Ek%'","label":"Ek"},
    {"id":"En","querytext":"Tradslag='En' OR OR Tradslag='Kungsen'","label":"En"},
    {"id":"Gran","querytext":"Tradslag like '%Gran%'","label":"Gran"},
    {"id":"Hassel","querytext":"Tradslag like '%Hassel%'","label":"Hassel"},
    {"id":"Hagtorn","querytext":"Tradslag like '%Hagtorn%'","label":"Hagtorn"},
    {"id":"Idegran","querytext":"Tradslag='Idegran'","label":"Idegran"},
    {"id":"Körsbär","querytext":"Tradslag like '%Körsbär%'","label":"Körsbär"},
    {"id":"Kastanj","querytext":"Tradslag like '%Kastanj'","label":"Kastanj"},
    {"id":"Lärk","querytext":"Tradslag like '%Lärk'","label":"Lärk"},
    {"id":"Lönn","querytext":"Tradslag like '%Lönn'","label":"Lönn"},
    {"id":"Lind","querytext":"Tradslag like '%Lind%'","label":"Lind"},
    {"id":"Oxel","querytext":"Tradslag like 'Oxel'","label":"Oxel"},
    {"id":"Päron","querytext":"Tradslag like 'Päron'","label":"Päron"}
];

function getTreetypeQueryText(treetypeSelection) {
    var queryText;
    $.each(trees, function(index, value) {
        if(trees[index].id == treetypeSelection){
            queryText = trees[index].querytext;
            return false;
        }
    });
    return queryText;
}


function getTrees(kommunSel= "All", tradslagSel = "All", stamomkretSel = 100) {
    var RegionQueryText = getRegionQueryText(kommunSel);
    var TreetypeQueryText = getTreetypeQueryText(tradslagSel);
    var circumferenceQueryText = getCircumferenceQueryText(stamomkretSel);

    // console.log("Stamomkret query param is " + stamomkretCond);
    var whereQuery;
    whereQuery = [
        circumferenceQueryText,
        RegionQueryText,
        TreetypeQueryText,
    ].join(" AND ");

    var defaults = lanstyrDefault();

    var success = getTreesSuccess;
    var error = GetTreesError;

    var data = defaults.data;
    data.where = whereQuery;
    data.returnGeometry = false;
    data.outSR = null;
    data.outFields = 'Tradslag';
    data.orderByFields = 'Tradslag';
    data.returnDistinctValues = true;
    
    makeAjaxCall(defaults.url, data, defaults.type, defaults.datatyp, defaults.async, success, error);
    // console.log(range.max);
}

var getTreesSuccess = function (response) { //getCircumferenceRangeSuccess;
    var trees =[{id : "All", label : "All"}];
    $.each(response.features, function(index, value){
      var obj = {id : value.attributes.Tradslag, label : value.attributes.Tradslag};
      trees.push(obj);
    });

    console.log(trees);
    createSelect("#tradslagSel", trees);

};
var GetTreesError = function (xhr) {
    console.log("there was an error" + xhr.statusText);
};

export {trees, getTreetypeQueryText, getTrees};

