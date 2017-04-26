import $ from 'jquery';
import {getCircumferenceQueryText} from './models/circumference.js';
import {getRegionQueryText} from './models/region.js';
import {getTreetypeQueryText} from './models/treetype.js';


export default function getWhereCondition(regionSel, circumferenceSel = "Alla", treetypeSel = "Alla"){
    // var kommunCond = getKommunCond(regionSel);
    var kommunCond = getRegionQueryText(regionSel);
    var stamomkretCond = getCircumferenceQueryText(circumferenceSel);
    var tradslagCond = getTreetypeQueryText(treetypeSel);
    // console.log(kommunCond);
    // console.log(tradslagCond);
    // console.log(stamomkretCond);

    // console.log("Stamomkret query param is " + stamomkretCond);
    var whereQuery;
    whereQuery = [
        kommunCond,
        tradslagCond,
        stamomkretCond,
    ].join(" AND ");
    return whereQuery;
    // console.log(whereQuery);
}    