﻿/// <reference path="Index.html">

var gResponseString;

function body_load() {
    window.onresize = window_onresize;
    btnAddNewEntry.onmousedown = btnAddNewEntry_onmousedown;
    btnBack.onmousedown = btnBack_onmousedown;
    btnRefresh.onmousedown = btnRefresh_onmousedown;
    btnRefresh.onmouseup = btnRefresh_onmouseup;
    btnErrorMessageOK.onmousedown = btnErrorMessageOK_onmousedown;
    errorMessageMain.style.visibility = 'hidden';
    btnAddNewEntry.style.visibility = "visible";
    btnBack.style.visibility = "hidden";

    addDefaultDates();

    gResponseString = "";

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

    entriesList.style.width = (window.innerWidth).toString() + "px";
    entriesList.style.height = (window.innerHeight - 242).toString() + "px";

    errorMessageMain.style.width = window.innerWidth.toString() + "px";
    errorMessageMain.style.height = window.innerHeight.toString() + "px";
    errorMessageBody.style.top = (window.innerHeight / 3).toString() + "px";
    errorMessageBody.style.left = (window.innerWidth / 3).toString() + "px";
    errorMessageBody.style.height = (window.innerHeight / 3).toString()  + "px";
    errorMessageBody.style.width = (window.innerWidth / 3).toString() + "px";

    btnErrorMessageOK.style.width = (window.innerWidth / 3).toString() + "px";

    gCharactersToShow = (window.innerWidth / 8);

    if (window.innerWidth < 700) {
        gCharactersToShow -= 20;
    }

    displayAllEntries(gResponseString);
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

function btnRefresh_onmousedown() {
    btnRefresh.style.backgroundColor = "#BADCEF";

    if (validateInput() === false) {
        return;
    }

    var url = buildURL();
    gResponseString = httpGet(url);

    var returnStringSplit = gResponseString.split("\t");
    if (returnStringSplit[0] === "error") {
        showErrorMessage(returnStringSplit[1], txtBeginDate);
        return;
    }
    if (returnStringSplit.length === 1) {
        showErrorMessage("No Entries Found", txtBeginDate);
    }

    displayAllEntries(gResponseString);
}

function btnRefresh_onmouseup() {
    btnRefresh.style.backgroundColor = "#1588C7";
}

function displayAllEntries(serializedString) {
    if (serializedString === "") {
        return;
    }

    entriesList.innerHTML = "";

    var entryList = serializedString.split('\n'); // double quotes

    entryList.splice(0, 1);

    for (var i = 0; i < entryList.length - 1; i++) {
        addEntryToList(entryList[i], i)
    }
}

function addEntryToList(serializedEntry, i) {
    var entry = serializedEntry.split('\t');
    var entryDiv = document.createElement('div');
    entryDiv.id = "entriesListElement";
    entryDiv.style.width = (window.innerWidth - 80).toString();
    entryDiv.EntryIndex = i;

    addEventToListElement(entryDiv);

    var entryDivName = document.createElement('div');
    entryDivName.id = "entryName";
    entryDivName.style.top = (81 * i + 3).toString() + "px";
    entryDivName.innerHTML = entry[1];

    var entryDivDateWorked = document.createElement('div');
    entryDivDateWorked.id = "entryDateWorked";
    entryDivDateWorked.style.top = (81 * i + 3).toString() + "px";
    entryDivDateWorked.innerHTML = formatDateForList(entry[2]);

    var entryDivHoursWorked = document.createElement('div');
    entryDivHoursWorked.id = "entryHoursWorked";
    entryDivHoursWorked.style.top = (81 * i + 53).toString() + "px";
    entryDivHoursWorked.innerHTML = entry[3];

    var entryDivDescription = document.createElement('div');
    entryDivDescription.id = "entryDescription";
    entryDivDescription.style.top = (81 * i + 45).toString() + "px";
    entryDivDescription.innerHTML = formatDescriptionForList(entry[5]);
    entryDivDescription.style.width = (4 * window.innerWidth / 5).toString() + "px"

    entryDiv.appendChild(entryDivName);
    entryDiv.appendChild(entryDivDateWorked);
    entryDiv.appendChild(entryDivHoursWorked);
    entryDiv.appendChild(entryDivDescription);

    entriesList.appendChild(entryDiv);
}


function buildURL() {
    var beginDateParts = txtBeginDate.value.trim().split('/');
    var endDateParts = txtEndDate.value.trim().split('/');
    var url = "Server/TimeLogServer.aspx?action=getEntries&beginDate="
        + beginDateParts[0]
        + "-" + beginDateParts[1]
        + "-" + beginDateParts[2]
        + "&endDate="
        + endDateParts[0]
        + "-" + endDateParts[1]
        + "-" + endDateParts[2]
        + "&&maxrows=100";
    return url;
}

// encodeURIComponent

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
    if (description.length > gCharactersToShow) {
        return description.substring(0, gCharactersToShow - 3) + "...";
    }
    return description;
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
    btnRefresh.style.backgroundColor = "#1588C7";
    window.setTimeout(function () {
        errorMessageMain.ObjectToFocus.focus();
    }, 0);
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


function validateInput() {
    var beginDateErrorMessage = "Enter a valid begin date.";
    var endDateErrorMessage = "Enter a valid end date that is no later than today's date.";

    if (tryParseDate(txtBeginDate.value.trim()) === false) {
        showErrorMessage(beginDateErrorMessage, txtBeginDate);
        return false;
    }

    if (tryParseDate(txtEndDate.value.trim()) === false) {
        showErrorMessage(endDateErrorMessage, txtEndDate);
        return false;
    }

    var dateRangeErrorMessage = validateDateRanges();

    if (dateRangeErrorMessage.length != 0) {
        showErrorMessage(dateRangeErrorMessage, txtEndDate);
        return false;
    }

    return true;
}

function validateDateRanges() {
    var endDateAfterTodayErrorMessage = "Enter an end date that is not in the future.";
    var beginDateAfterEndErrorMessage = "Enter a begin date that is not after the end date.";

    var beginDateParts = txtBeginDate.value.trim().split('/');
    var endDateParts = txtEndDate.value.trim().split('/');
    dateToday = new Date();

    if (parseInt(endDateParts[0]) > dateToday.getFullYear()) {
        return endDateAfterTodayErrorMessage;
    }
    if (parseInt(endDateParts[0]) === dateToday.getFullYear()
        && parseInt(endDateParts[1]) > dateToday.getMonth() + 1) {
        return endDateAfterTodayErrorMessage;
    }
    if (parseInt(endDateParts[0]) === dateToday.getFullYear()
        && parseInt(endDateParts[1]) === dateToday.getMonth() + 1
        && parseInt(endDateParts[2]) > dateToday.getDate()) {
        return endDateAfterTodayErrorMessage;
    }

    if (parseInt(endDateParts[0]) < parseInt(beginDateParts[0])) {
        return beginDateAfterEndErrorMessage;
    }
    if (parseInt(endDateParts[0]) === parseInt(beginDateParts[0])
        && parseInt(endDateParts[1]) < parseInt(beginDateParts[1])) {
        return beginDateAfterEndErrorMessage;
    }
    if (parseInt(endDateParts[0]) === parseInt(beginDateParts[0])
        && parseInt(endDateParts[1]) === parseInt(beginDateParts[1])
        && parseInt(endDateParts[2]) < parseInt(beginDateParts[2])) {
        return beginDateAfterEndErrorMessage;
    }

    return "";
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