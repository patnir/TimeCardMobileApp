﻿/// <reference path="Index.html">
function clsTimeLogEntry() {
    this.EntryID = null; // int
    this.UserID = null; // int
    this.ProjectID = null; // int
    this.TaskTitle = "";
    this.HoursWorked = 0.00; // float
    this.DateWorked = ""; // string
    this.EntryDescription = ""; // string
    this.ActivityTitle = ""; // string
    this.BillableIndicator = null; // boolean
    this.PayableIndicator = null; // boolean
    this.LastMaintUserID = null; // int
    this.LastMaintUTC = ""; // string 
    this.FirstName = ""; // string
    this.LastName = ""; // string
    this.ProjectTitle = ""; //string
}

clsTimeLogEntry.prototype.Serialize = function () {
    //var obj = {
    //    "EntryID": this.EntryID,
    //    "UserID": this.UserID,
    //    "ProjectID": this.ProjectID,
    //    "TaskTitle": this.TaskTitle,
    //    "HoursWorked": this.HoursWorked,
    //    "DateWorked": this.DateWorked,
    //    "EntryDescription": this.EntryDescription,
    //    "ActivityTitle": this.ActivityTitle,
    //    "BillableIndicator": this.BillableIndicator.toString(),
    //    "PayableIndicator": this.PayableIndicator.toString(),
    //    "LastMaintUserID": this.LastMaintUserID,
    //    "LastMaintUTC": this.LastMaintUTC,
    //    "FirstName": this.FirstName,
    //    "LastName": this.LastName,
    //    "ProjectTitle": this.ProjectTitle
    //};

    var returnString = JSON.stringify(this);
    return returnString;
}

clsTimeLogEntry.prototype.Deserialize = function (obj) {
    //var obj = JSON.parse(jsonSerializedEntry);
    this.EntryID = obj.EntryID; // int
    this.UserID = obj.UserID; // int
    this.ProjectID = obj.ProjectID; // int
    this.TaskTitle = obj.TaskTitle;
    this.HoursWorked = obj.HoursWorked; // float
    this.DateWorked = obj.DateWorked; // string
    this.EntryDescription = obj.EntryDescription; // string
    this.ActivityTitle = obj.ActivityTitle; // string
    this.BillableIndicator = obj.BillableIndicator; // boolean
    this.PayableIndicator = obj.PayableIndicator; // boolean
    this.LastMaintUserID = obj.LastMaintUserID; // int
    this.LastMaintUTC = obj.LastMaintUTC; // string 
    this.FirstName = obj.FirstName; // string
    this.LastName = obj.LastName; // string
    this.ProjectTitle = obj.ProjectTitle; //string
}