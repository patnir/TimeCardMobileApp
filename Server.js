var gServerRoot = "http://localhost:50912/Default.aspx?";
var gServerErrorMsg;

function SignIn(teamName, emailAddress, password) {
    var userCredentials = {
        TeamName: teamName,
        EmailAddress: emailAddress,
        Password: password
    }

    var requestString = JSON.stringify(userCredentials)
    var responseString = httpPost(gServerRoot + "action=signIn", requestString);

    if (gServerErrorMsg !== "") {
        return;
    }

    var user = JSON.parse(responseString);
    return user;
}

function tokenSignIn(authToken) {
    var responseString = httpPost(gServerRoot + "action=tokenSignIn&authToken=" + authToken);

    if (gServerErrorMsg !== "") {
        return;
    }

    var user = JSON.parse(responseString);
    return user;
}

function signOut(authToken) {
    var responseString = httpPost(gServerRoot + "action=signOut&authToken=" + authToken);

    return;
}

function getEntries(userID, projectTitle, taskTitle, activityTitle, hoursWorkedLow,
    hoursWorkedHigh, fromDate, toDate, entryDescription, billable, payable, inactive, authToken) {

    var entriesList = [];
    var timeLogCredentials = {
        UserID: userID,
        ProjectTitle: projectTitle,
        TaskTitle: taskTitle,
        HoursWorkedLow: hoursWorkedLow,
        HoursWorkedHigh: hoursWorkedHigh,
        FromDate: fromDate,
        ToDate: toDate,
        EntryDescription: entryDescription,
        ActivityTitle: activityTitle,
        BillableIndicator: billable,
        PayableIndicator: payable,
        IncludeInactiveProjects: inactive
    };

    requestString = JSON.stringify(timeLogCredentials);
    var responseString = httpPost(gServerRoot + "action=getEntries&authToken=" + authToken, requestString);

    if (gServerErrorMsg !== "") {
        return;
    }

    var entries = JSON.parse(responseString);

    for (var i = 0; i < entries.length; i++) {
        var entry = new TimeLogEntry();
        entry.Deserialize(entries[i]);
        entriesList.push(entry);
    }

    return entriesList;
}

function insertEntry(userID, projectID, taskTitle, hoursWorked, dateWorked,
    entryDescription, activityTitle, billable, payable, authToken) {

    var addEntryCredentials = {
        UserID: userID,
        ProjectID: projectID,
        TaskTitle: taskTitle,
        HoursWorked: hoursWorked,
        DateWorked: dateWorked,
        EntryDescription: entryDescription,
        ActivityTitle: activityTitle,
        BillableIndicator: billable,
        PayableIndicator: payable
    };

    requestString = JSON.stringify(addEntryCredentials);
    var responseString = httpPost(gServerRoot + "action=insertEntry&authToken=" + authToken, requestString);

    if (gServerErrorMsg !== "") {
        return;
    }

    var entry = JSON.parse(responseString);

    return entry;
}

function updateEntry(userID, projectID, taskTitle, hoursWorked, dateWorked,
    entryDescription, activityTitle, billable, payable, authToken) {

    var updateEntryCredentials = {
        UserID: userID,
        ProjectID: projectID,
        TaskTitle: taskTitle,
        HoursWorked: hoursWorked,
        DateWorked: dateWorked,
        EntryDescription: entryDescription,
        ActivityTitle: activityTitle,
        BillableIndicator: billable,
        PayableIndicator: payable
    };

    requestString = JSON.stringify(updateEntryCredentials);
    var responseString = httpPost(gServerRoot + "action=updateEntry&authToken=" + authToken, requestString);

    if (gServerErrorMsg !== "") {
        return;
    }

    var entry = JSON.parse(responseString);

    return entry;
}

function getProjects(authToken) {
    var responseString = httpPost(gServerRoot + "action=getProjects&authToken=" + authToken);

    if (gServerErrorMsg !== "") {
        return;
    }

    var projects = JSON.parse(responseString);
    return projects;
}

function getTasks(projectID, authToken) {
    var getTasksCredentials = {
        ProjectID: projectID,
    };

    requestString = JSON.stringify(getTasksCredentials);

    var responseString = httpPost(gServerRoot + "action=getTasks&authToken=" + authToken, requestString);

    if (gServerErrorMsg !== "") {
        return;
    }

    var tasks = JSON.parse(responseString);
    return tasks;
}

function getActivities(authToken) {
    var responseString = httpPost(gServerRoot + "action=getActivities&authToken=" + authToken);

    if (gServerErrorMsg !== "") {
        return;
    }

    var activities = JSON.parse(responseString);
    return activities;
}

function httpPost(url, reqString) {
    gServerErrorMsg = "";
    var httpRequest = new XMLHttpRequest();
    httpRequest.open("POST", url, false);
    httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    httpRequest.send(reqString);

    var responseParts = httpRequest.responseText.split("\n");

    if (responseParts[0] === "error") {
        gServerErrorMsg = responseParts[1];
        return;
    }

    return responseParts[1];
}

