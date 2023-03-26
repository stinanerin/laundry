// ----------------------- GLOBAL VARIABLES -----------------------
const calendar = document.querySelector(".calendar"),
    dateHeader = document.querySelector(".month-header"),
    daysContainer = document.querySelector(".calender-days-grid"),
    prevMonth = document.querySelector(".fa-angle-left"),
    nextMonth = document.querySelector(".fa-angle-right"),
    //curtesy of https://gist.github.com/seripap/9eb809268eb8026abd9f
    months = Array.from({length: 12}, (e, i) => {
        return new Date(null, i + 1, null).toLocaleDateString("en", {month: "long"});
    });

let today = new Date(),
    month = today.getMonth(),
    year = today.getFullYear();
// ----------------------- GLOBAL FUNCTIONS -----------------------

let createElement = (type, aClass) => {
    let elem = document.createElement(type);
    elem.className = aClass;
    return elem;
}

let renderMonthCalender = () => {
    // new Date(year, monthIndex, day, hours, minutes, seconds, milliseconds)
    // The getDate() method returns the day of the month for the specified date according to local time.
    // The getDay() method returns the day of the week for the specified date - (0 = sun)
    const firstDay = new Date(year, month, 1),
        // The day of the week for the current date
        day = firstDay.getDay() - 1,
        // The previous months last date
        prevLastDay = new Date(year, month, 0),
        prevMontshLastDate = prevLastDay.getDate(),
        // Current months last date
        lastDay = new Date(year, month + 1, 0),
        lastDate = lastDay.getDate(),
        // The reamining dates, from the next month, which happen in the current months last week
        nextDays = 7 - lastDay.getDay();

    // // Initates week days container
    // let days = "";

    console.log(day);
    console.log(lastDate);
    console.log(nextDays);

    let weekDays = 0;
    let row;

    // Renders the dates from previous month
    // day = the amount of days from the current week that belong to the previous month
    for (let x = day; x > 0; x--) {
        // Creates new row for cal days for each week
        if(weekDays % 7 === 0) {
            row = createElement("div", "row g-0");
            daysContainer.append(row);

        }
        weekDays ++;
        row.innerHTML += `<div class="day col">${prevMontshLastDate - x + 1}</div>`;
    }
    // Renders the dates from the current month
    for (let x = 1 ; x <= lastDate ; x++) {
        // Creates new row for cal days for each week
        if(weekDays % 7 === 0) {
            row = createElement("div", "row g-0");
            daysContainer.append(row);
        }
        weekDays ++;
        row.innerHTML += `<div class="day col">${x}</div>`;
    }
    // Renders the dates from the next month
    for(let x = 1; x <= nextDays; x++) {
        // Creates new row for cal days for each week
        if(weekDays % 7 === 0) {
            row = createElement("div", "row g-0");
            daysContainer.append(row);
        }
        weekDays ++;
        row.innerHTML += `<div class="day col">${x}</div>`;
    }

    // Updates DOM
    dateHeader.innerHTML = months[month] + " " + year;

}

renderMonthCalender()
