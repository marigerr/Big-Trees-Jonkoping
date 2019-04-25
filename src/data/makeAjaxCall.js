var defaultSuccess = function (response) {
    console.log(response);
};

var defaultError = function (xhr) {
        console.log(xhr.statusText);
};

export default function makeAjaxCall(url, data, type ="GET", datatype = 'json', async = true,  success = defaultSuccess, error = defaultError) {
// export default function makeAjaxCall(url, data, type ="GET", datatype = 'json', async = true,  success = defaultSuccess, error = defaultError, loadingScreen = false) {
    // if (loadingScreen) {
    //     $(".overlay, #loading-message-well").show();
    // } 
    $.ajax({
        url: url,
        data: data,
        type: type,
        dataType: datatype,
        // beforeSend: beforeSend,
        async: async,
        success: success,
        error: error
    });
}
