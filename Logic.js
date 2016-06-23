/// <reference path="Index.html">

function body_load() {
    window.onresize = window_onresize;
    btnAddNewEntry.onmousedown = btnAddNewEntry_onmousedown;
    btnBack.onmousedown = btnBack_onmousedown;
    btnRefresh.onmousedown = btnRefresh_onmousedown;
    btnErrorMessageOK.onmousedown = btnErrorMessageOK_onmousedown;
    errorMessageMain.style.visibility = 'hidden';
    btnAddNewEntry.style.visibility = "visible";
    btnBack.style.visibility = "hidden";

    addDefaultDates();

    window_onresize();
}

function addDefaultDates() {
    var dateToday = new Date();
    txtEndDate.defaultValue = dateToday.getFullYear() + "/" + (dateToday.getMonth() + 1) + "/" + dateToday.getDate();

    dateToday = new Date(dateToday.getFullYear(), dateToday.getMonth(), dateToday.getDate() - 7);
    txtBeginDate.defaultValue = dateToday.getFullYear() + "/" + (dateToday.getMonth() + 1) + "/" + dateToday.getDate();
}

function window_onresize() {
    divMain.style.width = window.innerWidth.toString() + "px";
    divMain.style.height = window.innerHeight.toString() + "px";
    navbar.style.width = window.innerWidth.toString() + "px";

    showInformation.style.width = window.innerWidth.toString() + "px";
    showInformation.style.height = (window.innerHeight - 44).toString() + "px";
    inputInformation.style.width = window.innerWidth.toString() + "px";
    inputInformation.style.height = (window.innerHeight - 44).toString() + "px";

    txtBeginDate.style.width = (window.innerWidth - 210).toString() + "px";
    txtEndDate.style.width = (window.innerWidth - 210).toString() + "px";

    btnRefresh.style.width = (window.innerWidth - 80).toString() + "px";

    entriesList.style.width = (window.innerWidth - 80).toString() + "px";
    entriesList.style.height = (window.innerHeight - 262).toString() + "px";

    errorMessageMain.style.width = window.innerWidth.toString() + "px";
    errorMessageMain.style.height = window.innerHeight.toString() + "px";
    errorMessageBody.style.top = ((window.innerHeight - 200 + 44) / 2).toString() + "px";
    errorMessageBody.style.left = ((window.innerWidth - 200) / 2).toString() + "px";
}

function btnAddNewEntry_onmousedown() {
    inputInformation.style.left = "0px";
    showInformation.style.left = (-1 * window.innerWidth).toString() + "px";
    btnAddNewEntry.style.visibility = "hidden";
    btnBack.style.visibility = "visible";
}

function btnBack_onmousedown() {
    showInformation.style.left = "0px";
    inputInformation.style.left = window.innerWidth.toString() + "px";
    btnAddNewEntry.style.visibility = "visible";
    btnBack.style.visibility = "hidden";
}

function tryParseDate(dateString) {
    birthDateParts = dateString.split("/");
    if (birthDateParts.length != 3) {
        return false;
    }
    if (checkIfStringIsNumber(birthDateParts[0]) === false
        || checkIfStringIsNumber(birthDateParts[1]) === false
        || checkIfStringIsNumber(birthDateParts[2]) === false) {
        return false;
    }

    var year = parseInt(birthDateParts[0]);
    var month = parseInt(birthDateParts[1]);
    var day = parseInt(birthDateParts[2]);

    if (year < 1 || year > 9999
        || month < 1 || month > 12
        || day < 1 || day > 31) {
        return false;
    }

    // check leap year

    var isLeapYear = false;
    if (year % 4 === 0
        && !(year % 100 === 0 && year % 400 != 0)) {
        isLeapYear = true;
    }
    if (isLeapYear === false && month === 2 && day > 28) {
        return false;
    }
    if (isLeapYear === true && month === 2 && day > 29) {
        return false;
    }

    if ((month === 1
        || month === 3
        || month === 5
        || month === 7
        || month === 8
        || month === 10
        || month === 12) && day > 31) {
        return false;
    }
    else if (day > 30) {
        return false;
    }

    return true;
}

function btnRefresh_onmousedown() {
    if (validateInput() === false) {
        return;
    }

    var url = buildURL();
    var returnString = httpGet(url);

    displayAllEntries(returnString);
}

function displayAllEntries(serializedString) {
    var entryList = serializedString.split('\n');
    entryList.splice(0, 1);
    var entry;
    for (var i = 0; i < entryList.length - 1; i++) {
        addEntryToList(entryList[i], i)
    }
}

function addEntryToList(serializedEntry, i) {
    entry = serializedEntry.split('\t');
    var entryDiv = document.createElement('div');
    entryDiv.id = "entriesListElement";
    entryDiv.style.width = (window.innerWidth - 80).toString();
    entryDiv.EntryIndex = i;

    var entryDivName = document.createElement('div');
    entryDivName.id = "entryName";
    entryDivName.style.top = (80 * i).toString() + "px";
    entryDivName.innerHTML = entry[1];

    var entryDivDateWorked = document.createElement('div');
    entryDivDateWorked.id = "entryDateWorked";
    entryDivDateWorked.style.top = (80 * i).toString() + "px";
    entryDivDateWorked.innerHTML = formatDateForList(entry[2]);

    var entryDivHoursWorked = document.createElement('div');
    entryDivHoursWorked.id = "entryHoursWorked";
    entryDivHoursWorked.style.top = (80 * i + 50).toString() + "px";
    entryDivHoursWorked.innerHTML = entry[3];

    var entryDivDescription = document.createElement('div');
    entryDivDescription.id = "entryDescription";
    entryDivDescription.style.top = (80 * i + 45).toString() + "px";
    entryDivDescription.innerHTML = formatDescriptionForList(entry[5]);

    entryDiv.appendChild(entryDivName);
    entryDiv.appendChild(entryDivDateWorked);
    entryDiv.appendChild(entryDivHoursWorked);
    entryDiv.appendChild(entryDivDescription);

    entriesList.appendChild(entryDiv);
}


function buildURL() {
    var beginDateParts = txtBeginDate.value.trim().split('/');
    var endDateParts = txtEndDate.value.trim().split('/');
    var result = "Server/TimeLogServer.aspx?action=getEntries&beginDate="
        + beginDateParts[0]
        + "-" + beginDateParts[1]
        + "-" + beginDateParts[2]
        + "&endDate="
        + endDateParts[0]
        + "-" + endDateParts[1]
        + "-" + endDateParts[2]
        + "&&maxrows=100";
    return result;
}

function httpGet(theUrl) {
    var xmlHttp = null;
    xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false);
    xmlHttp.send(null);
    return xmlHttp.responseText;
}

function formatDateForList(serializedDate) { // array
    var dateParts = serializedDate.split("/");
    var formattedString = "";
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    formattedString += months[dateParts[0] - 1] + " " + dateParts[1] + ", " + dateParts[2];

    return formattedString;
}

function formatDescriptionForList(description) {
    if (description.length > 30) {
        return description.substring(0, 30);
    }
}

function validateInput() {
    var beginDateErrorMessage = "Enter a valid begin date";
    var endDateErrorMessage = "Enter a valid end date that is no later than today's date";

    if (tryParseDate(txtBeginDate.value.trim()) === false) {
        showErrorMessage(beginDateErrorMessage, txtBeginDate);
        return false;
    }

    if (tryParseDate(txtEndDate.value.trim()) === false) {
        showErrorMessage(endDateErrorMessage, txtEndDate);
        return false;
    }
}

function showErrorMessage(message, objectToFocus) {
    errorMessageMain.style.visibility = 'visible';
    inputInformation.style.pointerEvents = 'none';
    errorMessageString.innerHTML = message;

    errorMessageMain.ObjectToFocus = objectToFocus;
}

function btnErrorMessageOK_onmousedown() {
    errorMessageMain.style.visibility = 'hidden';
    inputInformation.style.pointerEvents = 'all';
    window.setTimeout(function () {
        errorMessageMain.ObjectToFocus.focus();
    }, 0);
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