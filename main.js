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
})

var baseLayers = {
    "Topo": topo,
    "Satellite": satellite
};

// var latlng = L.latLng(57.90930939999999,14.074366499999996);

var map = L.map('map', { layers: [topo] });//, center: latlng, zoom: 13, zoomControl : false
// L.control.zoom( {position : 'bottomright'} ).addTo(map);
var sidebar = L.control.sidebar('sidebar', { position: 'right' }).addTo(map);


// lc = L.control.locate({
//     strings: {
//         title: "Show me where I am, yo!"
//     }
// }).addTo(map);

var geojsonLayer;
// var progress = document.getElementById('progress');
// var progressBar = document.getElementById('progress-bar');
var finishedLoading;
var markers = L.markerClusterGroup({ showCoverageOnHover: false, maxClusterRadius: 50, disableClusteringAtZoom: 15, spiderfyOnMaxZoom: false }); //, chunkedLoading: true, chunkProgress :checkProgress
// var currentData;
$.getJSON("./GeoJson/Jönköping.geojson", function (data) {
    success(data);
    // geojsonLayer.addData(HaboTrees, {pointToLayer: pointToLayer, onEachFeature: onEachFeature});
    // console.log(geojsonLayer._layers);
    // map.fitBounds(geojsonLayer.getBounds());
});

function success(data) {
    geojsonLayer = L.geoJSON(data, { pointToLayer: pointToLayer, onEachFeature: onEachFeature });
    markers.addLayer(geojsonLayer);
    map.addLayer(markers);
    map.fitBounds(markers.getBounds());

    // console.log(markers);
}
// function updateClusterMarker(geojs)
// // ... Add more layers ...
// map.addLayer(markers);
// map.setView(geojsonLayer.getBounds().getCenter());

L.control.layers(baseLayers, {}, { position: 'topleft' }).addTo(map);

// $("#dateInput").focusout( function(e) {
//     console.log(e.target.value);
//     getComplaints(e.target.value);  
// })

$("#kommunSel").change(function (e) {
    //   alert( $("#complaintDD option:selected"));
    //   console.log(e.target.value);
    $("#circumferenceSel").val(1);
    // $("#circumferenceSel option:selected")
    updateMap(e.target.value);
    sidebar.close();
});

$("#circumferenceSel").change(function (e) {
    //   alert( $("#complaintDD option:selected"));
    $("#noResults").hide();
    console.log(e.target.value);
    filterMap(e.target.value, $('#kommunSel').find(":selected").text());
});

$("#locateBtn").click(function (e) {
    //   alert( $("#complaintDD option:selected"));
    // $("#noResults").hide();
    // console.log(e.target.value);
    // filterMap(e.target.value, $('#kommunSel').find(":selected").text());
    // findLocationWithNavigator();
    findLocationWithGoogleGeolocation();
});



// function getGrade(d) {
//     return d > 1000 ? '#800026' :
//            d > 500  ? '#BD0026' :
//            d > 200  ? '#E31A1C' :
//            d > 100  ? '#FC4E2A' :
//            d > 50   ? '#FD8D3C' :
//            d > 20   ? '#FEB24C' :
//            d > 10   ? '#FED976' :
//                       '#FFEDA0';
// }

// var legend = L.control({position: 'bottomright'});

// legend.onAdd = function (map) {

//     var div = L.DomUtil.create('div', 'info legend'),
//         grades = [0, 10, 20, 50, 100, 200, 500, 1000],
//         labels = [];

//     // loop through our density intervals and generate a label with a colored square for each interval
//     for (var i = 0; i < grades.length; i++) {
//         div.innerHTML +=
//             '<i style="background:' + getGrade(grades[i] + 1) + '"></i> ' +
//             grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
//     }

//     return div;
// };

// legend.addTo(map);


// $("#attributeBtn").click( function(e) {
//     console.log("clicked");
//     // getComplaints(e.target.value);    
// })

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
    })
};



function updateMap(selection) {
    var url = "./GeoJson/" + selection + ".geojson";
    $.getJSON(url, function (data) {
        var HaboTrees = data;

        /* Rest of the code with uses the "ajavascriptjsonvariable" variable */
        if (geojsonLayer) {
            console.log(geojsonLayer);
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
                            return feature.properties.Stamomkret < 1000
                        } else if (sizeFilter == 10) {
                            return feature.properties.Stamomkret > 1000 && feature.properties.Stamomkret < 1500
                        } else if (sizeFilter == 15) {
                            return feature.properties.Stamomkret > 1500
                        };
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
            console.log("no results")
            $("#noResults").show();
        }
    })
}


function onEachFeature(feature, layer) {
    // console.log(feature);
    var popupContent = ""
    if (feature.properties) {
        popupContent += "Id: " + feature.properties.Obj_idnr + "</br>";
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
        };

        function error(err) {
            console.warn(`ERROR(${err.code}): ${err.message}`);
            findLocationWithGoogleGeolocation();

        };

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
    console.log("google geolcation called")
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
        console.log(xhr.statusText)
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
        console.log(xhr.statusText)
    };

    makeAjaxCall(url, data, type, datatype, success, error);
}

// function onAccuratePositionProgress (e) {
//     console.log(e.accuracy);
//     console.log(e.latlng);
//     map.setView(L.latLng(e.latlng), 15);

// }

// function onAccuratePositionFound (e) {
//     console.log(e.accuracy);
//     console.log('onAccuratePositionFound')
//     console.log(e.latlng);
//     map.setView(L.latLng(e.latlng),15);
// }

// function onAccuratePositionError (e) {
//     console.log(e.message)
// }

// map.on('accuratepositionprogress', onAccuratePositionProgress);
// map.on('accuratepositionfound', onAccuratePositionFound);
// map.on('accuratepositionerror', onAccuratePositionError);

// map.findAccuratePosition({
//     maxWait: 15000, // defaults to 10000
//     desiredAccuracy: 30 // defaults to 20
// });






