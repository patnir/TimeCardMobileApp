/// <reference path="TimeCardv10.html">
function TimeLogEntry() {
    this.EntryID = null; // int
    this.UserID = null; // int
    this.ProjectID = null; // int
    this.TaskTitle = "";
    this.HoursWorked = null; // float
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
    this.AuthToken = "";
}

TimeLogEntry.prototype.Serialize = function () {
    var returnString = JSON.stringify(this);
    return returnString;
}

TimeLogEntry.prototype.Deserialize = function (obj) {
    //var obj = JSON.parse(jsonSerializedEntry);
    this.EntryID = obj.EntryID; // int
    this.UserID = obj.UserID; // int
    this.ProjectID = obj.ProjectID; // int
    this.TaskTitle = obj.TaskTitle;
    this.HoursWorked = obj.HoursWorked; // float

    // Only the date is required, not the time
    this.DateWorked = obj.DateWorked.split(" ")[0];

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