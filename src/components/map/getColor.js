import {trees} from 'Data/models/treetype.js';

export default function getColor(treeType){
    var color;
    var masterTreeArray = trees();
    $.each(masterTreeArray, function(index, tree){
        if (treeType.match(tree.matchWith)) {
            color = tree.color;
            return false;
        }
    });
    return color;
}