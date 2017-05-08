function buildTable(tableId, response) {
    $(tableId).empty();
    $.each(response.features, function (index, value) {
        response.features[index].Tradslag = response.features[index].attributes.Tradslag.replace("-släktet", "");
        response.features[index].Stamomkret = response.features[index].attributes.Stamomkret.toString();// + " cm";
        response.features[index].Lokalnamn = response.features[index].attributes.Lokalnamn;
    });
    var treeOrTrees = response.features.length > 1 ? "trees" : "tree";
    // var title = `Largest ${treetypeSel == "Alla" ? "" : treetypeSel} ${treeOrTrees} in ${regionSel == "Alla" ? "JKPG Lan" : regionSel}`;
    // addTableCaption(".stat-table", title);
    createTableHeader(tableId, ["Tree type", "cm", "Place"]);
    addTableData(tableId, response.features, ["Tradslag", "Stamomkret", "Lokalnamn"]);
}

function addTableCaption(tableId, caption) {
    $(tableId).empty();
    $(".tableBtns").removeClass("disabled");
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

function addTableData(tableId, array, columns) {
    var arrayLength = array.length;
    for (var i = 0; i < arrayLength; i++) {
        var row$ = $('<tr/>');
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

        // cRows.each(function (i) {
        //     $(this).find('td:first').text(function (j, val) {
        //         return (i + 1) + " - " + val;
        //     });
        // });

        cRows.filter(':gt(' + (maxRows - 1) + ')').hide();


        var cPrev = cTable.siblings('.prev');
        var cNext = cTable.siblings('.next');
        cPrev.prop("disabled",true);
        cPrev.addClass('disabled');

        cPrev.click(function () {
            var cFirstVisible = cRows.index(cRows.filter(':visible'));

            // if (cPrev.hasClass('disabled')) {
            if (cPrev.prop('disabled')) {
                return false;
            }

            cRows.hide();
            if (cFirstVisible - maxRows - 1 > 0) {
                cRows.filter(':lt(' + cFirstVisible + '):gt(' + (cFirstVisible - maxRows - 1) + ')').show();
            } else {
                cRows.filter(':lt(' + cFirstVisible + ')').show();
            }

            if (cFirstVisible - maxRows <= 0) {
                cPrev.prop("disabled",true);
                cPrev.addClass('disabled');
            }

            cNext.prop("disabled",false);
            cNext.removeClass('disabled');

            return false;
        });

        cNext.click(function () {
            var cFirstVisible = cRows.index(cRows.filter(':visible'));

            // if (cNext.hasClass('disabled')) {
            if (cNext.prop('disabled')) {
                return false;
            }

            cRows.hide();
            cRows.filter(':lt(' + (cFirstVisible + 2 * maxRows) + '):gt(' + (cFirstVisible + maxRows - 1) + ')').show();

            if (cFirstVisible + 2 * maxRows >= cRows.length) {
                cNext.addClass('disabled');
                cNext.prop("disabled",true);
            }
            cPrev.removeClass('disabled');
            cPrev.prop("disabled",false);

            return false;
        });

    });
}


export { buildTable, addTableCaption, createTableHeader, addTableData };

