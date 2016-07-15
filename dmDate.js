function dmDate(year, month, day) {
    this.Month = month;
    this.Day = day;
    this.Year = year;
}

function formatNumberToTwoDigits(number) {
    if (number < 10) {
        return "0" + number.toString();
    }
    return number.toString();
}

dmDate.prototype.ToYearMonthDayString = function () {
    // return 1995/14/1
    return this.Year + "/" + formatNumberToTwoDigits(this.Month) + "/" + formatNumberToTwoDigits(this.Day);
}

dmDate.prototype.NumberOfDaysFromTodayString = function (days) {
    // returns the date of the number of days before today in this for mat: 01/14/2016

    var today = new Date();
    var fromToday = new Date(today.getFullYear(), today.getMonth(), today.getDate() + days);

    return (formatNumberToTwoDigits(fromToday.getMonth() + 1)).toString() +
        "/" + formatNumberToTwoDigits(fromToday.getDate()) +
        "/" + fromToday.getFullYear();
}

dmDate.prototype.ToMonthNameDayYearString = function () {
    // return = Jan 14, 1994

    var formattedString = "";
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    formattedString += months[this.Month - 1] + " " + this.Day + ", " + this.Year;

    return formattedString;
}

dmDate.prototype.Deserialize = function (serializedString) {
    var parts = serializedString.split("/");
    this.Day = parts[2];
    this.Month = parts[1];
    this.Year = parts[0];
}

dmDate.prototype.GetYear = function () {
    return this.Year;
}

dmDate.prototype.GetDay = function () {
    return this.Day;
}

dmDate.prototype.GetMonth = function () {
    return this.Month;
}

dmDate.prototype.ToString = function () {
    // return 14/01/1994

    return this.Month + "/" + this.Day + "/" + this.Year;
}

dmDate.prototype.GetDayOfWeekName = function () {
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var date = new Date(this.Year, this.Month - 1, this.Day);
    return days[date.getDay()];
}

dmDate.prototype.GetDayOfWeek = function () {
    var date = new Date(this.Year, this.Month - 1, this.Day);

    return date.getDay();
}

dmDate.prototype.GetMonthOfYearName = function () {
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    return months[this.Month - 1];
}

dmDate.prototype.IsLeapYear = function () {
    if (year % 4 === 0
        && !(year % 100 === 0 && year % 400 != 0)) {
        return true;
    }
    return false;
}

dmDate.prototype.TryParsedmDate = function(dmDateString) {
    birthdmDateParts = dmDateString.split("/");
    if (birthdmDateParts.length != 3) {
        return false;
    }
    if (checkIfStringIsNumber(birthdmDateParts[0]) === false
        || checkIfStringIsNumber(birthdmDateParts[1]) === false
        || checkIfStringIsNumber(birthdmDateParts[2]) === false) {
        return false;
    }

    var month = parseInt(birthdmDateParts[0]);
    var day = parseInt(birthdmDateParts[1]);
    var year = parseInt(birthdmDateParts[2]);

    if (year < 1 || year > 9999
        || month < 1 || month > 12
        || day < 1 || day > 31) {
        return false;
    }

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
}

dmDate.prototype.IsEmpty = function () {
    if (this.Year === 0 && this.Month === 0 && this.Day === 0) {
        return true;
    }
    return false;
}