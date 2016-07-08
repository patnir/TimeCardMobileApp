var gServerRoot = "http://localhost:50912/Default.aspx?";
var gServerErrorMsg;

function serverSignIn(teamName, emailAddress, password) {
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

function serverTokenSignIn(authToken) {
    var responseString = httpPost(gServerRoot + "action=tokenSignIn&authToken=" + authToken);

    if (gServerErrorMsg !== "") {
        return;
    }

    var user = JSON.parse(responseString);
    return user;
}

function serverSignOut(authToken) {
    var responseString = httpPost(gServerRoot + "action=signOut&authToken=" + authToken);

    if (gServerErrorMsg !== "") {
        return;
    }

    return;
}

function serverGetEntries(userID, projectTitle, taskTitle, activityTitle, hoursWorkedLow,
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

function serverInsertEntry(userID, projectID, taskID, activityID, hoursWorked, dateWorked,
    entryDescription, billable, payable, authToken) {

    var addEntryCredentials = {
        UserID: userID,
        ProjectID: projectID,
        TaskID: taskID,
        HoursWorked: hoursWorked,
        DateWorked: dateWorked,
        EntryDescription: entryDescription,
        ActivityID: activityID,
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

function serverUpdateEntry(entryID, userID, projectID, taskID, activityID, hoursWorked, dateWorked,
    entryDescription, billable, payable, lastMaintUTC, authToken) {

    var updateEntryCredentials = {
        EntryID: entryID,
        UserID: userID,
        ProjectID: projectID,
        TaskID: taskID,
        ActivityID: activityID,
        HoursWorked: hoursWorked,
        DateWorked: dateWorked,
        EntryDescription: entryDescription,
        BillableIndicator: billable,
        PayableIndicator: payable,
        LastMaintUTC: lastMaintUTC
    };

    requestString = JSON.stringify(updateEntryCredentials);
    var responseString = httpPost(gServerRoot + "action=updateEntry&authToken=" + authToken, requestString);

    if (gServerErrorMsg !== "") {
        return;
    }

    var entry = JSON.parse(responseString);

    return entry;
}

function serverGetProjects(authToken, inactiveIndicator) {
    var credentials = {
        InactiveIndicator: inactiveIndicator
    }

    var requestString = JSON.stringify(credentials);

    var responseString = httpPost(gServerRoot + "action=getProjects&authToken=" + authToken, requestString);

    if (gServerErrorMsg !== "") {
        return;
    }

    var projects = JSON.parse(responseString);
    return projects;
}

function serverGetTasks(authToken, projectID, inactiveIndicator) {
    var getTasksCredentials = {
        ProjectID: projectID,
        InactiveIndicator: inactiveIndicator
    };

    requestString = JSON.stringify(getTasksCredentials);

    var responseString = httpPost(gServerRoot + "action=getTasks&authToken=" + authToken, requestString);

    if (gServerErrorMsg !== "") {
        return;
    }

    var tasks = JSON.parse(responseString);
    return tasks;
}

function serverGetActivities(authToken, inactiveIndicator) {
    var credentials = {
        InactiveIndicator: inactiveIndicator
    }

    var requestString = JSON.stringify(credentials);

    var responseString = httpPost(gServerRoot + "action=getActivities&authToken=" + authToken, requestString);

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

