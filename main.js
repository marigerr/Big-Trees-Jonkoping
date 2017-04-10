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

var latlng = L.latLng(57.90930939999999,14.074366499999996);

var map = L.map('map', {layers: [topo], center: latlng, zoom: 13});
var geojsonLayer;
// var progress = document.getElementById('progress');
// var progressBar = document.getElementById('progress-bar');
var finishedLoading;
var markers = L.markerClusterGroup({showCoverageOnHover: false, maxClusterRadius: 50, disableClusteringAtZoom: 15, spiderfyOnMaxZoom: false}); //, chunkedLoading: true, chunkProgress :checkProgress
// var currentData;
$.getJSON("./GeoJsonBig/Habo.geojson", function(data){
    success(data);
    // geojsonLayer.addData(HaboTrees, {pointToLayer: pointToLayer, onEachFeature: onEachFeature});
    // console.log(geojsonLayer._layers);
    // map.fitBounds(geojsonLayer.getBounds());
});

function success(data){
    geojsonLayer = L.geoJSON(data, {pointToLayer: pointToLayer, onEachFeature: onEachFeature});
    markers.addLayer(geojsonLayer);
    map.addLayer(markers);
	map.fitBounds(markers.getBounds());

    // console.log(markers);
}

// function updateClusterMarker(geojs)



// // ... Add more layers ...
// map.addLayer(markers);

// map.setView(geojsonLayer.getBounds().getCenter());

L.control.layers(baseLayers).addTo(map);

// $("#dateInput").focusout( function(e) {
//     console.log(e.target.value);
//     getComplaints(e.target.value);  
// })

$( "#kommunSel" ).change(function(e) {
//   alert( $("#complaintDD option:selected"));
//   console.log(e.target.value);
    $("#circumferenceSel").val(1);
    // $("#circumferenceSel option:selected")
    updateMap(e.target.value);
});

$( "#circumferenceSel" ).change(function(e) {
//   alert( $("#complaintDD option:selected"));
    $("#noResults").hide();
    console.log(e.target.value);
    filterMap(e.target.value, $('#kommunSel').find(":selected").text());
});

// $("#attributeBtn").click( function(e) {
//     console.log("clicked");
//     // getComplaints(e.target.value);    
// })

function pointToLayer(feature, latlng) {
    var colors = {
        "Skogsalm": 'yellow',
        "Alm": 'yellow',
        "Ask": 'green',
        "ask": 'green',        
        "Asp": 'blue',
        "Björk": 'purple',
        "Björk-släktet": 'purple',        
        "Bok": 'red',
        "Ek": 'orange',
        "Ek-släktet": 'orange',
        "Skogsek": 'orange',
        "skogsek": 'orange',        
        "Lind": 'white',
        "Lind-släktet": 'white',
        "Skogslind": 'white',
        "Tall": 'grey',
        "Tall-släktet": 'grey',
        "Skogstall": 'grey',
    };
    var radius;
    var x = feature.properties.Stamomkret;
    switch (true) {
    case (x < 1000):
        // console.log("less than six hundred");
        radius = 5;
        break;
    case (x >= 1000  && x < 1500):
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
    // var size = 
    return new L.CircleMarker(latlng, {
        radius: radius,
        fillColor: colors[feature.properties.Tradslag],
        color: colors[feature.properties.Tradslag],
        weight: 1,
        opacity: 1,
        fillOpacity: 1,
        clickable: true
    })
};



function updateMap(selection) {
    var url = "./GeoJsonBig/" + selection + ".geojson";
    $.getJSON(url, function(data){
        var HaboTrees = data;
        
        /* Rest of the code with uses the "ajavascriptjsonvariable" variable */
        if(geojsonLayer){
            console.log(geojsonLayer);
            markers.removeLayer(geojsonLayer);
            // geojsonLayer.remove();
            geojsonLayer ={};

        }     
            console.log("hi");
           
        geojsonLayer = L.geoJSON(HaboTrees, {pointToLayer: pointToLayer, onEachFeature: onEachFeature});
        markers.addLayer(geojsonLayer);
        map.addLayer(markers);
        // if (finishedLoading) {
    	map.fitBounds(markers.getBounds());
        // }
        // map.fitBounds(geojsonLayer.getBounds());

    });
}

function filterMap(sizeFilter, kommun){

    var url = "./GeoJsonBig/" + kommun + ".geojson";
    $.getJSON(url, function(data){
        var currentTrees = data;
        if(geojsonLayer){
            markers.removeLayer(geojsonLayer);
            // geojsonLayer.remove();
            geojsonLayer ={};
        }        
        geojsonLayer = L.geoJSON(currentTrees, 
                                 {pointToLayer: pointToLayer, 
                                  filter: function(feature, layer) {
                                            // console.log(sizeFilter);
                                            if(sizeFilter == 5){
                                                return feature.properties.Stamomkret < 1000 
                                            } else if (sizeFilter == 10){
                                                return feature.properties.Stamomkret > 1000 && feature.properties.Stamomkret < 1500
                                            } else if (sizeFilter == 15){
                                                return feature.properties.Stamomkret > 1500
                                            };
                                            // return feature.properties.Stamomkret ;
                                            // return feature.properties.Stamomkret > 1000
                                        },
                                onEachFeature: onEachFeature}
                                );
        if (geojsonLayer._layers.length>0){
            console.log(geojsonLayer);
            markers.addLayer(geojsonLayer);
            map.addLayer(markers);
            map.fitBounds(markers.getBounds());            
            // map.fitBounds(geojsonLayer.getBounds());    
        } else {
            console.log("no results")
            $("#noResults").show();
        }
    })
}

function checkProgress(processed, total, elapsed, layersArray) {
    console.log("processed:" + processed);
    console.log("total:" + total);
    console.log("elapsed:" + elapsed);
    console.log("layersArray:" + layersArray);
    // console.log(markers);
    if (processed === total) {
        finishedLoading = true;
        console.log("finished");
        // map.addLayer(markers);
        
        // map.fitBounds(markers.getBounds());
    }
    // if (elapsed > 1000) {
    //     // if it takes more than a second to load, display the progress bar:
    //     // progress.style.display = 'block';
    //     // progressBar.style.width = Math.round(processed/total*100) + '%';
    // }
    // if (processed === total) {
    //     // all markers processed - hide the progress bar:
    //     // progress.style.display = 'none';
    // }
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




function makeAjaxCall(url, data, type, datatype, success, error){
    $.ajax({
        url: url,     
        data: data,
        type: type,
        dataType: datatype,
        success: success,
        error: error
    });
}

function getComplaints() {
    var url = "https://data.cityofnewyork.us/resource/fhrw-4uyv.geojson";
    var data = {
        // complaint_type : "Smoking",
        $where : "created_date between '2017-03-10T12:00:00' and '2017-03-10T14:00:00'",
        $select : "complaint_type",
        $group : "complaint_type",
        $order : "complaint_type"
    };
    var type = "get";
    datatype = "json";
    success = function(response) {
        console.log(response.features.length);
        var sel = $("#complaintDD");
        var fragment = document.createDocumentFragment();

        $.each(response.features, function(i){
            // console.log(response.features[i].properties.complaint_type);
            var opt = document.createElement('option');
            opt.innerHTML = response.features[i].properties.complaint_type;
            opt.value = response.features[i].properties.complaint_type;
            fragment.appendChild(opt);
        });
        sel.append(fragment);
        console.log(response);

        reports = response;
        // L.geoJSON(reports, {onEachFeature: onEachFeature}).addTo(map);
    };
    error = function(xhr) {
        console.log(xhr.statusText)
    };

    makeAjaxCall(url, data, type, datatype, success, error );
    
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






