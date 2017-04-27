//import $ from 'jquery';

var defaultSuccess = function (response) {
    console.log(response);
};

var defaultError = function (xhr) {
        console.log(xhr.statusText);
};

export default function makeAjaxCall(url, data, type ="GET", datatype = 'json', async = true, success = defaultSuccess, error = defaultError) {
    $.ajax({
        url: url,
        data: data,
        type: type,
        dataType: datatype,
        async: async,
        success: success,
        error: error
    });
}
