/// <reference path="Index.html">
function clsTimeLogEntry() {
    this.EntryID = null; // int
    this.UserID = null; // int
    this.ProjectID = null; // int
    this.TaskTitle = "";
    this.HoursWorked = 0.00; // float
    this.DateWorked = ""; // string
    this.EntryDescription = ""; // string
    this.ActivityTitle = ""; // string
    this.BillalbeIndicator = null; // boolean
    this.PayableIndicator = null; // boolean
    this.LastMaintUserID = null; // int
    this.LastMaintUTC = ""; // string 
    this.FirstName = ""; // string
    this.LastName = ""; // string
    this.ProjectTitle = ""; //string
}

clsTimeLogEntry.prototype.Serialize = function () {
    return this.EntryID.toString() + "\t" +
        this.UserID.toString() + "\t" +
        this.ProjectID.toString() + "\t" +
        this.TaskTitle + "\t" +
        this.HoursWorked.toString() + "\t" +
        this.DateWorked + "\t" +
        this.EntryDescription + "\t" +
        this.ActivityTitle + "\t" +
        this.BillalbeIndicator.toString() + "\t" +
        this.PayableIndicator.toString() + "\t" +
        this.LastMaintUserID.toString() + "\t" +
        this.LastMaintUTC + "\t" +
        this.FirstName + "\t" +
        this.LastName + "\t" +
        this.ProjectTitle;
}

clsTimeLogEntry.prototype.Deserialize = function (serializedEntry) {
    var values = serializedEntry.split("\t");
    this.EntryID = parseInt(values[0]);
    this.UserID =  parseInt(values[1]);
    this.ProjectID = parseInt(values[2]);
    this.TaskTitle = values[3];
    this.HoursWorked = parseFloat(values[4]);
    this.DateWorked = values[5];
    this.EntryDescription = values[6];
    this.ActivityTitle = values[7];

    this.BillalbeIndicator = false;
    if (values[8] === "true") {
        this.BillalbeIndicator = true;
    }

    this.PayableIndicator = false;
    if (values[9] === "true") {
        this.PayableIndicator = true;
    }

    this.LastMaintUserID = parseInt(values[10]);
    this.LastMaintUTC = values[11]; 
    this.FirstName = values[12]; 
    this.LastName = values[13]; 
    this.ProjectTitle = values[14];
}

clsTimeLogEntry.prototype.SerializeJSON = function () {

}

clsTimeLogEntry.prototype.DeserializeJSON = function (jsonSerializedEntry) {
    var obj = JSON.parse(jsonSerializedEntry);
    this.EntryID = obj.EntryID; // int
    this.UserID = obj.UserID; // int
    this.ProjectID = obj.ProjectID; // int
    this.TaskTitle = obj.TaskTitle;
    this.HoursWorked = obj.HoursWorked; // float
    this.DateWorked = obj.DateWorked; // string
    this.EntryDescription = obj.EntryDescription; // string
    this.ActivityTitle = obj.ActivityTitle; // string
    this.BillalbeIndicator = obj.BillalbeIndicator; // boolean
    this.PayableIndicator = obj.PayableIndicator; // boolean
    this.LastMaintUserID = obj.LastMaintUserID; // int
    this.LastMaintUTC = obj.LastMaintUTC; // string 
    this.FirstName = obj.FirstName; // string
    this.LastName = obj.LastName; // string
    this.ProjectTitle = obj.ProjectTitle; //string
}