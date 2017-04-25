// import '../node_modules/sidebar-v2/css/leaflet-sidebar.min.css';
// import '../node_modules/sidebar-v2/js/leaflet-sidebar.min.js';
// import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
// require.context("./GeoJson", true, /\.geojson$/);
// import 'bootstrap/dist/css/bootstrap.min.css';
// import getCircumferenceRange from '../../data/getCircumferenceRange.js';


// var topo = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFyaWdlcnIiLCJhIjoiY2l6NDgxeDluMDAxcjJ3cGozOW1tZnV0NCJ9.Eb2mDsjDBmza-uhme0TLSA', {
//     attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
//     '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
//     'Imagery © <a href="http://mapbox.com">Mapbox</a>',
//     id: 'mapbox.streets'
// });

// var satellite = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFyaWdlcnIiLCJhIjoiY2l6NDgxeDluMDAxcjJ3cGozOW1tZnV0NCJ9.Eb2mDsjDBmza-uhme0TLSA', {
//     attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
//     '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
//     'Imagery © <a href="http://mapbox.com">Mapbox</a>',
//     id: 'mapbox.satellite'
// });

// var baseLayers = {
//     "Topo": topo,
//     "Satellite": satellite
// };


// var map = L.map('map', { layers: [topo] });//, center: latlng, zoom: 13, zoomControl : false
// // L.control.zoom( {position : 'bottomright'} ).addTo(map);


// var sidebar = L.control.sidebar('sidebar', { position: 'right' }).addTo(map);

// $.getJSON("./GeoJson/Jönköping.geojson", function (data) {
//     success(data);
//     // geojsonLayer.addData(HaboTrees, {pointToLayer: pointToLayer, onEachFeature: onEachFeature});
//     // console.log(geojsonLayer._layers);
//     // map.fitBounds(geojsonLayer.getBounds());
// });

// function success(data) {
//     geojsonLayer = L.geoJSON(data, { pointToLayer: pointToLayer, onEachFeature: onEachFeature });
//     markers.addLayer(geojsonLayer);
//     map.addLayer(markers);
//     map.fitBounds(markers.getBounds());

//     // console.log(markers);
// }

// L.control.layers(baseLayers, {}, { position: 'topleft' }).addTo(map);

// function containerComponent () {
//     var element = document.createElement('div');
//     element.setAttribute("id", "container");
//     /* lodash is required for the next line to work */
//     //element.innerHTML = _.join(['Hello','webpack'], ' ');
//     return element;
// }

// function mapComponent () {
//     var element = document.createElement('div');
//     element.setAttribute("id", "map");
//     var element = $('<div>').attr('id', 'map');
//     return element;
// }
// // document.body.appendChild(containerComponent());
// containerComponent().appendTo('body');
// mapComponent().appendTo('#container');


// function updateMap(selection) {
//     var url = "./GeoJson/" + selection + ".geojson";
//     $.getJSON(url, function (data) {
//         var HaboTrees = data;

//         if (geojsonLayer) {
//             // console.log(geojsonLayer);
//             markers.removeLayer(geojsonLayer);
//             // geojsonLayer.remove();
//             geojsonLayer = {};

//         }
//         console.log("hi");

//         geojsonLayer = L.geoJSON(HaboTrees, { pointToLayer: pointToLayer, onEachFeature: onEachFeature });
//         markers.addLayer(geojsonLayer);
//         map.addLayer(markers);
//         // if (finishedLoading) {
//         map.fitBounds(markers.getBounds());
//         // }
//         // map.fitBounds(geojsonLayer.getBounds());

//     });
// }

// function filterMap(sizeFilter, kommun) {

//     var url = "./GeoJson/" + kommun + ".geojson";
//     $.getJSON(url, function (data) {
//         var currentTrees = data;
//         if (geojsonLayer) {
//             markers.removeLayer(geojsonLayer);
//             // geojsonLayer.remove();
//             geojsonLayer = {};
//         }
//         if (sizeFilter == 1) {
//             console.log("return all points");
//             geojsonLayer = L.geoJSON(currentTrees, { pointToLayer: pointToLayer, onEachFeature: onEachFeature });
//         } else {
//             geojsonLayer = L.geoJSON(currentTrees,
//                 {
//                     pointToLayer: pointToLayer,
//                     filter: function (feature, layer) {
//                         console.log(sizeFilter);
//                         if (sizeFilter == 5) {
//                             return feature.properties.Stamomkret < 1000;
//                         } else if (sizeFilter == 10) {
//                             return feature.properties.Stamomkret > 1000 && feature.properties.Stamomkret < 1500;
//                         } else if (sizeFilter == 15) {
//                             return feature.properties.Stamomkret > 1500;
//                         }
//                         // return feature.properties.Stamomkret ;
//                         // return feature.properties.Stamomkret > 1000
//                     },
//                     onEachFeature: onEachFeature
//                 }
//             );
//         }
//         console.log(geojsonLayer._layers);
//         if (!jQuery.isEmptyObject(geojsonLayer._layers)) {
//             console.log(geojsonLayer);
//             markers.addLayer(geojsonLayer);
//             map.addLayer(markers);
//             map.fitBounds(markers.getBounds());
//             sidebar.close();
//             // map.fitBounds(geojsonLayer.getBounds());    
//         } else {
//             console.log("no results");
//             $("#noResults").show();
//         }
//     });
// }

// function initRegionSel() {
//     var regions = ["All", "Aneby", "Eksjö", "Gislaved", "Gnosjö", "Habo", "Jönköping", "Mullsjö", "Nässjö", "Sävsjö", "Tranås", "Vaggeryd", "Vetlanda", "Värnamo"];
//     var sel = $("#kommunSel");
//     var fragment = document.createDocumentFragment();
//     $.each(regions, function (i) {
//         // console.log(response.features[i].properties.complaint_type);
//         var opt = document.createElement('option');
//         opt.innerHTML = regions[i];
//         opt.value = regions[i];
//         fragment.appendChild(opt);
//     });
//     sel.append(fragment);
// }

// function updateRegionSel() {
//     $.each(response.features, function (i) {
//         // console.log(response.features[i].properties.complaint_type);
//         var opt = document.createElement('option');
//         opt.innerHTML = response.features[i].properties.complaint_type;
//         opt.value = response.features[i].properties.complaint_type;
//         fragment.appendChild(opt);
//     });
//     sel.append(fragment);
// }

// function updateCircumferenceSel(range) {
//     console.log(range.max);

//     var circumArrRef =  range.max < 250 ? 2 :
//                         range.max >= 250 && range.max < 500 ? 3 :
//                         range.max >= 500 && range.max < 750 ? 4 :
//                         range.max >= 750 && range.max < 1000 ? 5 :
//                         range.max >= 1000 ? 6 :
//                         6;

//     var newCircumferences = circumference.slice(0,circumArrRef);
//     console.log(newCircumferences);
//     createSelect("#circumferenceSel", newCircumferences);

// }

  // $.each(trees, function(index, value){
    //     if(filterTreesStr.match(trees[index].matchWith)){
    //         finalFilteredTrees.push(trees[index]);    
    //     })
    // })
    // var trees =[{id : "All", label : "All"}];
    // createSelect("#tradslagSel", trees);
    //console.log(finalFilteredTrees);
    // var uniqueFilteredTrees = [{"id":"Alla","querytext":"Tradslag is not null","label":"Alla"}];
    // $.each(finalFilteredTrees, function(i, el){
    //     // console.log(el[i].id)
    //     if($.inArray(el[i].id, uniqueFilteredTrees.id) === -1) uniqueFilteredTrees.push(el);
    // });
    // finalFilteredTrees.sort( function( a, b){ return a.id - b.id; } );


    // var getTreesSuccess = function (response) { //getCircumferenceRangeSuccess;
//     var filteredTrees =[{id : "All", label : "All"}];
//     $.each(response.features, function(i, value){
//         // $.each(trees, function(j, value){
//             if(value.attributes.Tradslag.match(trees[index].matchWith)){

//         })
//         var obj = {id : value.attributes.Tradslag, label : value.attributes.Tradslag};
//         trees.push(obj);
//     });

//     console.log(trees);
//     createSelect("#tradslagSel", trees);

// };



// function getTreetypeQueryText(treetypeSelection) {
//     // console.log(treetypeSelection);
//     var queryText;
//     $.each(trees, function(index, value) {
//         if(trees[index].id == treetypeSelection){
//             queryText = trees[index].querytext;
//             return false;
//         }
//     });
//     // console.log(queryText)
//     return queryText;
// }