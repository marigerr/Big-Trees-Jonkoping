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

var map = L.map('map', {layers: [topo]});//, center: latlng, zoom: 13

lc = L.control.locate({
    strings: {
        title: "Show me where I am, yo!"
    }
}).addTo(map);

var geojsonLayer;
// var progress = document.getElementById('progress');
// var progressBar = document.getElementById('progress-bar');
var finishedLoading;
var markers = L.markerClusterGroup({showCoverageOnHover: false, maxClusterRadius: 50, disableClusteringAtZoom: 15, spiderfyOnMaxZoom: false}); //, chunkedLoading: true, chunkProgress :checkProgress
// var currentData;
$.getJSON("./GeoJson/Jönköping.geojson", function(data){
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

    var url = "./GeoJson/" + kommun + ".geojson";
    $.getJSON(url, function(data){
        var currentTrees = data;
        if(geojsonLayer){
            markers.removeLayer(geojsonLayer);
            // geojsonLayer.remove();
            geojsonLayer ={};
        } 
        if (sizeFilter == 1){
            console.log("return all points");
            geojsonLayer = L.geoJSON(currentTrees, {pointToLayer: pointToLayer, onEachFeature: onEachFeature});       
        } else {
            geojsonLayer = L.geoJSON(currentTrees, 
                                    {pointToLayer: pointToLayer, 
                                    filter: function(feature, layer) {
                                                console.log(sizeFilter);
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
        }
        console.log(geojsonLayer._layers);
        if (!jQuery.isEmptyObject(geojsonLayer._layers)){
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






