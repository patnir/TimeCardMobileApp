function dmDate() {
    this.Month = month;
    this.Day = day;
    this.Year = year;
}

dmDate.prototype.Serialize = function () {
    return this.Year.ToString() + '\t'
            + this.Month.ToString() + '\t'
            + this.Day.ToString();
}

dmDate.prototype.Deserialize = function (serializedString) {
    var values = serializedString.split("\t");

    this.Month = parseInt(values[0]);
    this.Day = parseInt(values[1]);
    this.Year = parseInt(values[2]);
}

dmDate.prototype.ToYearMonthDayString = function () {
    // return 1995/14/1
    return this.Year + "/" + this.Month + "/" + this.Day;
}

dmDate.prototype.ToMonthNameDayYearString = function () {
    // return = Jan 14, 1994

    var dmDateParts = serializeddmDate.split("/");
    var formattedString = "";
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    formattedString += months[this.Month - 1] + " " + this.Day + ", " + this.Year;

    return formattedString;
}

dmDate.prototype.ToString = function () {
    // return 14/01/1994

    return this.Month + "/" + this.Day + "/" + this.Year;
}

dmDate.prototype.GetMonthName = function () {
    var days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    var dmDate = new dmDate(this.Year, this.Month - 1, this.Day);

    return days[dmDate.getDay()];
}

dmDate.prototype.GetDayName = function () {
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