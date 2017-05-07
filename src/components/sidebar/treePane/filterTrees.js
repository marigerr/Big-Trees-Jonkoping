import { removeLocationMarker } from 'Sidebar/locatePane/locate.js';
import getWhereCondition from 'Data/getWhereCond.js';
import lanstyrDefault from 'Data/lanstyrDefault.js';
import { localStorageKeyExists, addToLocalStorage, getFromLocalStorage, storageAvailable } from 'Data/storeLocally.js';
import { getPointsSuccess } from 'Data/getPoints.js';
import makeAjaxCall from 'Data/makeAjaxCall.js';
import { buildTable } from 'Sidebar/createTable.js';

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
        buildTable(".tree-table", response);
    };
    makeAjaxCall(defaults.url, data, defaults.type, defaults.datatype, async, success, defaults.error);
}

export { filterTrees };