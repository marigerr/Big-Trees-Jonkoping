import lanstyrDefault from 'Data/lanstyrDefault';
import { sidebar, updateGeojsonLayer, updateLegend } from 'Map/map';
import makeAjaxCall from 'Data/makeAjaxCall';
import convertToGeoJson from 'Data/convertToGeoJson';
import { removeDuplicateTrees } from 'Data/models/treetype';
import { addToLocalStorage } from 'Data/storeLocally';
import { isMobile } from '../app';

let hitsCounter = 1000;
let geojson;

function getPointsSuccess(response, mapViewPoint, zoom, keepZoomLevel) {
  hitsCounter = response.features.length;
  console.log(hitsCounter);

  if (response.features.length == 1000) {
    $('.results').html('Visar första 1000 resultat. Klicka på <br>på raden för att zooma in till träd');
    $('.results').show();
  } else {
    $('.results').html('Klicka på raden för att zooma in');
    $('.results').show();
  }
  const result = convertToGeoJson(response.features);
  geojson = result.geojson;

  const treelist = result.trees;
  const noDupesTreeList = removeDuplicateTrees(treelist);
  // noDupesTreeList.sort(function(a,b) {return a.family.localeCompare(b.family);} );
  noDupesTreeList.sort((a, b) => ((a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0)));
  updateLegend(noDupesTreeList);

  updateGeojsonLayer(geojson, mapViewPoint, zoom, keepZoomLevel);
  // console.log(isMobile);
  if (isMobile) {
    sidebar.close();
  }
}

function getTreeCount() {
  const whereQuery = 'Kommun is not null';
  const defaults = lanstyrDefault();
  const data = defaults.data;
  data.where = whereQuery;
  const async = true;
  data.returnGeometry = false;
  data.outSR = null;
  data.orderByFields = null;
  data.returnCountOnly = true;
  const success = function (response) {
    addToLocalStorage('JkpgLanTreeCount', response.count);
    $('#loader').hide();
  };
  makeAjaxCall(defaults.url, data, defaults.type, defaults.datatype, async, success, defaults.error);
}


export { getPointsSuccess, getTreeCount };
