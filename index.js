/* Your Code Here */

function createEmployeeRecord (array) {
    let employeeRecord = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employeeRecord
}

function createEmployeeRecords(array) {
    return array.map(function(employee) {
        return createEmployeeRecord(employee)
    });
}


function createTimeInEvent (dateAndTime) {
    let date = dateAndTime.split(' ');
    let hours = parseInt(date[1]);
    let timeInDate = date[0];
    this.timeInEvents.push({type: 'TimeIn', hour: hours, date:timeInDate});
    return this
}

function createTimeOutEvent (dateAndTime) {
    let date = dateAndTime.split(' ');
    let hours = parseInt(date[1]);
    let timeOutDate = date[0];
    this.timeOutEvents.push({type: 'TimeOut', hour: hours, date:timeOutDate}); 
    return this
}

let bpRecord = createEmployeeRecord(["Byron", "Poodle", "Mascot", 3])
let updatedBpRecord = createTimeInEvent.call(bpRecord, "2014-02-28 1400")
console.log(updatedBpRecord)

function hoursWorkedOnDate (date) {
    // .find() function that has the functionality to parse Ints
    let inEvent = this.timeInEvents.find(element => element.date === date)
    let outEvent = this.timeOutEvents.find(element => element.date === date)
    return (outEvent.hour - inEvent.hour) / 100;
}

function wagesEarnedOnDate (date) {
    return hoursWorkedOnDate.call(this, date) * this.payPerHour;
}


/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function findEmployeeByFirstName (collection, firstNameString) {
    // check if employee is in record by looking at first name
    // needs an iterator to sift through each employee record
    for (const element of collection) {
        if (element.firstName === firstNameString) {
            return element
        }
    }
}

function calculatePayroll (employeeRecords) {
    // What exactly am I missing here functionality-wise?
    // iterator method or for loop that iterates through array of records
    // needs to mention this. Where can I do that?
    let init = 0;
    for (let element of employeeRecords) {
        init += allWagesFor.call(element);
    };
    return init
}

