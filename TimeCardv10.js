/// <reference path="TimeCardv10.html">
var gResponseString;
var gEntriesList;
var gCharactersToShow;

var gProjects;
var gActivities;
var gTasks;

var gUser;

var gTodayHours = 0.00;
var gTotalHours = 0.00;

var gAuthToken = "";

var gStartDate;// = new dmDate();
var gEndDate;// = new dmDate();

function body_load() {
    window.onresize = window_onresize;
    btnAddNewEntry.onmousedown = btnAddNewEntry_onmousedown;
    btnBack.onmousedown = btnBack_onmousedown;

    cbxRememberPassword.onmousedown = cbxRememberPassword_onmousedown;

    btnForgotPassword.onmousedown = btnForgotPassword_onmousedown;

    btnSignIn.onmousedown = btnSignIn_onmousedown;
    btnSignIn.onmouseup = btnSignIn_onmouseup;

    txtDescription.Focused = false;

    txtDescription.onfocus = txtDescription_onfocus;
    txtDescription.onblur = txtDescription_onblur;

    btnErrorMessageOK.onmousedown = btnErrorMessageOK_onmousedown;
    errorMessageMain.style.visibility = "hidden";

    btnAddNewEntry.style.visibility = "hidden";
    btnBack.style.visibility = "hidden";

    btnSignOut.onmousedown = btnSignOut_onmousedown;

    btnSignOut.style.visibility = "hidden";

    btnDateWorked.onmousedown = btnDateWorked_onmousedown;
    btnProject.onmousedown = btnProject_onmousedown;
    btnTask.onmousedown = btnTask_onmousedown;
    btnActivity.onmousedown = btnActivity_onmousedown;
    btnHoursWorked.onmousedown = btnHoursWorked_onmousedown;

    btnSave.onmousedown = btnSave_onmousedown;
    btnSave.onmouseup = btnSave_onmouseup;

    cbxBillable.onmousedown = cbxBillable_onmousedown;
    cbxBillable.Value = "on";

    cbxPayable.onmousedown = cbxPayable_onmousedown;
    cbxPayable.Value = "on";

    entryOptionsList.style.left = window.innerWidth.toString() + "px";

    gEntriesList = [];

    addDefaultDates();

    gResponseString = "";

    autoSignIn();

    window_onresize();
}

function txtDescription_onfocus() {
    btnDateWorked.style.visibility = "hidden";
    btnProject.style.visibility = "hidden";
    btnActivity.style.visibility = "hidden";
    btnTask.style.visibility = "hidden";
    btnHoursWorked.style.visibility = "hidden";
    cbxPayable.style.visibility = "hidden";
    lblPayable.style.visibility = "hidden";
    cbxBillable.style.visibility = "hidden";
    lblBillable.style.visibility = "hidden";
    btnSave.style.visibility = "hidden";
    btnBack.style.visibility = "hidden";
    txtDescription.Focused = true;

    txtDescription.style.top = "20px";
}
function txtDescription_onblur() {
    btnDateWorked.style.visibility = "visible";
    btnProject.style.visibility = "visible";
    btnActivity.style.visibility = "visible";
    btnTask.style.visibility = "visible";
    btnHoursWorked.style.visibility = "visible";
    cbxPayable.style.visibility = "visible";
    lblPayable.style.visibility = "visible";
    cbxBillable.style.visibility = "visible";
    lblBillable.style.visibility = "visible";
    btnSave.style.visibility = "visible";
    btnBack.style.visibility = "visible";
    txtDescription.Focused = false;

    window_onresize();
}

function cbxPayable_onmousedown() {
    if (cbxPayable.Value === "on") {
        cbxPayable.innerHTML = "<img src=\"Images/UncheckedCheckbox20.png\"/>";
        cbxPayable.Value = "off";
    } else {
        cbxPayable.innerHTML = "<img src=\"Images/CheckedCheckbox20.png\"/>";
        cbxPayable.Value = "on";
    }
}

function cbxBillable_onmousedown() {
    if (cbxBillable.Value === "on") {
        cbxBillable.innerHTML = "<img src=\"Images/UncheckedCheckbox20.png\"/>";
        cbxBillable.Value = "off";
    } else {
        cbxBillable.innerHTML = "<img src=\"Images/CheckedCheckbox20.png\"/>";
        cbxBillable.Value = "on";
    }
}

function cbxRememberPassword_onmousedown() {
    if (cbxRememberPassword.Value === "on") {
        cbxRememberPassword.innerHTML = "<img src=\"Images/UncheckedCheckbox20.png\"/>";
        cbxRememberPassword.Value = "off";
    } else {
        cbxRememberPassword.innerHTML = "<img src=\"Images/CheckedCheckbox20.png\"/>";
        cbxRememberPassword.Value = "on";
    }
}


function btnForgotPassword_onmousedown() {
    if (txtTeamName.value.trim() === "") {
        showErrorMessage("Team name required.", txtTeamName);
        return;
    }
    if (txtEmail.value.trim() === "") {
        showErrorMessage("Email address required.", txtEmail);
        return;
    }
}

function autoSignIn() {
    txtEmail.value = ditStorageGet('email', "");
    txtTeamName.value = ditStorageGet('teamName', "");
    cbxRememberPassword.Value = ditStorageGet('cbxValue', "off");
    gAuthToken = ditStorageGet('authToken', "");

    if (cbxRememberPassword.Value === "on") {
        cbxRememberPassword.innerHTML = "<img src=\"Images/CheckedCheckbox20.png\"/>";

        gUser = serverTokenSignIn(gAuthToken);

        if (gServerErrorMsg != "") {
            showErrorMessage(gServerErrorMsg);
            return;
        }

        callbackSignIn(gUser);
    }
    else {
        cbxRememberPassword.innerHTML = "<img src=\"Images/UncheckedCheckbox20.png\"/>";
    }
}

function validateEntryInput() {
    if (selectedDateWorked.innerHTML === "") {
        showErrorMessage("Date is required.", null);
        return false;
    }
    if (selectedProject.innerHTML === "") {
        showErrorMessage("Project is required.", null);
        return false;
    }
    if (selectedTask.innerHTML === "") {
        showErrorMessage("Task is required.", null);
        return false;
    }
    if (selectedActivity.innerHTML === "") {
        showErrorMessage("Activity is required.", null);
        return false;
    }
    if (selectedHoursWorked.innerHTML === "" || parseFloat(selectedHoursWorked.innerHTML) === 0.00) {
        showErrorMessage("Hours worked is required.", null);
        return false;
    }

    if (txtDescription.value.trim() === "") {
        showErrorMessage("Description is required.");
        return false;
    }

    return true;

}

function btnAddNewEntry_onmousedown() {
    inputInformation.style.visibility = "visible";
    btnBack.style.visibility = "visible";

    inputInformation.style.left = "0px";
    showEntries.style.left = (-1 * window.innerWidth).toString() + "px";
    btnAddNewEntry.style.visibility = "hidden";
    btnSignOut.style.visibility = "hidden";
    btnBack.style.visibility = "visible";

    entryOptionsList.style.visibility = "hidden";

    showEntries.style.visibility = "hidden";

    inputInformation.EntryToEdit = null;

    cbxBillable.Value = "on";
    cbxPayable.Value = "on";

    cbxPayable.innerHTML = "<img src=\"Images/CheckedCheckbox20.png\"/>";
    cbxBillable.innerHTML = "<img src=\"Images/CheckedCheckbox20.png\"/>";
}

function entryListElement_onmousedown() {
    btnAddNewEntry.style.visibility = "hidden";
    btnSignOut.style.visibility = "hidden";
    btnBack.style.visibility = "visible";
    inputInformation.style.visibility = "visible";
    inputInformation.style.left = "0px";
    showEntries.style.left = (-1 * window.innerWidth).toString() + "px";

    entryOptionsList.style.visibility = "hidden";

    showEntries.style.visibility = "hidden";

    restoreEntryPage(this.entryToBeEditted);
}

function btnSave_onmouseup() {
    btnSave.style.backgroundColor = "#1588C7";
}

function btnSave_onmousedown() {
    btnSave.style.backgroundColor = "#BADCEF";

    if (validateEntryInput() === false) {
        btnSave.style.backgroundColor = "#1588C7";
        return;
    }

    var entry = inputInformation.EntryToEdit;

    if (inputInformation.EntryToEdit === null) {
        entry = new TimeLogEntry();
    }

    if (inputInformation.EntryToEdit === null) {

        var billable = (cbxBillable.Value === "on" ? true : false);
        var payable = (cbxPayable.Value === "on" ? true : false);

        var newEntry = serverInsertEntry(gUser.UserID, selectedProject.ProjectID,
            selectedTask.TaskID, selectedActivity.ActivityID, parseFloat(selectedHoursWorked.innerHTML),
            selectedDateWorked.innerHTML, txtDescription.value, 
            billable, payable, gAuthToken);

        if (gServerErrorMsg != "") {
            showErrorMessage(gServerErrorMsg);
            return;
        }

        newEntry.FirstName = gUser.FirstName;
        newEntry.LastName = gUser.LastName;

        gEntriesList.push(newEntry);
    } else {
        var billable = (cbxBillable.Value === "on" ? true : false);
        var payable = (cbxPayable.Value === "on" ? true : false);

        entry.ProjectID = selectedProject.ProjectID;
        entry.TaskID = selectedTask.TaskID;
        entry.ActivityID = selectedActivity.ActivityID;

        var newEntry = serverUpdateEntry(entry.EntryID, gUser.UserID, entry.ProjectID,
            entry.TaskID, entry.ActivityID, parseFloat(selectedHoursWorked.innerHTML),
            selectedDateWorked.innerHTML, txtDescription.value,
            billable, payable, entry.LastMaintUTC, gAuthToken);

        if (gServerErrorMsg != "") {
            showErrorMessage(gServerErrorMsg);
            
        } else {
            newEntry.FirstName = gUser.FirstName;
            newEntry.LastName = gUser.LastName;

            for (var i = 0; i < gEntriesList.length; i++) {
                if (gEntriesList[i].EntryID === newEntry.EntryID) {
                    gEntriesList[i] = newEntry;
                }
            }
        }
    }

    btnBack_onmousedown();

    clearEntryPage();

    btnRefresh_onmousedown();
}

function clearEntryPage() {
    selectedActivity.innerHTML = "";
    selectedDateWorked.innerHTML = "";
    selectedHoursWorked.innerHTML = "";
    selectedProject.innerHTML = "";
    txtDescription.value = "";
    selectedTask.innerHTML = "";

    cbxBillable.checked = false;
    cbxPayable.checked = false;
}

function btnRefresh_onmousedown() {
    var beginDate = gStartDate.ToYearMonthDayString();
    var endDate = gEndDate.ToYearMonthDayString();

    gEntriesList = serverGetEntries(gUser.UserID, "", "", "", 0,
        0, beginDate, endDate, "", "", "", false, gAuthToken);

    if (gServerErrorMsg != "") {
        showErrorMessage(gServerErrorMsg);
        return;
    }

    if (gEntriesList.length === 0) {
        showErrorMessage("No entries found.", null);
        return;
    }

    displayAllEntries();
}

function dateOption_onmousedown() {
    entryOptionsList.style.visibility = "hidden";
    entryOptionsList.style.left = window.innerWidth.toString() + "px";
    inputInformation.style.left = "0px";
    inputInformation.style.visibility = "visible";
    this.style.backgroundColor = "#E0E0E0";
    btnDateWorked.style.backgroundColor = "#FFFFFF";
    var formattedDate = this.innerHTML.split(" ");
    selectedDateWorked.innerHTML = formattedDate[0];
    btnBack.style.visibility = "visible";
}

function btnBack_onmousedown() {
    if (inputInformation.style.visibility === "hidden") {
        entryOptionsList.style.visibility = "hidden";
        entryOptionsList.style.left = window.innerWidth.toString() + "px";
        inputInformation.style.left = "0px";
        inputInformation.style.visibility = "visible";
        btnDateWorked.style.backgroundColor = "#FFFFFF";
        btnActivity.style.backgroundColor = "#FFFFFF";
        btnHoursWorked.style.backgroundColor = "#FFFFFF";
        btnProject.style.backgroundColor = "#FFFFFF";
        btnTask.style.backgroundColor = "#FFFFFF";
    }
    else {
        showEntries.style.visibility = "visible";
        btnSave.style.backgroundColor = "#1588C7";
        showEntries.style.visibility = "visible";
        showEntries.style.left = "0px";
        inputInformation.style.left = window.innerWidth.toString() + "px";
        inputInformation.style.visibility = "hidden";
        btnAddNewEntry.style.visibility = "visible";
        btnSignOut.style.visibility = "visible";
        btnBack.style.visibility = "hidden";
        clearEntryPage();
    }
}

function btnDateWorked_onmousedown() {
    btnDateWorked.style.backgroundColor = "#E0E0E0";
    entryOptionsList.style.visibility = "visible";
    entryOptionsList.style.left = "0px";
    inputInformation.style.left = -1 * window.innerWidth.toString() + "px";
    inputInformation.style.visibility = "hidden";

    displayDateWorkedOptions();
}



function btnActivity_onmousedown() {
    btnActivity.style.backgroundColor = "#E0E0E0";
    entryOptionsList.style.visibility = "visible";
    entryOptionsList.style.left = "0px";
    inputInformation.style.left = -1 * window.innerWidth.toString() + "px";
    inputInformation.style.visibility = "hidden";
    displayActivityOptions(gActivities, activityOption_onmousedown);
}

function btnHoursWorked_onmousedown() {
    btnHoursWorked.style.backgroundColor = "#E0E0E0";
    entryOptionsList.style.left = "0px";
    entryOptionsList.style.visibility = "visible";
    inputInformation.style.left = -1 * window.innerWidth.toString() + "px";
    inputInformation.style.visibility = "hidden";

    displayHoursWorkedOptions();
}

function btnTask_onmousedown() {
    if (selectedProject.innerHTML === "") {
        showErrorMessage("Select a project.", btnSave);
        btnTask.style.backgroundColor = "#FFFFFF";
        inputInformation.style.visibility = "visible";
        entryOptionsList.style.left = window.innerWidth.toString() + "px";
        entryOptionsList.style.visibility = "hidden";
        inputInformation.style.left = "0px";

        btnBack.style.visibility = "visible";
        return;
    }
    btnTask.style.backgroundColor = "#E0E0E0";
    entryOptionsList.style.left = "0px";
    entryOptionsList.style.visibility = "visible";
    inputInformation.style.left = -1 * window.innerWidth.toString() + "px";
    inputInformation.style.visibility = "hidden";
    gTopTask = 0;
    entryOptionsList.innerHTML = "";

    displayTasks(gTasks, 0);
}

function btnProject_onmousedown() {
    btnProject.style.backgroundColor = "#E0E0E0";
    entryOptionsList.style.left = "0px";
    entryOptionsList.style.visibility = "visible";
    inputInformation.style.left = -1 * window.innerWidth.toString() + "px";
    inputInformation.style.visibility = "hidden";

    initializeProjectOptionsListAndSearch();
}

function hoursWorkedOption_onmousedown() {
    inputInformation.style.visibility = "visible";
    entryOptionsList.style.left = window.innerWidth.toString() + "px";
    inputInformation.style.left = "0px";
    this.style.backgroundColor = "#E0E0E0";
    entryOptionsList.style.visibility = "hidden";
    btnHoursWorked.style.backgroundColor = "#FFFFFF";
    selectedHoursWorked.innerHTML = this.innerHTML;
    btnBack.style.visibility = "visible";
}

function displayHoursWorkedOptions() {
    var i = 0.25;
    var counter = 0;
    
    entryOptionsList.innerHTML = "";

    while (i <= 4) {
        var hoursOption = document.createElement('div');
        hoursOption.id = "entryOption";
        hoursOption.style.width = window.innerWidth.toString() + "px";
        hoursOption.style.top = (50 * counter).toString() + "px";
        hoursOption.onmousedown = hoursWorkedOption_onmousedown;
        hoursOption.innerHTML = formatNumberToTwoDecimalPlaces(i);
        entryOptionsList.appendChild(hoursOption);
        i = i + 0.25;
        counter += 1;
    }
}

function getProjectsAndActivitesFromServer() {
    gProjects = serverGetProjects(gAuthToken, false);
    if (gServerErrorMsg != "") {
        showErrorMessage(gServerErrorMsg + "project");
    }
    gActivities = serverGetActivities(gAuthToken, false);
    if (gServerErrorMsg != "") {
        showErrorMessage(gServerErrorMsg + "activities");
    }
}

function projectOption_onmousedown() {
    entryOptionsList.style.visibility = "hidden";
    entryOptionsList.style.left = window.innerWidth.toString() + "px";
    inputInformation.style.left = "0px";
    inputInformation.style.visibility = "visible";
    this.style.backgroundColor = "#E0E0E0";
    btnProject.style.backgroundColor = "#FFFFFF";
    var project = this.innerHTML;
    selectedProject.innerHTML = project;
    selectedProject.ProjectID = this.TypeID;
    btnBack.style.visibility = "visible";

    selectedTask.innerHTML = "";

    gTasks = serverGetTasks(gAuthToken, this.TypeID, false);

    initializeTasksHeirarchy(gTasks, 0);

    if (gServerErrorMsg != "") {
        showErrorMessage(gServerErrorMsg);
    }
}

function initializeTasksHeirarchy(tasksList, level) {
    for (var i = 0; i < tasksList.length; i++) {
        tasksList[i].ShowChildren = false;

        if (tasksList[i].SubTasks.length === 0) {
            tasksList[i].IsBottom = true;
        } else {
            tasksList[i].IsBottom = false;
            initializeTasksHeirarchy(tasksList[i].SubTasks, level + 1);
        }
    }
}

function displayTasks(tasksList, level) {
    if (tasksList.length === 0) {
        return;
    }
    for (var i = 0; i < tasksList.length; i++) {
        var taskOption = document.createElement('div');
        taskOption.id = "taskOption";
        taskOption.style.width = window.innerWidth.toString() + "px";
        taskOption.style.top = gTopTask.toString() + "px";
        taskOption.SubTasks = tasksList[i].SubTasks;

        var taskOptionText = document.createElement('div');
        taskOptionText.id = 'taskOptionText';
        taskOptionText.innerHTML = tasksList[i].TaskTitle;
        taskOptionText.style.left = (30 * level + 60).toString() + "px";
        taskOptionText.style.right = "0px";
        taskOptionText.onmousedown = taskOption_onmousedown;
        taskOptionText.TypeID = tasksList[i].TaskID;
        taskOptionText.TaskTitle = tasksList[i].TaskTitle;

        if (tasksList[i].IsBottom === false) {
            var taskOptionButton = document.createElement('div');
            taskOptionButton.id = "taskOptionButton";
            taskOptionButton.Task = tasksList[i];
            if (tasksList[i].ShowChildren === true) {
                taskOptionButton.innerHTML = "<img src=\"Images/Collapse30.png\">"
            } else {
                taskOptionButton.innerHTML = "<img src=\"Images/Expand30.png\">"
            }
            taskOptionButton.style.left = (30 * level + 10).toString() + "px";
            taskOptionButton.onmousedown = taskOptionButton_onmousedown;
            taskOption.appendChild(taskOptionButton);
        }
        
        taskOption.appendChild(taskOptionText);

        entryOptionsList.appendChild(taskOption);

        gTopTask += 50

        if (tasksList[i].ShowChildren === true) {
            displayTasks(tasksList[i].SubTasks, level + 1);
        }
    }
}

function taskOptionButton_onmousedown() {
    if (this.Task.ShowChildren === true) {
        this.Task.ShowChildren = false;
    }
    else {
        this.Task.ShowChildren = true;
    }
    gTopTask = 0;
    entryOptionsList.innerHTML = "";

    displayTasks(gTasks, 0);
}

function initializeProjectOptionsListAndSearch() {
    entryOptionsList.innerHTML = "";

    var projectSearch = document.createElement('input');
    projectSearch.id = "searchProjects";
    projectSearch.type = "text";
    projectSearch.style.width = window.innerWidth.toString() + "px";
    projectSearch.style.paddingLeft = "5px";
    projectSearch.placeholder = "Search projects...";
    projectSearch.style.height = "47px";
    projectSearch.style.borderStyle = "hidden";
    projectSearch.style.borderBottomStyle = "solid";
    projectSearch.style.borderBottomWidth = "1px";
    projectSearch.style.borderColor = "#808080";

    entryOptionsList.appendChild(projectSearch);

    projectOptionsList = document.createElement('div');
    projectOptionsList.id = "projectOptions";
    projectOptionsList.style.width = window.innerWidth.toString() + "px";
    projectOptionsList.style.height = (window.innerHeight - 94).toString() + "px"
    projectOptionsList.style.top = "50px";

    entryOptionsList.appendChild(projectOptionsList);

    filterDisplayProjects("");

    projectSearchOnWait();

    function filterDisplayProjects(searchString) {
        projectOptionsList.innerHTML = "";

        var numberAdded = 0;

        for (var i = 0; i < gProjects.length; i++) {
            if (gProjects[i].ProjectTitle.toLowerCase().indexOf(searchString) != -1) {
                var projectOption = document.createElement('div');
                projectOption.id = "entryOption";
                projectOption.style.width = window.innerWidth.toString() + "px";
                projectOption.style.top = (50 * numberAdded).toString() + "px";
                projectOption.style.paddingLeft = "15px";
                projectOption.style.textAlign = "left";
                projectOption.onmousedown = projectOption_onmousedown;
                projectOption.TypeID = gProjects[i].ProjectID;
                projectOption.innerHTML = gProjects[i].ProjectTitle;

                projectOptionsList.appendChild(projectOption);
                numberAdded++;
            }
        }
    }

    function projectSearchOnWait() {
        projectSearch.SearchPause = filterDisplayProjects;

        projectSearch.onkeydown = timerEnd;

        function timerStart() {
            projectSearch.TimeoutID = setTimeout(search, 600);
        }

        function search() {
            searchText = projectSearch.value.toLowerCase();
            projectSearch.SearchPause(searchText);
        }

        function timerEnd() {
            clearTimeout(projectSearch.TimeoutID);
            timerStart();
        }
    }
}

function displayActivityOptions(array, function_onmousdown) {
    entryOptionsList.innerHTML = "";
    for (var i = 0; i < array.length; i++) {
        var activityOption = document.createElement('div');
        activityOption.id = "entryOption";
        activityOption.style.width = window.innerWidth.toString() + "px";
        activityOption.style.top = (50 * i).toString() + "px";
        activityOption.style.textAlign = "left";
        activityOption.style.paddingLeft = "15px";
        activityOption.onmousedown = function_onmousdown;
        activityOption.TypeID = array[i].ActivityID;
        activityOption.innerHTML = array[i].ActivityTitle;

        entryOptionsList.appendChild(activityOption);
    }
}

function taskOption_onmousedown() {
    inputInformation.style.visibility = "visible";
    entryOptionsList.style.left = window.innerWidth.toString() + "px";
    inputInformation.style.left = "0px";
    entryOptionsList.style.visibility = "hidden";
    this.style.backgroundColor = "#E0E0E0";
    btnTask.style.backgroundColor = "#FFFFFF";
    var task = this.TaskTitle;
    selectedTask.innerHTML = task;
    selectedTask.TaskID = this.TypeID;
    btnBack.style.visibility = "visible";
}

function activityOption_onmousedown() {
    inputInformation.style.visibility = "visible";
    entryOptionsList.style.left = window.innerWidth.toString() + "px";
    inputInformation.style.left = "0px";
    this.style.backgroundColor = "#E0E0E0";
    entryOptionsList.style.visibility = "hidden";
    btnActivity.style.backgroundColor = "#FFFFFF";
    var activity = this.innerHTML;
    selectedActivity.innerHTML = activity;
    selectedActivity.ActivityID = this.TypeID;
    btnBack.style.visibility = "visible";
}

function displayDateWorkedOptions() {
    var dateToday = new dmDate();

    entryOptionsList.innerHTML = "";

    for (var i = 0; i < 14; i++) {
        var dateOption = document.createElement('div');
        dateOption.id = "entryOption";
        dateOption.style.width = window.innerWidth.toString() + "px";
        dateOption.style.top = (50 * i).toString() + "px";
        dateOption.style.paddingLeft = "15px";
        dateOption.onmousedown = dateOption_onmousedown;
        dateOption.innerHTML = dateToday.NumberOfDaysFromTodayString(i * -1);

        entryOptionsList.appendChild(dateOption);
    }
}

function formatNumberToTwoDecimalPlaces(number) {
    if (number % 1 === 0) {
        return number.toString() + ".00";
    }
    if (number * 10 % 1 === 0) {
        return number.toString() + "0";
    }
    return number.toString();
}

function btnSignOut_onmousedown() {
    btnSignOut.style.color = "#BADCEF";

    localStorage.clear();

    serverSignOut(gAuthToken);

    btnSignOut.style.color = "#1588C7";

    if (gServerErrorMsg != "") {
        showErrorMessage(gServerErrorMsg);
        return;
    }

    cbxRememberPassword.innerHTML = "<img src=\"Images/UncheckedCheckbox20.png\"/>";

    divSignIn.style.visibility = "visible";
    btnAddNewEntry.style.visibility = "hidden";
    btnSignOut.style.visibility = "hidden";
}

function btnSignIn_onmousedown() {
    if (validateSignInPage() === false) {
        return;
    }

    gUser = serverSignIn(txtTeamName.value, txtEmail.value, txtPassword.value);

    if (gServerErrorMsg != "") {
        showErrorMessage(gServerErrorMsg);
        return;
    }

    callbackSignIn(gUser);
}


function callbackSignIn(gUser) {
    gAuthToken = gUser.AuthToken;

    btnSignIn.style.backgroundColor = "#1588C7";

    if (cbxRememberPassword.Value === "on") {
        storeCredentials();
    }   
    else {
        localStorage.clear();
    }

    txtTeamName.value = "";
    txtPassword.value = "";
    txtEmail.value = "";
    cbxRememberPassword.innerHTML = "<img src=\"Images/UncheckedCheckbox20.png\"/>";

    divSignIn.style.visibility = "hidden";
    entryOptionsList.style.visibility = "hidden";
    inputInformation.style.visibility = "hidden";

    btnAddNewEntry.style.visibility = "visible";
    btnSignOut.style.visibility = "visible";

    getProjectsAndActivitesFromServer();

    entriesList.innerHTML = "";

    btnRefresh_onmousedown();
}

function storeCredentials() {
    localStorage.email = txtEmail.value;
    localStorage.teamName = txtTeamName.value;
    localStorage.authToken = gAuthToken;
    localStorage.cbxValue = "on";
}

function ditStorageGet(key, dfltValue) {
    var value = localStorage.getItem(key);
    if (value == undefined) {
        return dfltValue;
    }
    return value;
}

function validateSignInPage() {
    if (txtTeamName.value.trim() === "") {
        showErrorMessage("Team name is required.", txtTeamName);
        return false;
    }
    if (txtEmail.value.trim() === "") {
        showErrorMessage("Email address is required.", txtEmail);
        return false;
    }
    if (txtPassword.value === "") {
        showErrorMessage("Password is required.", txtPassword);
        return false;
    }

    return true;
}


function btnSignIn_onmouseup() {
    btnSignIn.style.backgroundColor = "#1588C7";
}

function addDefaultDates() {
    var todayDate = new Date();
    var  twoWeeksAgo = new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate() - 14);

    gEndDate = new dmDate(todayDate.getFullYear(), todayDate.getMonth() + 1, todayDate.getDate());
    gStartDate = new dmDate(twoWeeksAgo.getFullYear(), twoWeeksAgo.getMonth() + 1, twoWeeksAgo.getDate());

    showDateRange.innerHTML = gStartDate.ToMonthNameDayYearString() + " - Today " + gEndDate.ToMonthNameDayYearString();
}

function displayAllEntries() {
    entriesList.innerHTML = "";

    gTotalHours = 0;
    gTodayHours = 0;

    for (var i = 0; i < gEntriesList.length; i++) {
        addEntryToList(gEntriesList[i], i);
    }

    lblTodayHours.innerHTML = formatNumberToTwoDecimalPlaces(gTodayHours);
    lblTotalHours.innerHTML = formatNumberToTwoDecimalPlaces(gTotalHours);
}

function updateFormatUpdateDateWorked(serializedDate) {
    var date = serializedDate.split("T")[0];
    date = date.split("-");

    return parseInt(date[1]) + "/" + parseInt(date[2]) + "/" + date[0];
}

function restoreEntryPage(entry) {
    selectedActivity.innerHTML = entry.ActivityTitle;
    selectedActivity.ActivityID = entry.ActivityID;

    selectedDateWorked.innerHTML = updateFormatUpdateDateWorked(entry.DateWorked);

    selectedHoursWorked.innerHTML = entry.HoursWorked;
    selectedProject.innerHTML = entry.ProjectTitle;
    selectedProject.ProjectID = entry.ProjectID;
    txtDescription.value = entry.EntryDescription;
    selectedTask.innerHTML = entry.TaskTitle;
    selectedTask.TaskID = entry.TaskID;

    if (entry.BillableIndicator === true) {
        cbxBillable.Value = "on";
        cbxBillable.innerHTML = "<img src=\"Images/CheckedCheckbox20.png\"/>";
    } else {
        cbxBillable.Value = "off";
        cbxBillable.innerHTML = "<img src=\"Images/UncheckedCheckbox20.png\"/>";
    }

    if (entry.PayableIndicator === true) {
        cbxPayable.Value = "on";
        cbxPayable.innerHTML = "<img src=\"Images/CheckedCheckbox20.png\"/>";
    } else {
        cbxPayable.Value = "off";
        cbxPayable.innerHTML = "<img src=\"Images/UncheckedCheckbox20.png\"/>";
    }

    inputInformation.EntryToEdit = entry;
}

function addEntryToList(entry, i) {
    var entryDiv = document.createElement('div');
    entryDiv.id = "entriesListElement";
    entryDiv.style.width = (window.innerWidth - 80).toString();
    entryDiv.EntryIndex = i;

    addEventToListElement(entryDiv);

    entryDiv.onmousedown = entryListElement_onmousedown;
    entryDiv.entryToBeEditted = entry;


    var entryDivName = document.createElement('div');
    entryDivName.id = "entryProjectName";
    entryDivName.style.top = (81 * i + 3).toString() + "px";
    entryDivName.innerHTML = entry.ProjectTitle;

    var entryDivTaskName = document.createElement('div');
    entryDivTaskName.id = "entryTaskName";
    entryDivTaskName.style.top = (81 * i + 25).toString() + "px";
    entryDivTaskName.innerHTML = entry.TaskTitle;

    var entryDivDateWorked = document.createElement('div');
    entryDivDateWorked.id = "entryDateWorked";
    entryDivDateWorked.style.top = (81 * i + 3).toString() + "px";
    
    entryDivDateWorked.innerHTML = compareDateToEndDate(entry.DateWorked, entry.HoursWorked);

    var entryDivHoursWorked = document.createElement('div');
    entryDivHoursWorked.id = "entryHoursWorked";
    entryDivHoursWorked.style.top = (81 * i + 53).toString() + "px";
    entryDivHoursWorked.innerHTML = formatNumberToTwoDecimalPlaces(entry.HoursWorked);

    var entryDivDescription = document.createElement('div');
    entryDivDescription.id = "entryDescription";
    entryDivDescription.style.top = (81 * i + 45).toString() + "px";
    entryDivDescription.innerHTML = entry.EntryDescription;
    entryDivDescription.style.width = (window.innerWidth - 70).toString() + "px"

    entryDiv.appendChild(entryDivName);
    entryDiv.appendChild(entryDivTaskName);
    entryDiv.appendChild(entryDivDateWorked);
    entryDiv.appendChild(entryDivHoursWorked);
    entryDiv.appendChild(entryDivDescription);

    entriesList.appendChild(entryDiv);
}

function compareDateToEndDate(serializedDate, hours) {
    serializedDate = serializedDate.split("T")[0];

    serializedDate = serializedDate.replace(/-/g, "/");

    var compareDate = gEndDate.ToYearMonthDayString();

    if (serializedDate === compareDate) {
        gTodayHours += hours;
        gTotalHours += hours;
    } else {
        gTotalHours += hours;
    }

    var dateParts = serializedDate.split("/");
    var formattedString = "";
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    formattedString += months[dateParts[1] - 1] + " " + dateParts[2] + ", " + dateParts[0];

    return formattedString;
}

function showErrorMessage(message, objectToFocus) {
    errorMessageMain.style.visibility = 'visible';
    inputInformation.style.pointerEvents = 'none';

    var fontSize = (window.innerWidth / 3) / 10;
    errorMessageString.style.fontSize = fontSize.toString() + "px";
    errorMessageString.innerHTML = message;

    errorMessageMain.ObjectToFocus = objectToFocus;
}

function btnErrorMessageOK_onmousedown() {
    errorMessageMain.style.visibility = 'hidden';
    inputInformation.style.pointerEvents = 'all';

    if (errorMessageMain.ObjectToFocus != null) {
        window.setTimeout(function () {
            errorMessageMain.ObjectToFocus.focus();
        }, 0);
    }
}

function isTouchDevice() {
    return "ontouchstart" in window;
}

function addEventToListElement(object, eventFunction) {
    if (isTouchDevice() === true) {
        object.ontouchstart = entryDiv_onpress;
        object.ontouchend = entryDiv_onblur;
    }
    else {
        object.onmousedown = entryDiv_onpress;
        object.onmouseup = entryDiv_onblur;
    }

    function entryDiv_onblur() {
        object.style.backgroundColor = "#FFFFFF";
    }

    function entryDiv_onpress() {
        object.style.backgroundColor = "#E0E0E0";
    }
}

function checkIfStringIsNumber(numberString) {
    var checkDigits = numberString.split("");
    if (checkDigits.length === 0) {
        return false;
    }
    var checkNumbers = new RegExp('[0-9]');

    for (var i = 0; i < checkDigits.length; i++) {
        if (checkNumbers.test(checkDigits[i]) === false) {
            return false;
        }
    }
    return true;
}


function addEntryPanel_onresize() {
    var pageHeight = window.innerHeight - 44;

    inputInformation.style.width = window.innerWidth.toString() + "px";
    inputInformation.style.height = pageHeight.toString() + "px";

    btnDateWorked.style.width = (window.innerWidth).toString() + "px";
    btnDateWorked.style.top = (0.25 * pageHeight / 12).toString() + "px";
    btnDateWorked.style.height = (1 * pageHeight / 12 - 5).toString() + "px";

    btnProject.style.width = (window.innerWidth).toString() + "px";
    btnProject.style.top = (1.25 * pageHeight / 12).toString() + "px";
    btnProject.style.height = (1 * pageHeight / 12 - 5).toString() + "px";

    btnTask.style.width = (window.innerWidth).toString() + "px";
    btnTask.style.top = (2.25 * pageHeight / 12).toString() + "px";
    btnTask.style.height = (1 * pageHeight / 12 - 5).toString() + "px";

    btnActivity.style.width = (window.innerWidth).toString() + "px";
    btnActivity.style.top = (3.25 * pageHeight / 12).toString() + "px";
    btnActivity.style.height = (1 * pageHeight / 12 - 5).toString() + "px";

    btnHoursWorked.style.width = (window.innerWidth).toString() + "px";
    btnHoursWorked.style.top = (4.25 * pageHeight / 12).toString() + "px";
    btnHoursWorked.style.height = (1 * pageHeight / 12 - 5).toString() + "px";

    lblPayable.style.top = (5.3 * pageHeight / 12 + 0.5).toString() + "px";
    cbxPayable.style.top = (5.3 * pageHeight / 12).toString() + "px";

    lblBillable.style.top = (5.3 * pageHeight / 12 + 0.5).toString() + "px";
    cbxBillable.style.top = (5.3 * pageHeight / 12).toString() + "px";

    if (txtDescription.Focused === false) {
        txtDescription.style.top = (6.1 * pageHeight / 12).toString() + "px";
        txtDescription.style.height = (4.5 * pageHeight / 12).toString() + "px";
        txtDescription.style.width = (window.innerWidth - 40).toString() + "px";
    }

    btnSave.style.width = (window.innerWidth - 40).toString() + "px";
    btnSave.style.top = (11 * pageHeight / 12).toString() + "px";

    entryOptionsList.style.width = (window.innerWidth).toString() + "px";
    entryOptionsList.style.height = (window.innerHeight - 44).toString() + "px";
}

function window_onresize() {
    divMain.style.width = window.innerWidth.toString() + "px";
    divMain.style.height = window.innerHeight.toString() + "px";
    navbar.style.width = window.innerWidth.toString() + "px";

    //if (entryOptionsList.style.visibility === "visible") {
    //    entryOption.style.width = window.innerWidth.toString() + "px";
    //}

    addEntryPanel_onresize();

    // Sign in page
    signInPage_onresize();

    // Entries page
    showEntriesPanel_onresize();

    // Error Messages
    errorMessageBody_onresize();

    inputInformation_onresize();

    displayAllEntries(gResponseString);
}

function inputInformation_onresize() {
    selectedHoursWorked.style.width = (innerWidth - 120).toString() + "px";
    selectedActivity.style.width = (innerWidth - 120).toString() + "px";
    selectedDateWorked.style.width = (innerWidth - 120).toString() + "px";
    selectedProject.style.width = (innerWidth - 120).toString() + "px";
    selectedTask.style.width = (innerWidth - 120).toString() + "px";
}

function signInPage_onresize() {
    divSignIn.style.height = (window.innerHeight - 44).toString() + "px";
    divSignIn.style.width = (window.innerWidth).toString() + "px";
    btnSignIn.style.width = (window.innerWidth - 40).toString() + "px";
    btnForgotPassword.style.width = (window.innerWidth - 40).toString() + "px";

    txtTeamName.style.width = (window.innerWidth - 52).toString() + "px";
    txtEmail.style.width = (window.innerWidth - 52).toString() + "px";
    txtPassword.style.width = (window.innerWidth - 52).toString() + "px";
}

function showEntriesPanel_onresize() {
    showDateRange.style.width = (window.innerWidth - 10).toString() + "px";
    showEntries.style.width = window.innerWidth.toString() + "px";
    showEntries.style.height = (window.innerHeight - 44).toString() + "px";

    entriesList.style.width = (window.innerWidth).toString() + "px";
    entriesList.style.height = (window.innerHeight - 132).toString() + "px";

    lblTotalHoursText.style.right = (parseFloat(lblTotalHours.clientWidth) + 15).toString() + "px";
}
function errorMessageBody_onresize() {
    errorMessageMain.style.width = window.innerWidth.toString() + "px";
    errorMessageMain.style.height = window.innerHeight.toString() + "px";
    errorMessageBody.style.top = (window.innerHeight / 3).toString() + "px";
    errorMessageBody.style.left = (window.innerWidth / 3).toString() + "px";
    errorMessageBody.style.height = (window.innerHeight / 3).toString() + "px";
    errorMessageBody.style.width = (window.innerWidth / 3).toString() + "px";

    btnErrorMessageOK.style.width = (window.innerWidth / 3).toString() + "px";
}