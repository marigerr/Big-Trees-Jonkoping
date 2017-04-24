import $ from 'jquery';


//// 

/*<!--<div class="wrapper">
    <p class="heading">Simple Dropdown Selectbox</p>
    <div class="dropdownbox">
    <p>where do you live?</p>
    </div> 
    <ul class="menu">
        <li id>Gera</li>
        <li>Berlin</li>
        <li>Melbourne</li>
        <li>New York</li>
        <li>Dresden</li> 
    </ul>
</div>		

<div class="wrapper">
    <div class="dropdownbox">
        <p>Choose Region</p>
    </div>
<ul class="regionList">
</ul>
</div>
                    			-->*/

$(".dropdownbox").click(function(){
$(".regionList").toggleClass("showMenu");
    $(".regionList > li").click(function(){
    $(".dropdownbox > p").text($(this).text());
    $(".regionList").removeClass("showMenu");
    });
});


function initRegionSel(){
    var regions = ["Aneby","Eksjö", "Gislaved", "Gnosjö", "Habo", "Jönköping", "Mullsjö", "Nässjö", "Sävsjö","Tranås","Vaggeryd", "Vetlanda", "Värnamo"];
    var regionList = $('ul.regionList');
    $.each(regions, function (i) {
        var li = $('<li/>')
            .addClass('ui-menu-item')
            .attr('role', 'menuitem')
            .appendTo(regionList);
        var aaa = $('<a/>')
            .addClass('ui-all')
            .text(regions[i])
            .appendTo(li);
    });
}

export default function addDropdowns(){
    initRegionSel();
}

