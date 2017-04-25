import $ from 'jquery';
import makeAjaxCall from '../makeAjaxCall.js';
import lanstyrDefault from '../lanstyrDefault.js';
// import {getStamomkretCond, getKommunCond, getTradslagCond} from './getCondition.js';
import {updateCircumferenceSel} from '../../components/selects/select.js';
import {getRegionQueryText} from './region.js';


var circumference = [
        {range: "Stamomkret > 0 ", querytext: "Stamomkret > 0", pointsize: null, id: "all", label: "All"},
        {range: "Stamomkret > 0 && Stamomkret < 250" , querytext: "Stamomkret BETWEEN 0 AND 250", pointsize: 3, id: "1", label: "Under 250 cm"},
        {range: "Stamomkret >= 250 && Stamomkret < 500", querytext: "Stamomkret BETWEEN 251 AND 500", pointsize: 5, id: "2", label: "250-500 cm"},
        {range: "Stamomkret >= 500 && Stamomkret < 750" , querytext: "Stamomkret BETWEEN 501 AND 750", pointsize: 7, id: "5", label: "500-750"},
        {range: "Stamomkret >= 750 && Stamomkret < 1000", querytext: "Stamomkret BETWEEN 751 AND 1000", pointsize: 10, id: "7", label: "750-1000"},
        {range: "Stamomkret > 1000", querytext: "Stamomkret > 1000", pointsize: 10, id: '10', label: "Over 1000 cm"},
    ];

// TO DO --> look into if ok to use Eval() in this circumstance
function getPointSize(Stamomkret){
    /* jshint ignore:start */
    return  eval(Circumference[1].range) ? Circumference[1].pointsize :
            eval(Circumference[2].range) ? Circumference[2].pointsize :
            eval(Circumference[3].range) ? Circumference[3].pointsize :
            eval(Circumference[4].range) ? Circumference[4].pointsize :
            3;  
    /* jshint ignore:end */             
}

function getCircumferenceQueryText(circumferenceSelection) {
    // console.log("Stamomkret input is " + stamomkretSel);
    return circumferenceSelection == circumference[0].id ? circumference[0].querytext :
           circumferenceSelection == circumference[1].id ? circumference[1].querytext :
           circumferenceSelection == circumference[2].id ? circumference[2].querytext :
           circumferenceSelection == circumference[3].id ? circumference[3].querytext :
           circumferenceSelection == circumference[4].id ? circumference[4].querytext :
           circumferenceSelection == circumference[5].id ? circumference[5].querytext :
           "Stamomkret > 0";
}

function getCircumferenceRange(kommunSel, tradslagSel = "All", stamomkretSel = 100) {
    var outStats = JSON.stringify([{
        "statisticType": "min",
        "onStatisticField": "Stamomkret",
        "outStatisticFieldName": "minStamomkret"
    },
    {
        "statisticType": "max",
        "onStatisticField": "Stamomkret",
        "outStatisticFieldName": "maxStamomkret"
    }
    ]);

    var circumferenceQueryText = getCircumferenceQueryText(stamomkretSel);
    // var tradslagCond = getTradslagCond(tradslagSel);
    var regionQueryText = getRegionQueryText(kommunSel);

    // console.log("Stamomkret query param is " + stamomkretCond);
    var whereQuery;
    whereQuery = [
        circumferenceQueryText,
        regionQueryText
        // tradslagCond,
        // stamomkretCond,
    ].join(" AND ");

    var defaults = lanstyrDefault();

    var success = getCircumSuccess;
    var error = GetCircumError;

    var data = defaults.data;
    data.where = whereQuery;
    data.outStatistics = outStats;
    // data.resultRecordCount = resultRecordCount;
    data.returnGeometry = false;
    data.outSR = null;
    data.orderByFields = null;
    
    makeAjaxCall(defaults.url, data, defaults.type, defaults.datatyp, defaults.async, success, error);
    // console.log(range.max);
}

var getCircumSuccess = function (response) { //getCircumferenceRangeSuccess;
    var range = {min: response.features[0].attributes.minStamomkret, max :response.features[0].attributes.maxStamomkret};
    // console.log(range.max);
    updateCircumferenceSel(range);
    // console.log("minStamomkret " + response.features[0].attributes.minStamomkret);
    // console.log("maxStamomkret " + response.features[0].attributes.maxStamomkret);
};
var GetCircumError = function (xhr) {
    console.log("there was an error" + xhr.statusText);
};

export {circumference, getCircumferenceQueryText, getCircumferenceRange};

