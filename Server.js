var gServerRoot = "http://900f0398.ngrok.io/Default.aspx?";

var gServerErrorMsg;

function httpPost(url, reqString, callbackFunction) {
    gServerErrorMsg = "";
    var httpRequest = new XMLHttpRequest();
    var aborted = false;

    var timeoutFunction = setTimeout(httpPostAsyncTimeout, 30000);

    httpRequest.onreadystatechange = httpStateChange;
    httpRequest.open("POST", url, true);
    httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    httpRequest.send(reqString);

    function httpPostAsyncTimeout() {
        aborted = true;
        httpRequest.abort();
        gServerErrorMsg = "Timeout connecting with the server";
    }

    function httpStateChange() {
        if (httpRequest.readyState === 4) {
            clearTimeout(timeoutFunction);
            if (httpRequest.status === 200) {
                if (httpRequest.responseText.substring(0, 6) === "error\n") {
                    gServerErrorMsg = httpRequest.responseText.substring(6);
                }
                callbackFunction(httpRequest.responseText);
            }
            else {
                if (aborted === false) {
                    gServerErrorMsg = "Error received from the server.";
                }
            }
        }
    }
}