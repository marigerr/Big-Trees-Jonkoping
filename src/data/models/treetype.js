//import $ from 'jquery';
import getWhereCondition from 'Data/getWhereCond.js';
import makeAjaxCall from 'Data/makeAjaxCall.js';
import lanstyrDefault from 'Data/lanstyrDefault.js';
import {createSelect} from 'Components/selects/select.js';
import {updateLegend} from 'Components/map/map.js';

var trees = [
    {"matchWith" : /really hard/gi,"id":"Alla","querytext":"Tradslag is not null","label":"Alla"},
    {"matchWith" : /al$/gi,"id":"Al","querytext":"Tradslag like '%Al'","label":"Al"},
    {"matchWith" : /alm/gi,"id":"Alm","querytext":"Tradslag like '%Alm%'","label":"Alm"},
    {"matchWith" : /ask/gi,"id":"Ask","querytext":"Tradslag like '%Ask%'","label":"Ask"},
    {"matchWith" : /asp/gi,"id":"Asp","querytext":"Tradslag = 'Asp'","label":"Asp"},
    {"matchWith" : /apel/gi,"id":"Äpple","querytext":"(Tradslag like '%Apel%' OR Tradslag like '%Äpple%'","label":"Äpple"},
    {"matchWith" : /avenbok/gi,"id":"Avenbok","querytext":"Tradslag like '%Avenbok%'","label":"Avenbok"},
    {"matchWith" : /björk/gi,"id":"Björk","querytext":"Tradslag like '%Björk%'","label":"Björk"},
    {"matchWith" : /bok/gi,"id":"Bok","querytext":"Tradslag like '%Bok%'","label":"Bok"},
    {"matchWith" : /ek/gi,"id":"Ek","querytext":"Tradslag like '%Ek%'","label":"Ek"},
    {"matchWith" : /en/gi,"id":"En","querytext":"Tradslag='En' OR Tradslag='Kungsen'","label":"En"},
    {"matchWith" : /gran/gi,"id":"Gran","querytext":"Tradslag like '%Gran%'","label":"Gran"},
    {"matchWith" : /hassel/gi,"id":"Hassel","querytext":"Tradslag like '%Hassel%'","label":"Hassel"},
    {"matchWith" : /hagtorn/gi,"id":"Hagtorn","querytext":"Tradslag like '%Hagtorn%'","label":"Hagtorn"},
    {"matchWith" : /idegran/gi,"id":"Idegran","querytext":"Tradslag='Idegran'","label":"Idegran"},
    {"matchWith" : /körsbär/gi,"id":"Körsbär","querytext":"Tradslag like '%Körsbär%'OR Tradslag='Hägg' OR Tradslag='Fågelbär'","label":"Körsbär"},
    {"matchWith" : /kastanj/gi,"id":"Kastanj","querytext":"Tradslag like '%Kastanj'","label":"Kastanj"},
    {"matchWith" : /lärk/gi,"id":"Lärk","querytext":"Tradslag like '%Lärk'","label":"Lärk"},
    {"matchWith" : /lönn/gi,"id":"Lönn","querytext":"Tradslag like '%Lönn'","label":"Lönn"},
    {"matchWith" : /lind/gi,"id":"Lind","querytext":"Tradslag like '%Lind%'","label":"Lind"},
    {"matchWith" : /oxel/gi,"id":"Oxel","querytext":"Tradslag like 'Oxel'","label":"Oxel"},
    {"matchWith" : /päron/gi,"id":"Päron","querytext":"Tradslag like 'Päron'","label":"Päron"},
    {"matchWith" : /pil/gi,"id":"Pil",
        "querytext":"Tradslag like '%Pil%' OR Tradslag like '%Salix%' OR Tradslag = 'Jolster' OR Tradslag = 'Sälg' OR Tradslag = 'Vide'",
        "label":"Pil"},
    {"matchWith" : /poppel/gi, "id":"Poppel","querytext":"Tradslag like '%Poppel' OR Tradslag = 'Populus sp'","label":"Poppel"},
    {"matchWith" : /rönn/gi, "id":"Rönn","querytext":"Tradslag = 'Rönn'","label":"Rönn"},
    {"matchWith" : /tall/gi, "id":"Tall","querytext":"Tradslag like '%Tall'","label":"Tall"},
    {"matchWith" : /annat/gi, "id":"Annat",
    "querytext":"Tradslag like 'Övrig%' OR Tradslag = 'Annat' OR Tradslag = 'Obestämd' OR Tradslag = 'Okänt'",
    "label":"Annat/Obestämd"}
];

function getTreetypeQueryText(treetypeSelection) {
    var queryText;
    $.each(trees, function(index, value) {
        if(trees[index].id == treetypeSelection){
            queryText = "(" + trees[index].querytext + ")";
            return false;
        }
    });
    return queryText;
}


function getTrees(regionSel= "Alla",  circumferenceSel = 100, treetypeSel = "Alla") {

    var whereQuery = getWhereCondition(regionSel, circumferenceSel, treetypeSel);
    var defaults = lanstyrDefault();
    var success = getTreesSuccess;
    var data = defaults.data;
    data.where = whereQuery;
    data.returnGeometry = false;
    data.outSR = null;
    data.outFields = 'Tradslag';
    data.orderByFields = 'Tradslag';
    data.returnDistinctValues = true;
    
    makeAjaxCall(defaults.url, data, defaults.type, defaults.datatyp, defaults.async, success, defaults.error);
}

function getTreesSuccess(response) { //getCircumferenceRangeSuccess;
    var filteredTrees =[];
    
    $.each(response.features, function(index, value){
        filteredTrees.push(value.attributes.Tradslag);
    });

    var finalFilteredTrees;
    finalFilteredTrees = removeDuplicateTrees(filteredTrees);

    createSelect(".treetype-select", finalFilteredTrees);
    // updateLegend(finalFilteredTrees);
}

function removeDuplicateTrees(treeArray){
    var finalFilteredTrees = [];
    var i, j;
    for (i = 0; i < treeArray.length; i++) {       
        for (j = 0; j < trees.length; j++) {          
            // if(trees[j].matchWith.test(treeArray[i])){
            if(treeArray[i].match(trees[j].matchWith)){
                finalFilteredTrees.push(trees[j]);
                break;    
            }    
        }        
    }   
    finalFilteredTrees.sort(function(a,b) {return (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0);} ); 
    
    // delete all duplicates from the array
    for( i=0; i<finalFilteredTrees.length-1; i++ ) {
        if ( finalFilteredTrees[i].id == finalFilteredTrees[i+1].id ) {
            finalFilteredTrees.splice(i, 1);
            i--;
        }
    }
    finalFilteredTrees.unshift({"matchWith" : /really hard/gi,"id":"Alla","querytext":"Tradslag is not null","label":"Alla"});    

    return finalFilteredTrees;
}


export {trees, getTreetypeQueryText, getTrees, removeDuplicateTrees};

