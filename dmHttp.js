//var gServerRoot = "http://2af2dda9.ngrok.io/Default.aspx?";

////Example function call: httpPost(gServerRoot + "action=getEntries", requestString, function (responseString) { alert(responseString); } );

//function httpPost(url, reqString, callbackFunction) {

//    var httpRequest = new XMLHttpRequest();
//    var aborted = false;

//    var timeoutFunction = setTimeout(httpPostAsyncTimeout, 30000);

//    httpRequest.onreadystatechange = httpStateChange;
//    httpRequest.open("POST", url, true);
//    httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//    httpRequest.send(reqString);

//    function httpPostAsyncTimeout() {
//        aborted = true;
//        httpRequest.abort();
//        alert("Timeout connecting with the server");
//    }

//    function httpStateChange() {
//        if (httpRequest.readyState === 4) {
//            clearTimeout(timeoutFunction);
//            if (httpRequest.status === 200) {
//                if (httpRequest.responseText.substring(0, 6) === "error\n") {
//                    alert("Error returned from server: " + httpRequest.responseText.substring(6));
//                }
//                callbackFunction(httpRequest.responseText);
//            }
//            else {
//                if (aborted === false) {
//                    alert(httpRequest.responseText);
//                    alert("Error received from the server.");
//                }
//            }
//        }
//    }
//}