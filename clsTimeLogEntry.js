/// <reference path="Index.html">

//function clsTimeLogEntry(userID,
//    project,
//    task,
//    activity,
//    dateWorked,
//    hoursWorked,
//    isBillable, 
//    isPayable,
//    description) {
//    this.Project = project;
//    this.Task = task;
//    this.Activity = activity;
//    this.DateWorked = dateWorked;
//    this.HoursWorked = hoursWorked;
//    this.IsBillable = isBillable;
//    this.IsPayable = isPayable;
//    this.Description = description;
//}


function clsTimeLogEntry(entryID, name, dateWorked, hoursWorked, billable, description) {
    this.EntryID = entryID;
    this.Name = name;
    this.DateWorked = dateWorked;
    this.HoursWorked = hoursWorked;
    this.IsBillable = billable;
    this.Description = description;
}

clsTimeLogEntry.prototype.Serialize = function () {
    var billable = 0;
    if (this.IsBillable === true) {
        billable = 1;
    }
    return this.EntryID.toString() + "\t"
        + this.Name + "\t"
        + this.DateWorked.toString() + "\t"
        + this.HoursWorked.toString() + "\t"
        + billable.toString() + "\t"
        + this.Description;
}

clsTimeLogEntry.prototype.Deserialize = function(serializedEntry) {
    var entry = serializedEntry.split("\t");
    this.Name = entry[0]
}


