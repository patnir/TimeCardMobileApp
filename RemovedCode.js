//<div id="deleteMessageMain">
//    <div id="deleteMessageBody">
//        <p id="deleteMessageString"></p>
//        <input type="button" id="btnDeleteMessageOK" value="OK" />
//        <input type="button" id="btnDeleteMessageCancel" value="Cancel" />
//    </div>
//</div>

//function btnDeleteMessageOK_onmousedown() {
//    deleteMessageMain.style.visibility = 'hidden';
//    inputInformation.style.pointerEvents = 'all';

//    deleteMessageMain.DeleteEntry = true;
//    return;
//}

//function btnDeleteMessageCancel_onmousedown() {
//    deleteMessageMain.style.visibility = 'hidden';
//    inputInformation.style.pointerEvents = 'all';

//    deleteMessageMain.DeleteEntry = false;
//    return;
//}

//function showDeleteMessage() {
//    deleteMessageMain.style.visibility = 'visible';
//    inputInformation.style.pointerEvents = 'none';


//    var fontSize = (window.innerWidth / 3) / 10;
//    deleteMessageString.style.fontSize = fontSize.toString() + "px";
//    deleteMessageString.innerHTML = "Are you sure you want to delete this entry?";

//    //errorMessageMain.ObjectToFocus = objectToFocus;

//    btnRefresh.style.backgroundColor = "#1588C7";
//}

//function btnDelete_onmousedown() {
//    showDeleteMessage();

//    if (deleteMessageMain.DeleteEntry === false) {
//        return;
//    }

//    deleteMessageMain.DeleteEntry = false;

//    entry = inputInformation.EntryToEdit;

//    var returnString = serverDeleteEntry(entry.EntryID, gUser.UserID, entry.ProjectID,
//            entry.TaskID, entry.ActivityID, parseFloat(selectedHoursWorked.innerHTML),
//            selectedDateWorked.innerHTML, txtDescription.value,
//            cbxBillable.checked, cbxPayable.checked, entry.LastMaintUTC, gAuthToken);

//    if (gServerErrorMsg != "") {
//        showErrorMessage(gServerErrorMsg);
//    }

//    for (var i = 0; i < gEntriesList.length; i++) {
//        if (gEntriesList[i].EntryID === entry.EntryID) {
//            gEntriesList.splice(i, 1);
//        }
//    }

//    btnBack_onmousedown();
//    displayAllEntries();
//}

//function deleteMessageBody_onresize() {
//    deleteMessageMain.style.width = window.innerWidth.toString() + "px";
//    deleteMessageMain.style.height = window.innerHeight.toString() + "px";
//    deleteMessageMain.style.top = (window.innerHeight / 3).toString() + "px";
//    deleteMessageBody.style.left = (window.innerWidth / 3).toString() + "px";
//    deleteMessageBody.style.height = (window.innerHeight / 3).toString() + "px";
//    deleteMessageBody.style.width = (window.innerWidth / 3).toString() + "px";

//    //btnDeleteMessageOK.style.width = (window.innerWidth / 6).toString() + "px";
//    //btnDeleteMessageCancel.style.width = (window.innerWidth / 6).toString() + "px";
//    //btnDeleteMessageCancel.style.left = (window.innerWidth / 6).toString() + "px";
//}

//function serverDeleteEntry(entryID, userID, projectID, taskID, activityID, hoursWorked, dateWorked,
//    entryDescription, billable, payable, lastMaintUTC, authToken) {

//    var updateEntryCredentials = {
//        EntryID: entryID,
//        UserID: userID,
//        ProjectID: projectID,
//        TaskID: taskID,
//        ActivityID: activityID,
//        HoursWorked: hoursWorked,
//        DateWorked: dateWorked,
//        EntryDescription: entryDescription,
//        BillableIndicator: billable,
//        PayableIndicator: payable,
//        LastMaintUTC: lastMaintUTC
//    };

//    requestString = JSON.stringify(updateEntryCredentials);
//    httpPost(gServerRoot + "action=deleteEntry&authToken=" + authToken, requestString);

//    if (gServerErrorMsg !== "") {
//        return;
//    }
//}