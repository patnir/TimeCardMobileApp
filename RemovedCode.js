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

//if (inputInformation.EntryToEdit != null) {
//    btnDelete.style.visibility = "visible";
//}

// Onload:
//btnDeleteMessageOK.onmousedown = btnDeleteMessageOK_onmousedown;
//btnDeleteMessageCancel.onmousedown = btnDeleteMessageCancel_onmousedown;
//deleteMessageMain.style.visibility = "hidden";
//deleteMessageMain.DeleteEntry = false;
//btnDelete.onmousedown = btnDelete_onmousedown;
//btnDelete.style.visibility = "hidden";


// icon for bottom tasks:
//else {
//    var taskOptionButton = document.createElement('div');
//    taskOptionButton.id = "taskOptionButton";
//    taskOptionButton.innerHTML = "<img src=\"Images/Circle30.png\">"
//    taskOptionButton.style.left = (30 * level + 10).toString() + "px";
//    taskOption.appendChild(taskOptionButton);
//}


// resize and hide sign in page elements:
//function txtTeamName_onfocus() {
//    txtEmail.style.visibility = "hidden";
//    lblEmail.style.visibility = "hidden";
//    txtPassword.style.visibility = "hidden";
//    lblPassword.style.visibility = "hidden";
//}

//function txtEmail_onfocus() {
//    txtPassword.style.visibility = "hidden";
//    lblPassword.style.visibility = "hidden";
//    txtTeamName.style.visibility = "hidden";
//    lblTeamName.style.visibility = "hidden";
//}

//function txtPassword_onfocus() {
//    txtEmail.style.visibility = "hidden";
//    lblEmail.style.visibility = "hidden";
//    txtTeamName.style.visibility = "hidden";
//    lblTeamName.style.visibility = "hidden";
//}

//function signInBoxOnBlur() {
//    if (divSignIn.style.visibility === "hidden") {
//        txtEmail.style.visibility = "hidden";
//        lblEmail.style.visibility = "hidden";
//        txtTeamName.style.visibility = "hidden";
//        lblTeamName.style.visibility = "hidden";
//        txtPassword.style.visibility = "hidden";
//        lblPassword.style.visibility = "hidden";
//        return;
//    }
//    txtPassword.style.visibility = "visible";
//    txtTeamName.style.visibility = "visible";
//    txtEmail.style.visibility = "visible";

//    lblPassword.style.visibility = "visible";
//    lblTeamName.style.visibility = "visible";
//    lblEmail.style.visibility = "visible";
//}


//lblTeamName.style.width = (window.innerWidth - 80).toString() + "px";
//lblTeamName.style.top = (1 * (window.innerHeight - 44 - 32 - 55) / 20).toString() + "px";
//lblEmail.style.width = (window.innerWidth - 80).toString() + "px";
//lblEmail.style.top = (7 * (window.innerHeight - 44 - 32 - 55) / 20).toString() + "px";
//lblPassword.style.width = (window.innerWidth - 80).toString() + "px";
//lblPassword.style.top = (13 * (window.innerHeight - 44 - 32 - 55) / 20).toString() + "px";
//txtTeamName.style.top = (1 * (window.innerHeight - 44 - 32 - 55) / 20 + 20).toString() + "px";
//txtEmail.style.top = (7 * (window.innerHeight - 44 - 32 - 55) / 20 + 20).toString() + "px";
//txtPassword.style.top = (13 * (window.innerHeight - 44 - 32 - 55) / 20 + 20).toString() + "px";

//txtTeamName.onfocus = txtTeamName_onfocus;
//txtEmail.onfocus = txtEmail_onfocus;
//txtPassword.onfocus = txtPassword_onfocus;

//txtTeamName.onblur = signInBoxOnBlur;
//txtEmail.onblur = signInBoxOnBlur;
//txtPassword.onblur = signInBoxOnBlur;


//#lblTeamName {
//    position: absolute;
//    left: 40px;
//    font-family: Helvetica;
//}

//#lblEmail {
//    position: absolute;
//    left: 40px;
            
//    font-family: Helvetica;
//}
//        #lblPassword {
//    position: absolute;
//    left: 40px;
//    font-family: Helvetica;
//}


// Description for entry dynamic:
//function formatDescriptionForList(description) {
//    if (description.length > gCharactersToShow) {
//        return description.substring(0, gCharactersToShow - 3) + "...";
//    }
//    return description;
//}

//gCharactersToShow = (window.innerWidth / 8);

//if (window.innerWidth < 700) {
//    gCharactersToShow -= 20;
//}

// DATE STUFF

//if (i === 0) {
//    dateOption.innerHTML = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear() + " (Today)";
//} else {
//    // var dayOfTheWeek = daysOfTheWeek[date.getDay()];
//    dateOption.innerHTML = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear() + " (" + dayOfTheWeek + ")";
//}

// var daysOfTheWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
