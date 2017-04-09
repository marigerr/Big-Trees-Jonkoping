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
var markers = L.markerClusterGroup({showCoverageOnHover: false});
// var currentData;
$.getJSON("./GeoJson/Habo.geojson", function(data){
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

    console.log(markers);
}



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
  console.log(e.target.value);
  updateMap(e.target.value);
});

$( "#circumferenceSel" ).change(function(e) {
//   alert( $("#complaintDD option:selected"));
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
        radius = 3;
        break;
    case (x >= 1000  && x < 1500):
        // alert("between 5 and 8");
        radius = 6;
        break;
    case (x >= 1500):
        // alert("between 9 and 11");
        radius = 9;
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
    var url = "./GeoJson/" + selection + ".geojson";
    $.getJSON(url, function(data){
        var HaboTrees = data;
        /* Rest of the code with uses the "ajavascriptjsonvariable" variable */
        if(geojsonLayer){
            geojsonLayer.remove();
            geojsonLayer ={};
        }        
        geojsonLayer = L.geoJSON(HaboTrees, {pointToLayer: pointToLayer, onEachFeature: onEachFeature}).addTo(map);
        map.fitBounds(geojsonLayer.getBounds());
    });

    // var url = "https://data.cityofnewyork.us/resource/fhrw-4uyv.geojson";
    // var data = {
    //     // complaint_type : "Smoking",
    //     $where : "created_date between '2017-03-10T12:00:00' and '2017-03-10T14:00:00'",
    //     complaint_type : selection,
    //     // $group : "complaint_type",
    //     // $order : "complaint_type"
    // };
    // var type = "get";
    // datatype = "json";
    // success = function(response) {
    //     console.log(response.features.length);
    //     console.log(response);
    //     reports = response;
    //     if(geojsonLayer){
    //         geojsonLayer.remove();
    //         geojsonLayer ={};
    //     }
    //     geojsonLayer = L.geoJSON(reports, {onEachFeature: onEachFeature}).addTo(map);
    //     if(geojsonLayer.getBounds().length> 0){
    //         console.log(geojsonLayer.getBounds().length> 0);
    //         map.fitBounds(geojsonLayer.getBounds());
    //     }
    //     console.log(geojsonLayer);
    //     $("#attributeBtn").show();  
    // };
    // error = function(xhr) {
    //     console.log(xhr.statusText)
    // };
    // makeAjaxCall(url, data, type, datatype, success, error );   
}

function filterMap(sizeFilter, kommun){

    var url = "./GeoJson/" + kommun + ".geojson";
    $.getJSON(url, function(data){
        var currentTrees = data;
        if(geojsonLayer){
            geojsonLayer.remove();
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
                                ).addTo(map);
        if(geojsonLayer){
            map.fitBounds(geojsonLayer.getBounds());    
        }
    })
}

function onEachFeature(feature, layer) {
        // console.log(feature);
		var popupContent = ""
		if (feature.properties) {
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

// var latlngs = [
//     [45.51, -122.68],
//     [37.77, -122.43],
//     [34.04, -118.2]
// ];
// var polyline = L.polyline(latlngs, {color: 'red'}).addTo(map);
// // zoom the map to the polyline
// map.fitBounds(polyline.getBounds());

// $.ajax({
//     // url: "https://data.cityofnewyork.us/resource/fhrw-4uyv.geojson?complaint_type=Smoking&$limit=50&$where=date between '2017-03-10T12:00:00' and '2017-03-10T14:00:00'",
//     // url: "https://data.cityofnewyork.us/resource/fhrw-4uyv.geojson?complaint_type=Smoking&$where=created_date between '2017-03-10T12:00:00' and '2017-03-10T14:00:00'", 
//     url: "https://data.cityofnewyork.us/resource/fhrw-4uyv.geojson",     

//     data: {
//         // complaint_type : "Smoking",
//         $where : "created_date between '2017-03-10T12:00:00' and '2017-03-10T14:00:00'",
//         $select : "complaint_type",
//         $group : "complaint_type",
//         $order : "complaint_type"
//     },  

//     type: "get",
//     dataType: 'json',
//     success: function(response) {
//         console.log(response.features.length);
//         var sel = $("#complaintDD");
//         var fragment = document.createDocumentFragment();

//         $.each(response.features, function(i){
//             // console.log(response.features[i].properties.complaint_type);
//             var opt = document.createElement('option');
//             opt.innerHTML = response.features[i].properties.complaint_type;
//             opt.value = response.features[i].properties.complaint_type;
//             fragment.appendChild(opt);
//         });
//         sel.append(fragment);
//         console.log(response);

//         reports = response;
//         L.geoJSON(reports, {onEachFeature: onEachFeature}).addTo(map);
//     },
//     error: function(xhr) {
//         console.log(xhr.statusText)
//     }
// });



// L.geoJSON(blueTrail, {onEachFeature: onEachFeature}).addTo(map);

// L.geoJSON(blueTrailPOI, {onEachFeature: onEachFeature}).addTo(map);

// $.ajax({
// url: "http://api.scb.se/OV0104/v1/doris/en/ssd/BE/BE0401/BE0401B/BefProgFoddaMedel15",
// data: {
//     "query": 
//        [{"code":"Fodelseland", "selection":{"filter":"item",
//        "values":["010","020"]}},
//        {"code":"Alder", "selection":{"filter":"all", "values":["*"]}},
//        {"code":"Tid", "selection":{ "filter":"top", "values":["3"]}}],
//      "response": {"format":"json"}
// },
// type: "get",
// dataType: 'json',
// success: function(response) {
//     console.log(response);
// },
// error: function(xhr) {
//     console.log(xhr.statusText)
// }
// });


// url: "https://data.cityofchicago.org/resource/6zsd-86xi.json?$where=date between '2015-01-10T12:00:00' and '2015-01-10T14:00:00'",

// data: 
//     "$where=date between '2017-03-10T12:00:00' and '2017-03-10T14:00:00'"
//     // {"date": '2017-01-10T\\d' }
//     // UserID: UserID, 
//     // EmailAddress: EmailAddress
//   ,


// data: {
   
//   "query": [
//     {
//       "code": "Region",
//       "selection": {
//         "filter": "vs:RegionRiket99",
//         "values": []
//       }
//     },
//     {
//       "code": "Civilstand",
//       "selection": {
//         "filter": "item",
//         "values": [
//           "OG"
//         ]
//       }
//     },
//     {
//       "code": "Alder",
//       "selection": {
//         "filter": "agg:Ålder10år",
//         "values": [
//           "15-24"
//         ]
//       }
//     },
//     {
//       "code": "Kon",
//       "selection": {
//         "filter": "item",
//         "values": [
//           "1"
//         ]
//       }
//     },
//     {
//       "code": "ContentsCode",
//       "selection": {
//         "filter": "item",
//         "values": [
//           "BE0101N1"
//         ]
//       }
//     },
//     {
//       "code": "Tid",
//       "selection": {
//         "filter": "item",
//         "values": [
//           "2016"
//         ]
//       }
//     }
//   ],
//   "response": {
//     "format": "px"
//   }
// },

// $.ajax({
//     url: "http://api.scb.se/OV0104/v1/doris/en/ssd/BE/BE0401/BE0401B",
    // data: {
    //     "query": [{"code":"Fodelseland", "selection":{"filter":"item",
    //     "values":["010","020"]}},
    //     {"code":"Alder", "selection":{"filter":"all", "values":["*"]}},
    //     {"code":"Tid", "selection":{ "filter":"top", "values":["3"]}}],
    //     "response": {"format":"json"}
    // },





    // url: "http://api.scb.se/OV0104/v1/doris/sv/ssd/START/JO/JO1901/JO1901D/Kap4T01",
    // url: "http://api.scb.se/OV0104/v1/doris/sv/ssd/START/JO/JO0103/HusdjurK",
    
    // data: {
    // "query": [
    //     {
    //         "code": "Region",
    //         "selection": {
    //             "filter": "item",
    //             "values": [
    //             "01"
    //             // "03",
    //             // "04",
    //             // "05",
    //             // "06",
    //             // "07",
    //             // "08",
    //             // "09",
    //             // "10",
    //             // "11",
    //             // "12",
    //             // "13",
    //             // "14",
    //             // "15",
    //             // "16",
    //             // "17",
    //             // "18",
    //             // "19",
    //             // "20",
    //             // "21",
    //             // "22",
    //             // "23",
    //             // "24",
    //             // "25",
    //             // "90"
    //             ]
    //         }
    //         },
    //         {
    //         "code": "Djurslag",
    //         "selection": {
    //             "filter": "item",
    //             "values": [
    //             "10710"
    //             ]
    //         }
    //         },
    //         {
    //         "code": "Tid",
    //         "selection": {
    //             "filter": "item",
    //             "values": [
    //             "2007"
    //             ]
    //         }
    //         }
    //     ],
    //     "response": {
    //         "format": "json"
    //     }
    // },
    // cache: false,
//     type: "POST",
//     dataType: 'json',
//     success: function(response) {
//         console.log(response);
//     },
//     error: function(xhr) {
//         console.log(xhr.statusText)
//     }
// });



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






