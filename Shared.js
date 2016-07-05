// Sign In logic and http request
var gErrorMsg;

function callbackLogin(responseString) {
    gErrorMsg = null;
    var parts = responseString.split("\n");
    if (parts[0] === "error") {
        gErrorMsg = parts[1];
        return;
    }
}

function login(teamName, emailAddress, password) {
    var object = {
        TeamName: teamName, 
        EmailAddress: emailAddress,
        Password: password
    }

    requestString = JSON.stringify(object)
    httpPost(gServerRoot + "action=signIn", requestString, callbackLogin);
}

// Get All Entries logic and http requests

function refresh(beginDate, endDate) {
    var object = {
        AuthToken: "",
        FromDate: beginDate,
        ToDate: endDate
    };

    requestString = JSON.stringify(object);

    httpPost(gServerRoot + "action=getEntries", requestString, callbackGetAllEntries);
}

function callbackGetAllEntries(responseString) {    
    var parts = responseString.split("\n");
    if (parts[0] === "error") {
        gErrorMsg = parts[1];
        return;
    }
    
    if (parts[1] === "") {
        gErrorMsg = "No Entries Found.";
        return;
    }

    var entries = JSON.parse(parts[1]);

    for (var i = 0; i < entries.length; i++) {
        var entry = new clsTimeLogEntry();
        entry.Deserialize(entries[i]);
        gEntriesList.push(entry);
    }
}