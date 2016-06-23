/// <reference path="Index.html">

function body_load() {
    window.onresize = window_onresize;
    btnAddNewEntry.onmousedown = btnAddNewEntry_onmousedown;
    btnBack.onmousedown = btnBack_onmousedown;
    btnRefresh.onmousedown = btnRefresh_onmousedown;
    btnAddNewEntry.style.visibility = "visible";
    btnBack.style.visibility = "hidden";
    window_onresize();
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

}

function validateInput() {

}

function showErrorMessage() {

}