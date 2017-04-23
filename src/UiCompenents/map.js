function containerComponent () {
    var element = document.createElement('div');
    element.setAttribute("id", "container");
    /* lodash is required for the next line to work */
    //element.innerHTML = _.join(['Hello','webpack'], ' ');
    return element;
}

function mapComponent () {
    var element = $('<div>').attr('id', 'map');
    return element;
}
// document.body.appendChild(containerComponent());
containerComponent().appendTo('body');
mapComponent().appendTo('#container');