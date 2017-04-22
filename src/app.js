import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import '../node_modules/sidebar-v2/css/leaflet-sidebar.min.css';
import styles from './stylesheets/app.css';

import $ from 'jquery';
// import 'bootstrap/dist/css/bootstrap.min.css';
import 'leaflet';
import 'leaflet.markercluster';
import '../node_modules/sidebar-v2/js/leaflet-sidebar.min.js';
import getColor from './getColor';
// require.context("./GeoJson", true, /\.geojson$/);

var topo = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFyaWdlcnIiLCJhIjoiY2l6NDgxeDluMDAxcjJ3cGozOW1tZnV0NCJ9.Eb2mDsjDBmza-uhme0TLSA', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
    '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    'Imagery © <a href="http://mapbox.com">Mapbox</a>',
    id: 'mapbox.streets'
});

var satellite = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFyaWdlcnIiLCJhIjoiY2l6NDgxeDluMDAxcjJ3cGozOW1tZnV0NCJ9.Eb2mDsjDBmza-uhme0TLSA', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
    '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    'Imagery © <a href="http://mapbox.com">Mapbox</a>',
    id: 'mapbox.satellite'
});

var baseLayers = {
    "Topo": topo,
    "Satellite": satellite
};

// var latlng = L.latLng(57.90930939999999,14.074366499999996);

var map = L.map('map', { layers: [topo] });//, center: latlng, zoom: 13, zoomControl : false
// L.control.zoom( {position : 'bottomright'} ).addTo(map);
var sidebar = L.control.sidebar('sidebar', { position: 'right' }).addTo(map);

var geojsonLayer;

var markers = L.markerClusterGroup({ showCoverageOnHover: false, maxClusterRadius: 80, disableClusteringAtZoom: 15, spiderfyOnMaxZoom: false }); //, chunkedLoading: true, chunkProgress :checkProgress
// var currentData;

var stamomkretSel = "100";
var tradslagSel = "All";
var kommunSel = "";

// getStamomkretRange(kommunSel, tradslagSel);

getPoints(kommunSel, tradslagSel, stamomkretSel);

// $.getJSON("./GeoJson/Jönköping.geojson", function (data) {
//     success(data);
//     // geojsonLayer.addData(HaboTrees, {pointToLayer: pointToLayer, onEachFeature: onEachFeature});
//     // console.log(geojsonLayer._layers);
//     // map.fitBounds(geojsonLayer.getBounds());
// });

function success(data) {
    geojsonLayer = L.geoJSON(data, { pointToLayer: pointToLayer, onEachFeature: onEachFeature });
    markers.addLayer(geojsonLayer);
    map.addLayer(markers);
    map.fitBounds(markers.getBounds());

    // console.log(markers);
}

L.control.layers(baseLayers, {}, { position: 'topleft' }).addTo(map);

$("#kommunSel").change(function (e) {
    updateSelects(e.target.value, 'kommun');
    $("#results").hide();
    
    //   alert( $("#complaintDD option:selected"));
    //   console.log(e.target.value);
    // $("#circumferenceSel").val(1);
    // $("#circumferenceSel option:selected")
    // updateMap(e.target.value);
    // sidebar.close();
    // getPoints(e.target.value);
});

$("#circumferenceSel").change(function (e) {
    $("#results").hide();
    updateSelects(e.target.value, 'stamomkret');
    //   alert( $("#complaintDD option:selected"));
    // console.log(e.target.value);
    // filterMap(e.target.value, $('#kommunSel').find(":selected").text());
});

$("#tradslagSel").change(function (e) {
    $("#results").hide();
    updateSelects(e.target.value, 'stamomkret');
    //   alert( $("#complaintDD option:selected"));
    // console.log(e.target.value);
    // filterMap(e.target.value, $('#kommunSel').find(":selected").text());
});

function updateSelects(selection, whichSel) {
    
}

$("#findTreesBtn").click(function () {
    var stamomkretSel = $("#circumferenceSel").val();
    var kommunSel = $("#kommunSel").val();
    var tradslagSel = $("#tradslagSel").val();
    getPoints(kommunSel, tradslagSel, stamomkretSel);
});

$("#locateBtn").click(function (e) {
    //   alert( $("#complaintDD option:selected"));
    // $("#noResults").hide();
    // console.log(e.target.value);
    // filterMap(e.target.value, $('#kommunSel').find(":selected").text());
    // findLocationWithNavigator();
    findLocationWithGoogleGeolocation();
});

function pointToLayer(feature, latlng) {
    var radius;
    var x = feature.properties.Stamomkret;
    switch (true) {
        case (x < 1000):
            // console.log("less than six hundred");
            radius = 5;
            break;
        case (x >= 1000 && x < 1500):
            // alert("between 5 and 8");
            radius = 10;
            break;
        case (x >= 1500):
            // alert("between 9 and 11");
            radius = 15;
            break;
        default:
            console.log("error with radius");
            break;
    }
    return new L.CircleMarker(latlng, {
        radius: radius,
        // fillColor: colors[feature.properties.Tradslag],
        fillColor: getColor(feature.properties.Tradslag),
        color: getColor(feature.properties.Tradslag),
        weight: 1,
        opacity: 1,
        fillOpacity: 1,
        clickable: true
    });
}

function getStamomkretRange(kommunSel, tradslagSel) {
    var outStats = JSON.stringify([
        {
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

    var url = "http://ext-planeringsunderlag.lansstyrelsen.se/arcgis/rest/services/vektor/LSTF_webbgis_planeringsunderlag/MapServer/58/query";
    var data = {
        // where: whereQuery,
        // outFields: "OBJECTID, obj_idnr, OBJECTID_1, geodb_oid, Rev_datum, Kommun,Lokalnamn,Tradslag,Stamomkret,Tradstatus",
        geometryType: "esriGeometryEnvelope",
        spatialRel: "esriSpatialRelIntersects",
        outStatistics: outStats,
        returnGeometry: false,
        returnTrueCurves: false,
        returnIdsOnly: false,
        returnCountOnly: false,
        returnZ: false,
        returnM: false,
        returnDistinctValues: false,
        // outSR: 4326,
        f: "pjson"
    };
    var type = "GET";
    var datatype = "json";
    var success = function(response) { //getCircumferenceRangeSuccess;
        console.log("minStamomkret " + response.features[0].attributes.minStamomkret);
        console.log("maxStamomkret " + response.features[0].attributes.maxStamomkret);
    };
    var error = function (xhr) {
        console.log("there was an error" + xhr.statusText);
    };
    makeAjaxCall(url, data, type, datatype, success, error);
}



function getPoints(kommunSel, tradslagSel = "Ek", stamomkretSel = 100) {
    var kommunCond = getKommunCond(kommunSel);
    var tradslagCond = getTradslagCond(tradslagSel);
    var stamomkretCond = getStamomkretCond(stamomkretSel);

    console.log("Stamomkret query param is " + stamomkretCond);
    var whereQuery;
    whereQuery = [
        kommunCond,
        tradslagCond,
        stamomkretCond,
    ].join(" AND ");


    var url = "http://ext-planeringsunderlag.lansstyrelsen.se/arcgis/rest/services/vektor/LSTF_webbgis_planeringsunderlag/MapServer/58/query";
    var data = {
        where: whereQuery,
        outFields: "OBJECTID, obj_idnr, OBJECTID_1, geodb_oid, Rev_datum, Kommun,Lokalnamn,Tradslag,Stamomkret,Tradstatus",
        geometryType: "esriGeometryEnvelope",
        spatialRel: "esriSpatialRelIntersects",
        returnGeometry: true,
        returnTrueCurves: false,
        returnIdsOnly: false,
        returnCountOnly: false,
        returnZ: false,
        returnM: false,
        returnDistinctValues: false,
        orderByFields: "Stamomkret DESC",
        outSR: 4326,
        f: "pjson"
    };
    var type = "GET";
    var datatype = "json";
    var success = getPointsSuccess;
    var error = function (xhr) {
        console.log("there was an error" + xhr.statusText);
    };
    makeAjaxCall(url, data, type, datatype, success, error);
}

function getPointsSuccess(response) {
    // console.log("getPoints Response =" + response.spatialReference.wkid);
    console.log("# of points=" + response.features.length);
    if (response.features.length > 999) {
        $('#results').html("Too many result, only showing first 1000  <br/>Try narrowing query");
        $("#results").show();
        console.log("over 1000 hits");
    } 
    // else {
        var geojson = convertToGeoJson(response.features);
        console.log(geojson);
        if (geojsonLayer) {
            markers.removeLayer(geojsonLayer);
            geojsonLayer = {};
        }
        geojsonLayer = L.geoJSON(geojson, { pointToLayer: pointToLayer, onEachFeature: onEachFeature });
        markers.addLayer(geojsonLayer);
        map.addLayer(markers);
        map.fitBounds(markers.getBounds());
        // var lat = response.location.lat;
        // var lng = response.location.lng;
        // console.log("Accuracy: " + response.accuracy + " meters");

        // map.setView(L.latLng(lat, lng), 14);
        // var userLocation = "latlng=" + lat + "," + lng;
        // // latlng=40.714224,-73.961452
        // determineRegion(userLocation);
        // sidebar.close();
    // }
}

function getStamomkretCond(stamomkretSel) {
    console.log("Stamomkret input is " + stamomkretSel);
    return stamomkretSel == "100" ? "Stamomkret > 0" :
        stamomkretSel == "1" ? "Stamomkret BETWEEN 0 AND 250" :
        stamomkretSel == "2" ? "Stamomkret BETWEEN 251 AND 500" :
            stamomkretSel == "5" ? "Stamomkret BETWEEN 501 AND 750" :
                stamomkretSel == "7" ? "Stamomkret BETWEEN 751 AND 1000" :
                    stamomkretSel == "10" ? "Stamomkret > 1000" :
                        "Stamomkret > 0";
}

function getKommunCond(kommunSel) {
    return kommunSel ? "Kommun='" + kommunSel + "'" : "Kommun IS NOT NULL";
}

function getTradslagCond(tradslagSel) {
    return tradslagSel == "Alm"     ? "Tradslag like '%Alm%'" :
           tradslagSel == "Al"      ? "Tradslag like '%Al%'" :
           tradslagSel == "Ask"      ? "Tradslag like '%Ask%'" :
           tradslagSel == "Äpple" ? "(Tradslag like '%Apel%' OR Tradslag like '%Äpple%')" :
           tradslagSel == "Avenbok" ? "Tradslag like '%Avenbok%'" :
           tradslagSel == "Björk"   ? "Tradslag like '%Björk%'" :
           tradslagSel == "Bok"     ? "Tradslag like '%Bok%'" :
           tradslagSel == "Ek"      ? "Tradslag like '%Ek%'" :
           tradslagSel == "En" ? "Tradslag='En' OR Tradslag='Kungsen" :
           tradslagSel == "Gran"  ? "Tradslag like '%Gran%'" :
           tradslagSel == "Hassel"  ? "Tradslag like '%Hassel%'" :
           tradslagSel == "Hagtorn"  ? "Tradslag like '%Hagtorn%'" :
           tradslagSel == "Idegran" ? "Tradslag='Idegran'" :
           tradslagSel == "Körsbär" ? "Tradslag like '%Körsbär%'" :
           tradslagSel == "Kastanj" ? "Tradslag like '%Kastanj'" :
           tradslagSel == "Lärk" ? "Tradslag like '%Lärk'" :
           tradslagSel == "Lönn" ? "Tradslag like '%Lönn'" :
           tradslagSel == "Lind" ? "Tradslag like '%Lind%'" :
           tradslagSel == "Oxel" ? "Tradslag like 'Oxel'" :
           tradslagSel == "Päron" ? "Tradslag like 'Päron'" :
        //    tradslagSel == "Avenbok" ? "Tradslag like '%Avenbok%'" :
        //    tradslagSel == "Avenbok" ? "Tradslag like '%Avenbok%'" :
            "Tradslag IS NOT NULL";
}

function convertToGeoJson(features) {

    var newGeoJson = {
        "type": "FeatureCollection",
        "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
        "features": []
    };
    for (var index = 0; index < features.length; index++) {
        var newFeature = { "type": "Feature", "properties": { "Id": features[index].attributes.OBJECTID_1, "Kommun": features[index].attributes.Kommun, "Lokalnamn": features[index].attributes.Lokalnamn, "Tradslag": features[index].attributes.Tradslag, "Stamomkret": features[index].attributes.Stamomkret, "Tradstatus": features[index].attributes.Tradstatus }, "geometry": { "type": "Point", "coordinates": [features[index].geometry.x, features[index].geometry.y] } };

        newGeoJson.features.push(newFeature);

    }
    return newGeoJson;

}

function updateMap(selection) {
    var url = "./GeoJson/" + selection + ".geojson";
    $.getJSON(url, function (data) {
        var HaboTrees = data;

        /* Rest of the code with uses the "ajavascriptjsonvariable" variable */
        if (geojsonLayer) {
            // console.log(geojsonLayer);
            markers.removeLayer(geojsonLayer);
            // geojsonLayer.remove();
            geojsonLayer = {};

        }
        console.log("hi");

        geojsonLayer = L.geoJSON(HaboTrees, { pointToLayer: pointToLayer, onEachFeature: onEachFeature });
        markers.addLayer(geojsonLayer);
        map.addLayer(markers);
        // if (finishedLoading) {
        map.fitBounds(markers.getBounds());
        // }
        // map.fitBounds(geojsonLayer.getBounds());

    });
}

function filterMap(sizeFilter, kommun) {

    var url = "./GeoJson/" + kommun + ".geojson";
    $.getJSON(url, function (data) {
        var currentTrees = data;
        if (geojsonLayer) {
            markers.removeLayer(geojsonLayer);
            // geojsonLayer.remove();
            geojsonLayer = {};
        }
        if (sizeFilter == 1) {
            console.log("return all points");
            geojsonLayer = L.geoJSON(currentTrees, { pointToLayer: pointToLayer, onEachFeature: onEachFeature });
        } else {
            geojsonLayer = L.geoJSON(currentTrees,
                {
                    pointToLayer: pointToLayer,
                    filter: function (feature, layer) {
                        console.log(sizeFilter);
                        if (sizeFilter == 5) {
                            return feature.properties.Stamomkret < 1000;
                        } else if (sizeFilter == 10) {
                            return feature.properties.Stamomkret > 1000 && feature.properties.Stamomkret < 1500;
                        } else if (sizeFilter == 15) {
                            return feature.properties.Stamomkret > 1500;
                        }
                        // return feature.properties.Stamomkret ;
                        // return feature.properties.Stamomkret > 1000
                    },
                    onEachFeature: onEachFeature
                }
            );
        }
        console.log(geojsonLayer._layers);
        if (!jQuery.isEmptyObject(geojsonLayer._layers)) {
            console.log(geojsonLayer);
            markers.addLayer(geojsonLayer);
            map.addLayer(markers);
            map.fitBounds(markers.getBounds());
            sidebar.close();
            // map.fitBounds(geojsonLayer.getBounds());    
        } else {
            console.log("no results");
            $("#noResults").show();
        }
    });
}


function onEachFeature(feature, layer) {
    // console.log(feature);
    var popupContent = "";
    if (feature.properties) {
        popupContent += "Id: " + feature.properties.Id + "</br>";
        popupContent += "Stamomkret: " + feature.properties.Stamomkret + " cm</br>";
        popupContent += "Tradslag: " + feature.properties.Tradslag + "</br>";
        popupContent += "Status: " + feature.properties.Tradstatus + "</br>";
    }
    layer.bindPopup(popupContent);
    // markers.addLayer(layer);
}

function makeAjaxCall(url, data, type, datatype, success, error) {
    $.ajax({
        url: url,
        data: data,
        type: type,
        dataType: datatype,
        success: success,
        error: error
    });
}


function findLocationWithNavigator() {
    console.log("findlocation navigator function called");
    if (navigator.geolocation) {

        var options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };

        function success(pos) {
            var crd = pos.coords;

            console.log('Your current position is:');
            console.log(`Latitude : ${crd.latitude}`);
            console.log(`Longitude: ${crd.longitude}`);
            console.log(`Accuracy ${crd.accuracy} meters.`);
            map.setView(L.latLng(crd.latitude, crd.longitude), 15);
            sidebar.close();
        }

        function error(err) {
            console.warn(`ERROR(${err.code}): ${err.message}`);
            findLocationWithGoogleGeolocation();

        }

        navigator.geolocation.getCurrentPosition(success, error, options);
    } else {
        console.log("Browser doesn't support Geolocation");
        findLocationWithGoogleGeolocation();

        // $("#noResults").show();
        // Browser doesn't support Geolocation
        //   handleLocationError(false, infoWindow, map.getCenter());
        // }
    }
}

function findLocationWithGoogleGeolocation() {
    console.log("google geolcation called");
    var url = "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyALDj8UcNZ1fQlXcoMlJ84lSavkcyODExI";
    var type = "POST";
    var data;
    var datatype = "json";
    var success = function (response) {
        console.log(response);
        var lat = response.location.lat;
        var lng = response.location.lng;
        console.log("Accuracy: " + response.accuracy + " meters");

        map.setView(L.latLng(lat, lng), 14);
        var userLocation = "latlng=" + lat + "," + lng;
        // latlng=40.714224,-73.961452
        determineRegion(userLocation);
        sidebar.close();
    };
    var error = function (xhr) {
        console.log(xhr.statusText);
    };

    makeAjaxCall(url, data, type, datatype, success, error);
}

function determineRegion(userLocation) {
    var GoogleKey = "AIzaSyALDj8UcNZ1fQlXcoMlJ84lSavkcyODExI";
    var url = "https://maps.googleapis.com/maps/api/geocode/json?" + userLocation + "&key=" + GoogleKey;
    var type = "POST";
    var data;
    var datatype = "json";
    var success = function (response) {
        console.log(response);
        console.log(response.results[4].address_components[0].short_name);
        var region = response.results[4].address_components[0].short_name;
        // var strArr = region.split(" ");
        // console.log(strArr[0]);
        updateMap(region);
        $("#kommunSel").val(region);


        // var lat = response.location.lat;
        // var lng = response.location.lng;
        // console.log("Accuracy: " + response.accuracy + " meters");

        // map.setView(L.latLng(lat, lng), 14);
        // sidebar.close();
    };
    var error = function (xhr) {
        console.log(xhr.statusText);
    };

    makeAjaxCall(url, data, type, datatype, success, error);
}







