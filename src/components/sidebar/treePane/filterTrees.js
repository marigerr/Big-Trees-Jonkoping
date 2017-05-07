//move getPoints here.   verify what depends on it.   looks like only init map
// then in select listener refer to getpoints and then build table inside the success function that also include getpointssuccess
import { removeLocationMarker } from 'Sidebar/locatePane/locate.js';
import getWhereCondition from 'Data/getWhereCond.js';
import lanstyrDefault from 'Data/lanstyrDefault.js';
import { localStorageKeyExists, addToLocalStorage, getFromLocalStorage, storageAvailable } from 'Data/storeLocally.js';
import { getPointsSuccess } from 'Data/getPoints.js';
import makeAjaxCall from 'Data/makeAjaxCall.js';

function filterTrees(regionSel = "Alla", circumferenceSel = "Alla", treetypeSel = "Alla", resultRecordCount = 1000) {
    removeLocationMarker();
    var whereQuery = getWhereCondition(regionSel, circumferenceSel, treetypeSel);
    var defaults = lanstyrDefault();
    var data = defaults.data;
    data.where = whereQuery;
    data.resultRecordCount = resultRecordCount;
    var async = true;
    var success = function (response) {
        if (regionSel == "Alla" && circumferenceSel == "Alla" && treetypeSel == "Alla") {
            addToLocalStorage("top1000Jkpg", response);
        }
        getPointsSuccess(response);
    };
    makeAjaxCall(defaults.url, data, defaults.type, defaults.datatype, async, success, defaults.error);
}

export {filterTrees};