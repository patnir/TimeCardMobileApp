function TimeLogDate(month, day, year) {
    this.Month = month;
    this.Day = day;
    this.Year = year;
}

TimeLogDate.prototype.ToMonthDayString = function () {
    // return = Jan 12, 1994

    var TimeLogDateParts = serializedTimeLogDate.split("/");
    var formattedString = "";
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    formattedString += months[this.Month - 1] + " " + this.Day + ", " + this.Year;

    return formattedString;
}

TimeLogDate.prototype.ToString = function () {
    // return 12/01/1994

    return this.Month + "/" + this.Day + "/" + this.Year;
}

TimeLogDate.prototype.GetMonthName = function () {
    var days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    var TimeLogDate = new TimeLogDate(this.Year, this.Month - 1, this.Day);

    return days[TimeLogDate.getDay()];
}

TimeLogDate.prototype.GetDayName = function () {
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    return months[this.Month - 1];
}

TimeLogDate.prototype.IsLeapYear = function () {
    if (year % 4 === 0
        && !(year % 100 === 0 && year % 400 != 0)) {
        return true;
    }
    return false;
}

TimeLogDate.prototype.TryParseTimeLogDate = function(TimeLogDateString) {
    birthTimeLogDateParts = TimeLogDateString.split("/");
    if (birthTimeLogDateParts.length != 3) {
        return false;
    }
    if (checkIfStringIsNumber(birthTimeLogDateParts[0]) === false
        || checkIfStringIsNumber(birthTimeLogDateParts[1]) === false
        || checkIfStringIsNumber(birthTimeLogDateParts[2]) === false) {
        return false;
    }

    var month = parseInt(birthTimeLogDateParts[0]);
    var day = parseInt(birthTimeLogDateParts[1]);
    var year = parseInt(birthTimeLogDateParts[2]);

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

TimeLogDate.prototype.Serialize = function() {
    return this.Year.ToString() + '\t'
            + this.Month.ToString() + '\t'
            + this.Day.ToString();
}

TimeLogDate.prototype.IsEmpty = function () {
    if (this.Year === 0 && this.Month === 0 && this.Day === 0) {
        return true;
    }

    return false;
}

TimeLogDate.prototype.Deserialize = function (serializedString) {
    var values = serializedString.split("\t");
    
    this.Month = parseInt(values[0]);
    this.Day = parseInt(values[1]);
    this.Year = parseInt(values[2]);
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