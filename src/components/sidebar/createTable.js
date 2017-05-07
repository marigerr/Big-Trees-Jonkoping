function addTableCaption(tableID, caption) {
    $(tableID).empty();
    var caption$ = $('<caption/>');
    caption$.html(caption);
    $(tableID).append(caption$); 
}

function createTableHeader(tableID, columns){
    var header$ = $('<tr/>');
    $.each(columns, function(index, value){
        header$.append($('<th/>').html(value));        
    });
    $(tableID).append(header$); 
}

function addTableData(tableID, array, columns){
    var arrayLength = array.length;
    for (var i = 0; i < arrayLength; i++) {
        var row$ = $('<tr/>');
        for (var colIndex = 0; colIndex < columns.length; colIndex++) {           
            row$.append($('<td/>').html(array[i][columns[colIndex]]));
        }
        $(tableID).append(row$);
    }  
    $(tableID).show();
}

export {addTableCaption, createTableHeader, addTableData};