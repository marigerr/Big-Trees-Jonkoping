/* 
To Do

create functions that build the select OR Ul Li list elements with data returned from call to server




*/

var countries = ['United States', 'Canada', 'Argentina', 'Armenia'];
var cList = $('ul.mylist')
$.each(countries, function(i)
{
    var li = $('<li/>')
        .addClass('ui-menu-item')
        .attr('role', 'menuitem')
        .appendTo(cList);
    var aaa = $('<a/>')
        .addClass('ui-all')
        .text(countries[i])
        .appendTo(li);
});