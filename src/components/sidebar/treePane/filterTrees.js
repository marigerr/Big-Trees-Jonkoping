import { removeLocationMarker } from 'Sidebar/locatePane/locate';
import getWhereCondition from 'Data/getWhereCond';
import lanstyrDefault from 'Data/lanstyrDefault';
import { addToLocalStorage } from 'Data/storeLocally';
import { getPointsSuccess } from 'Data/getPoints';
import makeAjaxCall from 'Data/makeAjaxCall';
import { buildTable, addRowClickHandler } from 'Sidebar/createTable';

function filterTrees(regionSel = 'Alla', circumferenceSel = 'Alla', treetypeSel = 'Alla', resultRecordCount = 1000) {
  removeLocationMarker();
  const whereQuery = getWhereCondition(regionSel, circumferenceSel, treetypeSel);
  const defaults = lanstyrDefault();
  const data = defaults.data;
  data.where = whereQuery;
  data.resultRecordCount = resultRecordCount;
  const async = true;
  const success = function (response) {
    if (regionSel == 'Alla' && circumferenceSel == 'Alla' && treetypeSel == 'Alla') {
      addToLocalStorage('top1000Jkpg', response);
    }
    getPointsSuccess(response);
    buildTable('.tree-table', response, true);
    addRowClickHandler();
  };
  const loadingScreen = true;
  makeAjaxCall(defaults.url, data, defaults.type, defaults.datatype, async, success, defaults.error, loadingScreen);
}

export { filterTrees };
