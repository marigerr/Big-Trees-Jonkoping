export default function checkUserSettings() {
    var userLang = navigator.language || navigator.userLanguage; 
    alert ("The language is: " + userLang);

    var head = document.getElementsByTagName('head')[0];
    var js = document.createElement("script");

    js.type = "text/javascript";

   if (userLang == "sv")
    {
        alert("userlang = swedish " + userLang);
        
        // js.src = "js/swedishversion.js";
    }
    else
    {
        alert("userlang = english " + userLang);
        // js.src = "js/englishversion.js";
    }    

    // if (screen.width > 500)
    // {
    //     js.src = "js/jquery_computer.js";
    // }
    // else
    // {
    //     js.src = "js/mobile_version.js";
    // }

    // head.appendChild(js);
}