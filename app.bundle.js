(window.webpackJsonp=window.webpackJsonp||[]).push([[0],[function(e,t,a){"use strict";(function(e){a.d(t,"f",function(){return l}),a.d(t,"d",function(){return i}),a.d(t,"b",function(){return n}),a.d(t,"e",function(){return o}),a.d(t,"c",function(){return s}),a.d(t,"a",function(){return c});var r=a(2);a(29);function l(){e(".loading_overlay").parent().css({position:"relative"}),e(".loading_overlay").show()}function i(t,a,r){e("table").empty(),e.each(a.features,function(e){a.features[e].Tradslag=a.features[e].attributes.Tradslag.replace("-släktet",""),a.features[e].Stamomkret=a.features[e].attributes.Stamomkret.toString(),a.features[e].Lokalnamn=a.features[e].attributes.Lokalnamn}),o(t,["Tradslag","cm","Plats"]),s(t,a.features,["Tradslag","Stamomkret","Lokalnamn"],r,!0)}function n(t,a){e("table").empty();var r=e("<caption/>");r.html(a),e(t).append(r)}function o(t,a){var r=e("<tr/>");e.each(a,function(t,a){r.append(e('<th class="row'+t.toString()+'"/>').html(a))}),e(t).append(r)}function c(){e("tr").click(function(){var t=e(this).data().lat,a=e(this).data().lng,l=r.c.getZoom();console.log(l),l<10?Object(r.d)([t,a],9):Object(r.d)([t,a],null)})}function s(t,a,r,l,i){for(var n,o=a.length,c=0;c<o;c++){if(l){var s=a[c].geometry.y.toString(),d=a[c].geometry.x.toString();n=e('<tr data-lng="'.concat(d,'" data-lat="').concat(s,'" />'))}else n=e("<tr/>");for(var u=0;u<r.length;u++)n.append(e("<td/>").html(a[c][r[u]]));e(t).append(n)}i&&function(t){e(t).each(function(){var t=e(this),a=t.find("tr:gt(0)"),r=a.length;if(r<=9)e(".tableBtns").hide();else{e(".tableBtns").show(),a.filter(":gt(7)").addClass("displayNone");var l=t.siblings(".prev"),i=t.siblings(".next");l.prop("disabled",!0),l.click(function(){var e=a.index(a.not(".displayNone"));return!l.prop("disabled")&&(a.addClass("displayNone"),e-8-1>0?a.filter(":lt("+e+"):gt("+(e-8-1)+")").removeClass("displayNone"):a.filter(":lt("+e+")").removeClass("displayNone"),e-8<=0&&l.prop("disabled",!0),i.prop("disabled",!1),!1)}),i.click(function(){var e=a.index(a.not(".displayNone"));return!i.prop("disabled")&&(a.addClass("displayNone"),a.filter(":lt("+(e+16)+"):gt("+(e+8-1)+")").removeClass("displayNone"),e+16>=a.length&&i.prop("disabled",!0),l.prop("disabled",!1),!1)})}})}(t),e(t+"-div").show()}}).call(this,a(8))},,function(e,t,a){"use strict";(function(e){a.d(t,"b",function(){return k}),a.d(t,"c",function(){return f}),a.d(t,"e",function(){return p}),a.d(t,"g",function(){return A}),a.d(t,"a",function(){return j}),a.d(t,"f",function(){return v}),a.d(t,"d",function(){return _});var r=a(1),l=a.n(r),i=(a(22),a(23),a(24),a(25),a(26),a(27),a(28),a(18),a(17),a(10)),n=a(15),o=a(6),c=a(11),s=a(5),d=a(12),u=a(0),m=l.a.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFyaWdlcnIiLCJhIjoiY2p1dnVyMmk1MDJ5aDN5bWxvYXBra3Y0aSJ9.MXrMvOH0sHu_rDJBZUmkIQ",{attribution:'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',id:"mapbox.streets"}),g={Topo:m,Satellite:l.a.tileLayer("http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.png",{attribution:"Source: Esri, DigitalGlobe, GeoEye, Earthstar Geographics, CNES/Airbus DS, USDA, USGS, AeroGRID, IGN, and the GIS User Community"})},b=l.a.latLngBounds(l.a.latLng(56.96162003401705,13.088924617411951),l.a.latLng(58.147842301716636,15.602056619493775)),f=l.a.map("map",{layers:[m]});f.fitBounds(b,{paddingBottomRight:[400,0]}),l.a.control.layers(g,{},{position:"topleft"}).addTo(f);var p=l.a.control.sidebar("sidebar",{position:"right"}).addTo(f),h=l.a.geoJSON().addTo(f),y=l.a.control({position:"bottomleft"});function k(){if(Object(d.c)("top1000Jkpg")){var e=Object(d.b)("top1000Jkpg");console.log(e),Object(i.a)(e),Object(u.d)(".tree-table",e,!0),Object(u.a)(),Object(i.b)()}else{Object(n.a)("Alla","Alla","Alla")}}function v(t,a,r,i){var n;if(f.removeLayer(h),h=l.a.geoJSON(t,{pointToLayer:T,onEachFeature:x}).addTo(f),a)f.setView(a,r);else if(!i){n=s.isMobile?[45,0]:[400,0];var o=h.getBounds();(function(e){var t=e.toBBoxString().split(",");return Math.abs((t[0]-t[2])*(t[1]-t[3]))})(o)<.005?f.setView(o.getCenter(),12):f.fitBounds(o,{paddingBottomRight:n})}e("#loader").hide(),e(".loading_overlay").hide()}function x(e,t){var a="";e.properties&&(a+="Tradslag: "+e.properties.Tradslag+"</br>",a+="Stamomkret: "+e.properties.Stamomkret+" cm</br>",a+="Status: "+e.properties.Tradstatus+"</br>",a+="Plats: "+e.properties.Lokalnamn+"</br>",a+="Id: "+e.properties.Id+"</br>"),t.bindPopup(a,{autoPanPaddingTopLeft:[65,5],autoPanPaddingBottomRight:[45,5]}),s.isMobile||t.on({mouseover:function(e){(t=e.target).openPopup()},mouseout:function(e){(t=e.target).closePopup()}})}function T(e,t){var a=Object(c.d)(e.properties.Stamomkret);return new l.a.CircleMarker(t,{radius:a,fillColor:O(e.properties.Tradslag),color:O(e.properties.Tradslag),weight:1,opacity:1,fillOpacity:1,clickable:!0})}function O(t){var a,r=Object(o.d)();return e.each(r,function(e,r){if(t.match(r.matchWith))return a=r.color,!1}),a}function A(t){e(".legend.leaflet-control").empty();for(var a="",r=0;r<t.length;r++)"Alla"!=t[r].id&&(a+='<i style="background:'+O(t[r].id)+'"></i> '+t[r].id+"</br>");e(".legend.leaflet-control").html(a)}function j(){f.removeLayer(h)}function _(t,a){a?f.setView(t,a):f.setView(t),e.each(f._layers,function(e,a){if(a.feature&&t[0]==a.feature.geometry.coordinates[1]&&t[1]==a.feature.geometry.coordinates[0])return a.openPopup(),s.isMobile&&p.close(),!1})}y.onAdd=function(){return l.a.DomUtil.create("div","legend")},y.addTo(f)}).call(this,a(8))},function(e,t,a){"use strict";(function(e){a.d(t,"a",function(){return i});var r=function(e){console.log(e)},l=function(e){console.log(e.statusText)};function i(t,a){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"GET",n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"json",o=!(arguments.length>4&&void 0!==arguments[4])||arguments[4],c=arguments.length>5&&void 0!==arguments[5]?arguments[5]:r,s=arguments.length>6&&void 0!==arguments[6]?arguments[6]:l;e.ajax({url:t,data:a,type:i,dataType:n,async:o,success:c,error:s})}}).call(this,a(8))},function(e,t,a){"use strict";function r(){return{url:"https://ext-geodata.lansstyrelsen.se/arcgis/rest/services/vektor/LSTF_webbgis_planeringsunderlag/MapServer/59/query",data:{where:"Kommun IS NOT NULL",outFields:"OBJECTID,Kommun,Lokalnamn,Tradslag,Stamomkret,Tradstatus",geometryType:"esriGeometryEnvelope",spatialRel:"esriSpatialRelIntersects",returnGeometry:!0,returnTrueCurves:!1,returnIdsOnly:!1,returnCountOnly:!1,returnZ:!1,returnM:!1,returnDistinctValues:!1,resultRecordCount:null,orderByFields:"Stamomkret DESC",outStatistics:null,outSR:4326,f:"pjson"},type:"GET",datatype:"json",success:function(e){console.log(e)},error:function(e){console.log(e.statusText)}}}a.d(t,"a",function(){return r})},function(e,t,a){"use strict";a.r(t);a(20),a(17),a(18),a(21);var r=a(2),l=a(9);a.d(t,"isMobile",function(){return o});var i,n,o=(n=!1,i=navigator.userAgent||navigator.vendor||window.opera,(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(i)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(i.substr(0,4)))&&(n=!0),n);Object(r.b)(),Object(l.a)()},function(e,t,a){"use strict";(function(e){a.d(t,"d",function(){return o}),a.d(t,"b",function(){return c}),a.d(t,"a",function(){return s}),a.d(t,"c",function(){return u});var r=a(7),l=a(3),i=a(4),n=a(9);function o(){return[{family:"zzzz",matchWith:/XXXXX/i,id:"Alla",querytext:"Tradslag is not null",label:"Alla",color:""},{family:"Björkväxter",matchWith:/al$/i,id:"Al",querytext:"Tradslag like '%Al'",label:"Al",color:"#0C2CAB"},{family:"Almväxter",matchWith:/alm/i,id:"Alm",querytext:"Tradslag like '%Alm%'",label:"Alm",color:"#F72530"},{family:"Syrenväxter",matchWith:/ask/i,id:"Ask",querytext:"Tradslag like '%Ask%'",label:"Ask",color:"#732e00"},{family:"Videväxter",matchWith:/^asp/i,id:"Asp",querytext:"Tradslag = 'Asp'",label:"Asp",color:"#3E1380"},{family:"Rosväxter",matchWith:/apel|äpple|malus/i,id:"Äpple",querytext:"Tradslag like '%Apel%' OR Tradslag like '%Äpple%' OR Tradslag like '%malus%'",label:"Äpple",color:"#EB8AAE"},{family:"Björkväxter",matchWith:/avenbok/i,id:"Avenbok",querytext:"Tradslag like '%Avenbok%'",label:"Avenbok",color:"#134D80"},{family:"Björkväxter",matchWith:/björk/i,id:"Björk",querytext:"Tradslag like '%Björk%'",label:"Björk",color:"#090C66"},{family:"Bokväxter",matchWith:/^bok|blodbok/i,id:"Bok",querytext:"Tradslag='Bok' OR Tradslag='Blodbok'",label:"Bok",color:"#424E82"},{family:"Bokväxter",matchWith:/ek/i,id:"Ek",querytext:"Tradslag like '%Ek%'",label:"Ek",color:"#267F99"},{family:"Cypressväxter",matchWith:/en$/i,id:"En",querytext:"Tradslag='En' OR Tradslag='Kungsen'",label:"En",color:"#002b40"},{family:"Tallväxter",matchWith:/^(gran)|(ädelgran)/i,id:"Gran",querytext:"Tradslag='Gran' OR Tradslag='Ädelgran'",label:"Gran",color:"#00802b"},{family:"Björkväxter",matchWith:/hassel/i,id:"Hassel",querytext:"Tradslag like '%Hassel%'",label:"Hassel",color:"#0738FA"},{family:"Rosväxter",matchWith:/hagtorn/i,id:"Hagtorn",querytext:"Tradslag like '%Hagtorn%'",label:"Hagtorn",color:"#CF3C72"},{family:"Idegransväxter",matchWith:/idegran/i,id:"Idegran",querytext:"Tradslag='Idegran'",label:"Idegran",color:"#0CE80C"},{family:"Rosväxter",matchWith:/körsbär|hägg|fågelbär/i,id:"Körsbär",querytext:"Tradslag like '%Körsbär%'OR Tradslag='Hägg' OR Tradslag='Fågelbär'",label:"Körsbär",color:"#F0469D"},{family:"Kinesträdsväxter",matchWith:/kastanj/i,id:"Kastanj",querytext:"Tradslag like '%Kastanj'",label:"Kastanj",color:"#F56B45"},{family:"Tallväxter",matchWith:/lärk/i,id:"Lärk",querytext:"Tradslag like '%Lärk'",label:"Lärk",color:"#00b33c"},{family:"Kinesträdsväxter",matchWith:/lönn/i,id:"Lönn",querytext:"Tradslag like '%Lönn'",label:"Lönn",color:"#FA5311"},{family:"Malvaväxter",matchWith:/lind/i,id:"Lind",querytext:"Tradslag like '%Lind%'",label:"Lind",color:"#ffaa00"},{family:"Rosväxter",matchWith:/oxel/i,id:"Oxel",querytext:"Tradslag like 'Oxel'",label:"Oxel",color:"#F584C4"},{family:"Rosväxter",matchWith:/päron/i,id:"Päron",querytext:"Tradslag like 'Päron'",label:"Päron",color:"#DB099C"},{family:"Videväxter",matchWith:/pil|salix|jolster|sälg|vide/i,id:"Pil",querytext:"Tradslag like '%Pil%' OR Tradslag like '%Salix%' OR Tradslag = 'Jolster' OR Tradslag = 'Sälg' OR Tradslag = 'Vide'",label:"Pil",color:"#8C4DAB"},{family:"Videväxter",matchWith:/poppel|populus/i,id:"Poppel",querytext:"Tradslag like '%Poppel' OR Tradslag = 'Populus sp'",label:"Poppel",color:"#49287A"},{family:"Rosväxter",matchWith:/rönn/i,id:"Rönn",querytext:"Tradslag = 'Rönn'",label:"Rönn",color:"#F21693"},{family:"Tallväxter",matchWith:/tall/i,id:"Tall",querytext:"Tradslag like '%Tall'",label:"Tall",color:"#006600"},{family:"zzzz",matchWith:/annat|övrig|obestämd|okänt/i,id:"Annat",querytext:"Tradslag like 'Övrig%' OR Tradslag = 'Annat' OR Tradslag = 'Obestämd' OR Tradslag = 'Okänt'",label:"Annat/Obestämd",color:"#000000"}]}function c(t){var a,r=[{family:"zzzz",matchWith:/XXXXX/i,id:"Alla",querytext:"Tradslag is not null",label:"Alla",color:""},{family:"Björkväxter",matchWith:/al$/i,id:"Al",querytext:"Tradslag like '%Al'",label:"Al",color:"#0C2CAB"},{family:"Almväxter",matchWith:/alm/i,id:"Alm",querytext:"Tradslag like '%Alm%'",label:"Alm",color:"#F72530"},{family:"Syrenväxter",matchWith:/ask/i,id:"Ask",querytext:"Tradslag like '%Ask%'",label:"Ask",color:"#732e00"},{family:"Videväxter",matchWith:/^asp/i,id:"Asp",querytext:"Tradslag = 'Asp'",label:"Asp",color:"#3E1380"},{family:"Rosväxter",matchWith:/apel|äpple|malus/i,id:"Äpple",querytext:"Tradslag like '%Apel%' OR Tradslag like '%Äpple%' OR Tradslag like '%malus%'",label:"Äpple",color:"#EB8AAE"},{family:"Björkväxter",matchWith:/avenbok/i,id:"Avenbok",querytext:"Tradslag like '%Avenbok%'",label:"Avenbok",color:"#134D80"},{family:"Björkväxter",matchWith:/björk/i,id:"Björk",querytext:"Tradslag like '%Björk%'",label:"Björk",color:"#090C66"},{family:"Bokväxter",matchWith:/^bok|blodbok/i,id:"Bok",querytext:"Tradslag='Bok' OR Tradslag='Blodbok'",label:"Bok",color:"#424E82"},{family:"Bokväxter",matchWith:/ek/i,id:"Ek",querytext:"Tradslag like '%Ek%'",label:"Ek",color:"#267F99"},{family:"Cypressväxter",matchWith:/en$/i,id:"En",querytext:"Tradslag='En' OR Tradslag='Kungsen'",label:"En",color:"#002b40"},{family:"Tallväxter",matchWith:/^(gran)|(ädelgran)/i,id:"Gran",querytext:"Tradslag='Gran' OR Tradslag='Ädelgran'",label:"Gran",color:"#00802b"},{family:"Björkväxter",matchWith:/hassel/i,id:"Hassel",querytext:"Tradslag like '%Hassel%'",label:"Hassel",color:"#0738FA"},{family:"Rosväxter",matchWith:/hagtorn/i,id:"Hagtorn",querytext:"Tradslag like '%Hagtorn%'",label:"Hagtorn",color:"#CF3C72"},{family:"Idegransväxter",matchWith:/idegran/i,id:"Idegran",querytext:"Tradslag='Idegran'",label:"Idegran",color:"#0CE80C"},{family:"Rosväxter",matchWith:/körsbär|hägg|fågelbär/i,id:"Körsbär",querytext:"Tradslag like '%Körsbär%'OR Tradslag='Hägg' OR Tradslag='Fågelbär'",label:"Körsbär",color:"#F0469D"},{family:"Kinesträdsväxter",matchWith:/kastanj/i,id:"Kastanj",querytext:"Tradslag like '%Kastanj'",label:"Kastanj",color:"#F56B45"},{family:"Tallväxter",matchWith:/lärk/i,id:"Lärk",querytext:"Tradslag like '%Lärk'",label:"Lärk",color:"#00b33c"},{family:"Kinesträdsväxter",matchWith:/lönn/i,id:"Lönn",querytext:"Tradslag like '%Lönn'",label:"Lönn",color:"#FA5311"},{family:"Malvaväxter",matchWith:/lind/i,id:"Lind",querytext:"Tradslag like '%Lind%'",label:"Lind",color:"#ffaa00"},{family:"Rosväxter",matchWith:/oxel/i,id:"Oxel",querytext:"Tradslag like 'Oxel'",label:"Oxel",color:"#F584C4"},{family:"Rosväxter",matchWith:/päron/i,id:"Päron",querytext:"Tradslag like 'Päron'",label:"Päron",color:"#DB099C"},{family:"Videväxter",matchWith:/pil|salix|jolster|sälg|vide/i,id:"Pil",querytext:"Tradslag like '%Pil%' OR Tradslag like '%Salix%' OR Tradslag = 'Jolster' OR Tradslag = 'Sälg' OR Tradslag = 'Vide'",label:"Pil",color:"#8C4DAB"},{family:"Videväxter",matchWith:/poppel|populus/i,id:"Poppel",querytext:"Tradslag like '%Poppel' OR Tradslag = 'Populus sp'",label:"Poppel",color:"#49287A"},{family:"Rosväxter",matchWith:/rönn/i,id:"Rönn",querytext:"Tradslag = 'Rönn'",label:"Rönn",color:"#F21693"},{family:"Tallväxter",matchWith:/tall/i,id:"Tall",querytext:"Tradslag like '%Tall'",label:"Tall",color:"#006600"},{family:"zzzz",matchWith:/annat|övrig|obestämd|okänt/i,id:"Annat",querytext:"Tradslag like 'Övrig%' OR Tradslag = 'Annat' OR Tradslag = 'Obestämd' OR Tradslag = 'Okänt'",label:"Annat/Obestämd",color:"#000000"}];return e.each(r,function(e){if(r[e].id==t)return a="("+r[e].querytext+")",!1}),a}function s(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"Alla",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:100,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"Alla",n=Object(r.a)(e,t,a),o=Object(i.a)(),c=d,s=o.data;s.where=n,s.returnGeometry=!1,s.outSR=null,s.outFields="Tradslag",s.orderByFields="Tradslag",s.returnDistinctValues=!0,Object(l.a)(o.url,s,o.type,o.datatyp,o.async,c,o.error)}function d(t){var a,r=[];e.each(t.features,function(e,t){r.push(t.attributes.Tradslag)}),a=u(r),Object(n.b)(".filterSelect.treetype-select",a)}function u(e){var t,a,r=[{family:"zzzz",matchWith:/XXXXX/i,id:"Alla",querytext:"Tradslag is not null",label:"Alla",color:""},{family:"Björkväxter",matchWith:/al$/i,id:"Al",querytext:"Tradslag like '%Al'",label:"Al",color:"#0C2CAB"},{family:"Almväxter",matchWith:/alm/i,id:"Alm",querytext:"Tradslag like '%Alm%'",label:"Alm",color:"#F72530"},{family:"Syrenväxter",matchWith:/ask/i,id:"Ask",querytext:"Tradslag like '%Ask%'",label:"Ask",color:"#732e00"},{family:"Videväxter",matchWith:/^asp/i,id:"Asp",querytext:"Tradslag = 'Asp'",label:"Asp",color:"#3E1380"},{family:"Rosväxter",matchWith:/apel|äpple|malus/i,id:"Äpple",querytext:"Tradslag like '%Apel%' OR Tradslag like '%Äpple%' OR Tradslag like '%malus%'",label:"Äpple",color:"#EB8AAE"},{family:"Björkväxter",matchWith:/avenbok/i,id:"Avenbok",querytext:"Tradslag like '%Avenbok%'",label:"Avenbok",color:"#134D80"},{family:"Björkväxter",matchWith:/björk/i,id:"Björk",querytext:"Tradslag like '%Björk%'",label:"Björk",color:"#090C66"},{family:"Bokväxter",matchWith:/^bok|blodbok/i,id:"Bok",querytext:"Tradslag='Bok' OR Tradslag='Blodbok'",label:"Bok",color:"#424E82"},{family:"Bokväxter",matchWith:/ek/i,id:"Ek",querytext:"Tradslag like '%Ek%'",label:"Ek",color:"#267F99"},{family:"Cypressväxter",matchWith:/en$/i,id:"En",querytext:"Tradslag='En' OR Tradslag='Kungsen'",label:"En",color:"#002b40"},{family:"Tallväxter",matchWith:/^(gran)|(ädelgran)/i,id:"Gran",querytext:"Tradslag='Gran' OR Tradslag='Ädelgran'",label:"Gran",color:"#00802b"},{family:"Björkväxter",matchWith:/hassel/i,id:"Hassel",querytext:"Tradslag like '%Hassel%'",label:"Hassel",color:"#0738FA"},{family:"Rosväxter",matchWith:/hagtorn/i,id:"Hagtorn",querytext:"Tradslag like '%Hagtorn%'",label:"Hagtorn",color:"#CF3C72"},{family:"Idegransväxter",matchWith:/idegran/i,id:"Idegran",querytext:"Tradslag='Idegran'",label:"Idegran",color:"#0CE80C"},{family:"Rosväxter",matchWith:/körsbär|hägg|fågelbär/i,id:"Körsbär",querytext:"Tradslag like '%Körsbär%'OR Tradslag='Hägg' OR Tradslag='Fågelbär'",label:"Körsbär",color:"#F0469D"},{family:"Kinesträdsväxter",matchWith:/kastanj/i,id:"Kastanj",querytext:"Tradslag like '%Kastanj'",label:"Kastanj",color:"#F56B45"},{family:"Tallväxter",matchWith:/lärk/i,id:"Lärk",querytext:"Tradslag like '%Lärk'",label:"Lärk",color:"#00b33c"},{family:"Kinesträdsväxter",matchWith:/lönn/i,id:"Lönn",querytext:"Tradslag like '%Lönn'",label:"Lönn",color:"#FA5311"},{family:"Malvaväxter",matchWith:/lind/i,id:"Lind",querytext:"Tradslag like '%Lind%'",label:"Lind",color:"#ffaa00"},{family:"Rosväxter",matchWith:/oxel/i,id:"Oxel",querytext:"Tradslag like 'Oxel'",label:"Oxel",color:"#F584C4"},{family:"Rosväxter",matchWith:/päron/i,id:"Päron",querytext:"Tradslag like 'Päron'",label:"Päron",color:"#DB099C"},{family:"Videväxter",matchWith:/pil|salix|jolster|sälg|vide/i,id:"Pil",querytext:"Tradslag like '%Pil%' OR Tradslag like '%Salix%' OR Tradslag = 'Jolster' OR Tradslag = 'Sälg' OR Tradslag = 'Vide'",label:"Pil",color:"#8C4DAB"},{family:"Videväxter",matchWith:/poppel|populus/i,id:"Poppel",querytext:"Tradslag like '%Poppel' OR Tradslag = 'Populus sp'",label:"Poppel",color:"#49287A"},{family:"Rosväxter",matchWith:/rönn/i,id:"Rönn",querytext:"Tradslag = 'Rönn'",label:"Rönn",color:"#F21693"},{family:"Tallväxter",matchWith:/tall/i,id:"Tall",querytext:"Tradslag like '%Tall'",label:"Tall",color:"#006600"},{family:"zzzz",matchWith:/annat|övrig|obestämd|okänt/i,id:"Annat",querytext:"Tradslag like 'Övrig%' OR Tradslag = 'Annat' OR Tradslag = 'Obestämd' OR Tradslag = 'Okänt'",label:"Annat/Obestämd",color:"#000000"}],l=[];for(t=0;t<e.length;t++)for(a=0;a<r.length;a++)if(e[t].match(r[a].matchWith)){l.push(r[a]);break}for(l.sort(function(e,t){return e.id>t.id?1:t.id>e.id?-1:0}),t=0;t<l.length-1;t++)l[t].id==l[t+1].id&&(l.splice(t,1),t--);return l.unshift({family:"zzzz",matchWith:/XXXXX/i,id:"Alla",querytext:"Tradslag is not null",label:"Alla"}),l}}).call(this,a(8))},function(e,t,a){"use strict";a.d(t,"a",function(){return n});var r=a(11),l=a(14),i=a(6);function n(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"Alla",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"Alla",a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"Alla",n=Object(l.a)(e),o=Object(r.b)(t);return[n,Object(i.b)(a),o].join(" AND ")}},,function(e,t,a){"use strict";(function(e){a.d(t,"b",function(){return u}),a.d(t,"a",function(){return m});var r=a(15),l=a(11),i=a(14),n=a(6),o=a(2),c=a(16),s=a(13),d=a(0);function u(t,a){e(t+" option").length>0&&e(t).empty();var r=e(t),l=document.createDocumentFragment();e.each(a,function(e){var t=document.createElement("option");t.innerHTML=a[e].label,t.value=a[e].id,l.appendChild(t)}),r.append(l)}function m(){var t=Object(n.d)(),a=[{div:".circumference-select",arr:l.a},{div:".region-select",arr:i.c},{div:".treetype-select",arr:t},{div:".stat-select",arr:c.c}];e.each(a,function(e,t){u(t.div,t.arr)}),e("#locateBtn").click(function(){g(),Object(s.a)()}),e("#searchVisibleBtn").click(function(){g(),e(".tree-table-div, .stat-table-div").hide(),Object(s.c)()}),e(".filterSelect").change(function(t){g(),e(".stat-table-div").hide();var a,o,c,s,d=e(".filterSelect.circumference-select").val(),u=e(".filterSelect.region-select").val(),m=e(".filterSelect.treetype-select").val();Object(r.a)(u,d,m),a=u,o=d,c=m,s=t.target.classList[1],"Alla"==o&&"circumference-select"!=s&&Object(l.c)(a,o,c),"Alla"==c&&"treetype-select"!=s&&Object(n.a)(a,o,c),"Alla"==a&&"region-select"!=s&&Object(i.b)(a,o,c)}),e(".statpaneSelect").change(function(){Object(o.a)();var t=e(".stat-select").val(),a=e(".statpaneSelect.region-select").val(),r=e(".statpaneSelect.treetype-select").val();e(".stat-table").empty(),e(".results").hide(),e(".tree-table-div").hide(),"MostCommon"==t?Object(c.b)(a,"Alla"):"AvgMax"==t?Object(c.a)(a,r):(e("select.statpaneSelect.treetype-select").prop("selectedIndex",0),e("select.statpaneSelect.region-select").prop("selectedIndex",0),Object(o.a)(),console.log("no choice made"))})}function g(){Object(d.f)(".tree-table-div"),e("table").empty(),e(".tableBtns").hide(),e(".results").hide()}}).call(this,a(8))},function(e,t,a){"use strict";(function(e){a.d(t,"a",function(){return m}),a.d(t,"b",function(){return g});var r,l=a(4),i=a(2),n=a(3),o=a(19),c=a(6),s=a(5),d=a(12),u=1e3;function m(t,a,l,n){u=t.features.length,console.log(u),1e3==t.features.length?(e(".results").html("Visar första 1000 resultat. Klicka på <br>på raden för att zooma in till träd"),e(".results").show()):(e(".results").html("Klicka på raden för att zooma in"),e(".results").show());var d=Object(o.a)(t.features);r=d.geojson;var m=d.trees,g=Object(c.c)(m);g.sort(function(e,t){return e.id>t.id?1:t.id>e.id?-1:0}),Object(i.g)(g),Object(i.f)(r,a,l,n),s.isMobile&&i.e.close()}function g(){var t=Object(l.a)(),a=t.data;a.where="Kommun is not null";a.returnGeometry=!1,a.outSR=null,a.orderByFields=null,a.returnCountOnly=!0;Object(n.a)(t.url,a,t.type,t.datatype,!0,function(t){Object(d.a)("JkpgLanTreeCount",t.count),e("#loader").hide()},t.error)}}).call(this,a(8))},function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"a",function(){return circumference}),__webpack_require__.d(__webpack_exports__,"b",function(){return getCircumferenceQueryText}),__webpack_require__.d(__webpack_exports__,"c",function(){return getCircumferenceRange}),__webpack_require__.d(__webpack_exports__,"d",function(){return getPointSize});var Data_makeAjaxCall_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(3),Data_lanstyrDefault_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(4),Data_getWhereCond_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(7),Sidebar_select_js__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(9),circumference=[{range:"Stamomkret > 0 ",querytext:"Stamomkret > 0",pointsize:null,id:"Alla",label:"Alla"},{range:"Stamomkret > 0 && Stamomkret < 250",querytext:"Stamomkret BETWEEN 0 AND 250",pointsize:3,id:"1",label:"Under 250 cm"},{range:"Stamomkret >= 250 && Stamomkret < 500",querytext:"Stamomkret BETWEEN 251 AND 500",pointsize:5,id:"2",label:"250-500 cm"},{range:"Stamomkret >= 500 && Stamomkret < 750",querytext:"Stamomkret BETWEEN 501 AND 750",pointsize:7,id:"5",label:"500-750"},{range:"Stamomkret >= 750 && Stamomkret < 1000",querytext:"Stamomkret BETWEEN 751 AND 1000",pointsize:10,id:"7",label:"750-1000"},{range:"Stamomkret > 1000",querytext:"Stamomkret > 1000",pointsize:10,id:"10",label:"Over 1000 cm"}];function getPointSize(Stamomkret){return eval(circumference[1].range)?circumference[1].pointsize:eval(circumference[2].range)?circumference[2].pointsize:eval(circumference[3].range)?circumference[3].pointsize:eval(circumference[4].range)?circumference[4].pointsize:eval(circumference[5].range)?circumference[5].pointsize:3}function getCircumferenceQueryText(e){return e==circumference[0].id?"("+circumference[0].querytext+")":e==circumference[1].id?"("+circumference[1].querytext+")":e==circumference[2].id?"("+circumference[2].querytext+")":e==circumference[3].id?"("+circumference[3].querytext+")":e==circumference[4].id?"("+circumference[4].querytext+")":e==circumference[5].id?"("+circumference[5].querytext+")":"(Stamomkret > 0)"}function getCircumferenceRange(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:100,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"Alla",r=JSON.stringify([{statisticType:"min",onStatisticField:"Stamomkret",outStatisticFieldName:"minStamomkret"},{statisticType:"max",onStatisticField:"Stamomkret",outStatisticFieldName:"maxStamomkret"}]),l=Object(Data_getWhereCond_js__WEBPACK_IMPORTED_MODULE_2__.a)(e,t,a),i=Object(Data_lanstyrDefault_js__WEBPACK_IMPORTED_MODULE_1__.a)(),n=getCircumSuccess,o=i.data;o.where=l,o.outStatistics=r,o.returnGeometry=!1,o.outSR=null,o.orderByFields=null,Object(Data_makeAjaxCall_js__WEBPACK_IMPORTED_MODULE_0__.a)(i.url,o,i.type,i.datatyp,i.async,n,i.error)}var getCircumSuccess=function getCircumSuccess(response){for(var Stamomkret=response.features[0].attributes.maxStamomkret,filteredCircumference=[],i=circumference.length-1;i>0;i--)if(eval(circumference[i].range)){filteredCircumference=circumference.slice(0,i+1);break}Object(Sidebar_select_js__WEBPACK_IMPORTED_MODULE_3__.b)(".filterSelect.circumference-select",filteredCircumference)}},function(e,t,a){"use strict";function r(e,t){console.log("adding to local storage"),localStorage.setItem(e,JSON.stringify(t))}function l(e){return console.log("get from Local Storage"),JSON.parse(localStorage.getItem(e))}function i(e){return null!==localStorage.getItem(e)}a.d(t,"c",function(){return i}),a.d(t,"a",function(){return r}),a.d(t,"b",function(){return l})},function(e,t,a){"use strict";(function(e){a.d(t,"b",function(){return p}),a.d(t,"a",function(){return m}),a.d(t,"c",function(){return y});var r,l=a(1),i=a.n(l),n=a(3),o=a(4),c=a(2),s=a(10),d=a(0),u=a(5);function m(){console.log("findLocationWithNavigator");navigator.geolocation?(p(),navigator.geolocation.getCurrentPosition(function(e){!function(e){var t=e.coords,a=i.a.latLng(t.latitude,t.longitude);u.isMobile&&(c.e.close(),console.log(u.isMobile));f(b(t.latitude,t.longitude),a),h(t.latitude,t.longitude,t.accuracy)}(e)},function(e){!function(e){console.warn("navigator.geolocation error(".concat(e.code,"): ").concat(e.message)),g()}(e)},{enableHighAccuracy:!0,timeout:1e4,maximumAge:0})):g()}function g(){p(),console.log("google geolocation called");Object(n.a)("https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyALDj8UcNZ1fQlXcoMlJ84lSavkcyODExI",void 0,"POST","json",!0,function(e){var t=e.location.lat,a=e.location.lng;h(t,a,e.accuracy);var r=i.a.latLng(t,a);f(b(t,a),r),u.isMobile&&(c.e.close(),console.log(u.isMobile))},function(e){console.log(e.statusText)})}function b(e,t){return i.a.latLng(e,t).toBounds(4e3).toBBoxString()}function f(e,t,a){var r,l=Object(o.a)();r=t?function(e){Object(s.a)(e,t,16),Object(d.d)(".tree-table",e,!0),Object(d.a)()}:function(e){Object(s.a)(e,null,null,a),Object(d.d)(".tree-table",e,!0),Object(d.a)()};var i=l.data;i.where="",i.geometry=JSON.stringify(e),i.outSR=4326,i.inSR=4326,i.spatialRel="esriSpatialRelContains",Object(n.a)(l.url,i,l.type,l.datatyp,l.async,r,l.error)}function p(){r&&r.remove()}function h(e,t,a){r=i.a.marker([e,t]).addTo(c.c);var l="";l+="Your location</br>",l+="Accuracy: "+Math.round(a)+" meters</br>",r.bindPopup(l,{autoPanPaddingTopLeft:[65,5],autoPanPaddingBottomRight:[45,5]})}function y(){e("table").empty(),e(".tableBtns").hide(),f(c.c.getBounds().toBBoxString(),null,!0)}}).call(this,a(8))},function(e,t,a){"use strict";(function(e){a.d(t,"c",function(){return o}),a.d(t,"a",function(){return c}),a.d(t,"b",function(){return s});var r=a(7),l=a(3),i=a(4),n=a(9),o=[{id:"Alla",label:"Alla"},{id:"Aneby",label:"Aneby"},{id:"Eksjö",label:"Eksjö"},{id:"Gislaved",label:"Gislaved"},{id:"Gnosjö",label:"Gnosjö"},{id:"Habo",label:"Habo"},{id:"Jönköping",label:"Jönköping"},{id:"Mullsjö",label:"Mullsjö"},{id:"Nässjö",label:"Nässjö"},{id:"Sävsjö",label:"Sävsjö"},{id:"Tranås",label:"Tranås"},{id:"Vaggeryd",label:"Vaggeryd"},{id:"Vetlanda",label:"Vetlanda"},{id:"Värnamo",label:"Värnamo"}];function c(e){return"Alla"==e?"Kommun IS NOT NULL":"(Kommun='"+e+"')"}function s(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"Alla",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:100,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"Alla",n=Object(r.a)(e,t,a),o=Object(i.a)(),c=d,s=o.data;s.where=n,s.returnGeometry=!1,s.outSR=null,s.outFields="Kommun",s.orderByFields=null,s.returnDistinctValues=!0,Object(l.a)(o.url,s,o.type,o.datatyp,!0,c,o.error)}var d=function(t){var a=[{id:"Alla",label:"Alla"}];e.each(t.features,function(e,t){var r={id:t.attributes.Kommun,label:t.attributes.Kommun};a.push(r)}),Object(n.b)(".filterSelect.region-select",a)}}).call(this,a(8))},function(e,t,a){"use strict";a.d(t,"a",function(){return d});var r=a(13),l=a(7),i=a(4),n=a(12),o=a(10),c=a(3),s=a(0);function d(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"Alla",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"Alla",a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"Alla",d=arguments.length>3&&void 0!==arguments[3]?arguments[3]:1e3;Object(r.b)();var u=Object(l.a)(e,t,a),m=Object(i.a)(),g=m.data;g.where=u,g.resultRecordCount=d;Object(c.a)(m.url,g,m.type,m.datatype,!0,function(r){"Alla"==e&&"Alla"==t&&"Alla"==a&&Object(n.a)("top1000Jkpg",r),Object(o.a)(r),Object(s.d)(".tree-table",r,!0),Object(s.a)()},m.error,!0)}},function(e,t,a){"use strict";(function(e){a.d(t,"b",function(){return s}),a.d(t,"a",function(){return d}),a.d(t,"c",function(){return c});var r=a(3),l=a(4),i=a(7),n=a(6),o=a(0),c=[{id:"",label:"Välj Statistik"},{id:"MostCommon",label:"Träd antal"},{id:"AvgMax",label:"Medel Omkrets"}];function s(t,a){e(".statpaneSelectTreeDiv").hide(),e("select.statpaneSelect.treetype-select").prop("selectedIndex",0);var c=Object(i.a)(t,null,a),s=JSON.stringify([{statisticType:"count",onStatisticField:"Tradslag",outStatisticFieldName:"TradslagCounts"}]),d=Object(l.a)(),u=d.data;u.where=c,u.outStatistics=s,u.returnGeometry=!1,u.outSR=null,u.orderByFields=null,u.groupByFieldsForStatistics="Tradslag",Object(r.a)(d.url,u,d.type,d.datatyp,d.async,function(a){var r=function(t){var a,r,l=Object(n.d)();for(l.shift(),a=0;a<t.length;a++)for(r=0;r<l.length;r++)if(t[a].attributes.Tradslag.match(l[r].matchWith)){void 0===l[r].total&&(l[r].total=0),l[r].total+=t[a].attributes.TradslagCounts;break}return l=e.grep(l,function(e){return void 0!==e.total})}(a.features);r.sort(function(e,t){return t.total-e.total});var l="Tree totals in ".concat("Alla"==t?"Jönköping Lan":t);Object(o.b)(".stat-table",l),Object(o.e)(".stat-table",["Tree Type","Total"]),Object(o.c)(".stat-table",r,["label","total"]);var i=0;e.each(r,function(e){i+=r[e].total});var c=e('<tr class="boldRow"/>');c.append(e("<td/>").html("Total")),c.append(e("<td/>").html(i)),e(".stat-table").append(c)},d.error)}function d(t,a){e(".statpaneSelectTreeDiv").show();var n=Object(i.a)(t,"Alla",a),c=Object(l.a)(),s=JSON.stringify([{statisticType:"avg",onStatisticField:"Stamomkret",outStatisticFieldName:"avgStamomkret"}]),d=c.data;d.where=n,d.outStatistics=s,d.returnGeometry=!1,d.outSR=null,d.orderByFields=null,Object(r.a)(c.url,d,c.type,c.datatyp,c.async,function(e){var r=[{avgStamomkret:e.features[0].attributes.avgStamomkret}];Object(o.b)(".stat-table","".concat("Alla"==a?"":a," ").concat("Alla"==t?"JKPG Lan":t)),Object(o.e)(".stat-table",["Average Circumference"]),Object(o.c)(".stat-table",r,["avgStamomkret"],!1,!1)},c.error)}}).call(this,a(8))},function(e,t,a){},,function(e,t,a){"use strict";function r(e){for(var t=[],a={type:"FeatureCollection",crs:{type:"name",properties:{name:"urn:ogc:def:crs:OGC:1.3:CRS84"}},features:[]},r=0;r<e.length;r++){var l={type:"Feature",properties:{Id:e[r].attributes.OBJECTID,Kommun:e[r].attributes.Kommun,Lokalnamn:e[r].attributes.Lokalnamn,Tradslag:e[r].attributes.Tradslag,Stamomkret:e[r].attributes.Stamomkret,Tradstatus:e[r].attributes.Tradstatus},geometry:{type:"Point",coordinates:[e[r].geometry.x,e[r].geometry.y]}};a.features.push(l),t.push(e[r].attributes.Tradslag)}return{geojson:a,trees:t}}a.d(t,"a",function(){return r})},function(e,t,a){},function(e,t,a){e.exports=a.p+"favicon.ico"},,,,,,,,function(e,t,a){}],[[5,4,2,3,1]]]);