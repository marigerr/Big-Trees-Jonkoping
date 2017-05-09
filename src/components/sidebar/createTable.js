import {setViewOpenPopup} from 'Map/map.js';
import style from 'Stylesheets/table.css';

function buildTable(tableId, response, includeGeo) {
    $(tableId).empty();
    $.each(response.features, function (index, value) {
        response.features[index].Tradslag = response.features[index].attributes.Tradslag.replace("-släktet", "");
        response.features[index].Stamomkret = response.features[index].attributes.Stamomkret.toString();// + " cm";
        response.features[index].Lokalnamn = response.features[index].attributes.Lokalnamn;
    });
    var treeOrTrees = response.features.length > 1 ? "trees" : "tree";
    // var title = `Largest ${treetypeSel == "Alla" ? "" : treetypeSel} ${treeOrTrees} in ${regionSel == "Alla" ? "JKPG Lan" : regionSel}`;
    // addTableCaption(".stat-table", title);
    createTableHeader(tableId, ["Tradslag", "cm", "Plats"]);
    addTableData(tableId, response.features, ["Tradslag", "Stamomkret", "Lokalnamn"], includeGeo);
}

function addTableCaption(tableId, caption) {
    $(tableId).empty();
    var caption$ = $('<caption/>');
    caption$.html(caption);
    $(tableId).append(caption$);
}

function createTableHeader(tableId, columns) {
    var header$ = $('<tr/>');
    $.each(columns, function (index, value) {
        header$.append($('<th class="row' + index.toString() + '"/>').html(value));
    });
    $(tableId).append(header$);
}

function addRowClickHandler() {
    $("tr").click(function(){
        var lat = $(this).data().lat;
        var lng = $(this).data().lng;
        setViewOpenPopup([lat, lng], 13);
    });
}

function addTableData(tableId, array, columns, includeGeo) {
    var arrayLength = array.length;
    var row$;
    for (var i = 0; i < arrayLength; i++) {
            if (includeGeo) {
                var lat = array[i].geometry.y.toString();
                var lng = array[i].geometry.x.toString();
                row$ = $(`<tr data-lng="${lng}" data-lat="${lat}" />`);
            } else {
                row$ = $('<tr/>');
            }
        for (var colIndex = 0; colIndex < columns.length; colIndex++) {
                row$.append($('<td/>').html(array[i][columns[colIndex]]));
        }
        $(tableId).append(row$);
    }
    addPagination(tableId);
    $(tableId + "-div").show();
}

function addPagination(tableId) {
    var maxRows = 10;
    $(tableId).each(function () {
        var cTable = $(this);
        var cRows = cTable.find('tr:gt(0)');
        var cRowCount = cRows.length;

        if (cRowCount <= maxRows + 1) {
            $(".tableBtns").hide();
            return;
        } else {
            $(".tableBtns").show();
        }

        cRows.filter(':gt(' + (maxRows - 1) + ')').addClass("displayNone");

        var cPrev = cTable.siblings('.prev');
        var cNext = cTable.siblings('.next');
        cPrev.prop("disabled",true);

        cPrev.click(function () {
            var cFirstVisible = cRows.index(cRows.not('.displayNone'));

            if (cPrev.prop('disabled')) {
                return false;
            }

            cRows.addClass("displayNone");
            if (cFirstVisible - maxRows - 1 > 0) {
                cRows.filter(':lt(' + cFirstVisible + '):gt(' + (cFirstVisible - maxRows - 1) + ')').removeClass("displayNone");
            } else {
                cRows.filter(':lt(' + cFirstVisible + ')').removeClass("displayNone");
            }

            if (cFirstVisible - maxRows <= 0) {
                cPrev.prop("disabled",true);
            }

            cNext.prop("disabled",false);

            return false;
        });

        cNext.click(function () {
            var cFirstVisible = cRows.index(cRows.not('.displayNone'));

            if (cNext.prop('disabled')) {
                return false;
            }

            cRows.addClass("displayNone");
            cRows.filter(':lt(' + (cFirstVisible + 2 * maxRows) + '):gt(' + (cFirstVisible + maxRows - 1) + ')').removeClass("displayNone");

            if (cFirstVisible + 2 * maxRows >= cRows.length) {
                cNext.prop("disabled",true);
            }
            cPrev.prop("disabled",false);

            return false;
        });

    });
}


export { buildTable, addTableCaption, createTableHeader, addTableData, addRowClickHandler };

