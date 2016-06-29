function Date(month, day, year) {
    this.Month = month;
    this.Day = day;
    this.Year = year;
}

Date.prototype.ToMonthDayString = function () {
    // return = Jan 12, 1994

    var dateParts = serializedDate.split("/");
    var formattedString = "";
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    formattedString += months[this.Month - 1] + " " + this.Day + ", " + this.Year;

    return formattedString;
}

Date.prototype.ToShortString = function () {
    // return 12/01/1994

    return this.Month + "/" + this.Day + "/" + this.Year;
}

Date.prototype.GetMonthName = function () {
    var days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    var date = new Date(this.Year, this.Month - 1, this.Day);

    return days[date.getDay()];
}

Date.prototype.GetDayName = function () {
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    return months[this.Month - 1];
}

Date.prototype.IsLeapYear = function () {
    if (year % 4 === 0
        && !(year % 100 === 0 && year % 400 != 0)) {
        return true;
    }
    return false;
}

Date.prototype.TryParseDate = function(dateString) {
    birthDateParts = dateString.split("/");
    if (birthDateParts.length != 3) {
        return false;
    }
    if (checkIfStringIsNumber(birthDateParts[0]) === false
        || checkIfStringIsNumber(birthDateParts[1]) === false
        || checkIfStringIsNumber(birthDateParts[2]) === false) {
        return false;
    }

    var month = parseInt(birthDateParts[0]);
    var day = parseInt(birthDateParts[1]);
    var year = parseInt(birthDateParts[2]);

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

Date.prototype.Serialize() = function() {
    return this.Year.ToString() + '\t'
            + this.Month.ToString() + '\t'
            + this.Day.ToString();
}

Date.prototype.IsEmpty() = function () {
    if (this.Year === 0 && this.Month === 0 && this.Day === 0) {
        return true;
    }

    return false;
}

Date.prototype.Deserialize() = function (serializedString) {
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