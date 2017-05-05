//import $ from 'jquery';
import getWhereCondition from 'Data/getWhereCond.js';
import makeAjaxCall from 'Data/makeAjaxCall.js';
import lanstyrDefault from 'Data/lanstyrDefault.js';
import {createSelect} from 'Components/selects/select.js';
import {updateLegend} from 'Components/map/map.js';

function trees() { 
        return [{"matchWith" : /XXXXX/i,"id":"Alla","querytext":"Tradslag is not null","label":"Alla"},
                {"matchWith" : /al$/i,"id":"Al","querytext":"Tradslag like '%Al'","label":"Al"},
                {"matchWith" : /alm/i,"id":"Alm","querytext":"Tradslag like '%Alm%'","label":"Alm"},
                {"matchWith" : /ask/i,"id":"Ask","querytext":"Tradslag like '%Ask%'","label":"Ask"},
                {"matchWith" : /^asp/i,"id":"Asp","querytext":"Tradslag = 'Asp'","label":"Asp"},
                {"matchWith" : /apel|äpple|malus/i,"id":"Äpple","querytext":"(Tradslag like '%Apel%' OR Tradslag like '%Äpple% OR Tradslag like '%malus%')","label":"Äpple"},
                {"matchWith" : /avenbok/i,"id":"Avenbok","querytext":"Tradslag like '%Avenbok%'","label":"Avenbok"},
                {"matchWith" : /björk/i,"id":"Björk","querytext":"Tradslag like '%Björk%'","label":"Björk"},
                {"matchWith" : /^bok|blodbok/i,"id":"Bok","querytext":"(Tradslag='Bok' OR Tradslag='Blodbok')","label":"Bok"},
                {"matchWith" : /ek/i,"id":"Ek","querytext":"Tradslag like '%Ek%'","label":"Ek"},
                {"matchWith" : /en$/i,"id":"En","querytext":"(Tradslag='En' OR Tradslag='Kungsen')","label":"En"},
                {"matchWith" : /^(gran)|(ädelgran)/i,"id":"Gran","querytext":"(Tradslag='Gran' OR Tradslag='Ädelgran')","label":"Gran"},
                {"matchWith" : /hassel/i,"id":"Hassel","querytext":"Tradslag like '%Hassel%'","label":"Hassel"},
                {"matchWith" : /hagtorn/i,"id":"Hagtorn","querytext":"Tradslag like '%Hagtorn%'","label":"Hagtorn"},
                {"matchWith" : /idegran/i,"id":"Idegran","querytext":"Tradslag='Idegran'","label":"Idegran"},
                {"matchWith" : /körsbär|hägg|fågelbär/i,"id":"Körsbär","querytext":"(Tradslag like '%Körsbär%'OR Tradslag='Hägg' OR Tradslag='Fågelbär')","label":"Körsbär"},
                {"matchWith" : /kastanj/i,"id":"Kastanj","querytext":"Tradslag like '%Kastanj'","label":"Kastanj"},
                {"matchWith" : /lärk/i,"id":"Lärk","querytext":"Tradslag like '%Lärk'","label":"Lärk"},
                {"matchWith" : /lönn/i,"id":"Lönn","querytext":"Tradslag like '%Lönn'","label":"Lönn"},
                {"matchWith" : /lind/i,"id":"Lind","querytext":"Tradslag like '%Lind%'","label":"Lind"},
                {"matchWith" : /oxel/i,"id":"Oxel","querytext":"Tradslag like 'Oxel'","label":"Oxel"},
                {"matchWith" : /päron/i,"id":"Päron","querytext":"Tradslag like 'Päron'","label":"Päron"},
                {"matchWith" : /pil|salix|jolster|sälg|vide/i,"id":"Pil",
                    "querytext":"(Tradslag like '%Pil%' OR Tradslag like '%Salix%' OR Tradslag = 'Jolster' OR Tradslag = 'Sälg' OR Tradslag = 'Vide')",
                    "label":"Pil"},
                {"matchWith" : /poppel|populus/i, "id":"Poppel","querytext":"(Tradslag like '%Poppel' OR Tradslag = 'Populus sp')","label":"Poppel"},
                {"matchWith" : /rönn/i, "id":"Rönn","querytext":"Tradslag = 'Rönn'","label":"Rönn"},
                {"matchWith" : /tall/i, "id":"Tall","querytext":"Tradslag like '%Tall'","label":"Tall"},
                {"matchWith" : /annat|övrig|obestämd|okänt/i, "id":"Annat",
                "querytext":"(Tradslag like 'Övrig%' OR Tradslag = 'Annat' OR Tradslag = 'Obestämd' OR Tradslag = 'Okänt')",
                "label":"Annat/Obestämd"}
                ];        
}

function getTreetypeQueryText(treetypeSelection) {
    var treeArray = trees();
    var queryText;
    $.each(treeArray, function(index, value) {
        if(treeArray[index].id == treetypeSelection){
            queryText = "(" + treeArray[index].querytext + ")";
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
    finalFilteredTrees.unshift({"matchWith" : /XXXXX/i,"id":"Alla","querytext":"Tradslag is not null","label":"Alla"});    

    return finalFilteredTrees;
}


export {trees, getTreetypeQueryText, getTrees, removeDuplicateTrees};

