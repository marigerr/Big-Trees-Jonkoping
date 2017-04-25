// import makeAjaxCall from './makeAjaxCall.js';
// import lanstyrDefault from './lanstyrDefault.js';
// import {getStamomkretCond, getKommunCond, getTradslagCond} from './getCondition.js';
// import {updateCircumferenceSel} from '../components/selects/select.js';


// var range;

// export default function getCircumferenceRange(kommunSel, tradslagSel = "All", stamomkretSel = 100) {
//     var outStats = JSON.stringify([{
//         "statisticType": "min",
//         "onStatisticField": "Stamomkret",
//         "outStatisticFieldName": "minStamomkret"
//     },
//     {
//         "statisticType": "max",
//         "onStatisticField": "Stamomkret",
//         "outStatisticFieldName": "maxStamomkret"
//     }
//     ]);

//     var kommunCond = getKommunCond(kommunSel);
//     var tradslagCond = getTradslagCond(tradslagSel);
//     var stamomkretCond = getStamomkretCond(stamomkretSel);

//     // console.log("Stamomkret query param is " + stamomkretCond);
//     var whereQuery;
//     whereQuery = [
//         kommunCond,
//         tradslagCond,
//         stamomkretCond,
//     ].join(" AND ");

//     var defaults = lanstyrDefault();


//     var url = defaults.url;
//     var type = defaults.type;
//     var datatype = defaults.datatype;
//     var async = true;
//     var success = getCircumSuccess;
//     var error = GetCircumError;

//     var data = defaults.data;
//     data.where = whereQuery;
//     data.outStatistics = outStats;
//     // data.resultRecordCount = resultRecordCount;
//     data.returnGeometry = false;
//     data.outSR = null;
//     data.orderByFields = null;
    
//     makeAjaxCall(url, data, type, datatype, async, success, error);
//     // console.log(range.max);
// }

// var getCircumSuccess = function (response) { //getCircumferenceRangeSuccess;
//     range = {min: response.features[0].attributes.minStamomkret, max :response.features[0].attributes.maxStamomkret};
//     // console.log(range.max);
//     updateCircumferenceSel(range);
//     // console.log("minStamomkret " + response.features[0].attributes.minStamomkret);
//     // console.log("maxStamomkret " + response.features[0].attributes.maxStamomkret);
// };
// var GetCircumError = function (xhr) {
//     console.log("there was an error" + xhr.statusText);
// };