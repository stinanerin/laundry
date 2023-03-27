// ----------------------- GLOBAL VARIABLES -----------------------
const calendar = document.querySelector(".calendar"),
    dayGrid = document.querySelector(".calender-days-grid"),
    dayView = document.querySelector(".day-view"),
    dateHeader = document.querySelector(".month-header"),
    prevMonth = document.querySelector(".fa-angle-left"),
    nextMonth = document.querySelector(".fa-angle-right"),
    //curtesy of https://gist.github.com/seripap/9eb809268eb8026abd9f
    months = Array.from({length: 12}, (e, i) => {
        return new Date(null, i + 1, null).toLocaleDateString("en", {month: "long"});
    });
    weekdays = Array.from({length: 7}, (e, i) => {
        return new Date(null, null , i).toLocaleDateString("en", {weekday: "long"});
    })
    timeslots = ["08", "12", "17"]
let today = new Date(),
    month = today.getMonth(),
    year = today.getFullYear();

// ----------------------- GLOBAL FUNCTIONS -----------------------
let createElement = (type, aClass, str) => {
    let elem = document.createElement(type);
    elem.className = aClass;
    if(str) {
        elem.innerText = str
    }
    return elem;
}

let renderDayView = () => {
    document.querySelectorAll(".day").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const button = e.target
            const monthName = 
                button.classList.contains("prevMonth") ? months[month - 1]
                : button.classList.contains("nextMonth") ? months[month + 1]
                : months[month]
            const currentDate = new Date(year, months.indexOf(monthName), button.innerText)
            dayView.innerHTML = `
            <h2 class="row g-0">
                <span class="weekday col">${weekdays[currentDate.getDay()]}</span>
                <span class="date col text-end">${button.innerText} ${monthName}</span>
            </h2>`
            const div = createElement("div", "row g-0")
            dayView.append(div)
            timeslots.forEach(time => {
                div.append(createElement("button", "time-slot col", time))
            })
            bookTime(currentDate)
        })
    })
}

let renderMonthCalender = () => {
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
    
    // Initates week days counter and container
    let weekDays = 0;
    let row;

    // Renders the dates from previous month
    // "day" = the amount of days from the current week that belong to the previous month
    for (let x = day; x > 0; x--) {
        // Creates new row for cal days for each week
        if(weekDays % 7 === 0) {
            row = createElement("div", "row g-0");
            dayGrid.append(row);
        }
        weekDays ++;
        row.append(createElement("button", "day prevMonth col d-flex justify-content-center align-items-center", prevMontshLastDate - x + 1));
    }
    // Renders the dates from the current month
    for (let x = 1 ; x <= lastDate ; x++) {
        // Creates new row for cal days for each week
        if(weekDays % 7 === 0) {
            row = createElement("div", "row g-0");
            dayGrid.append(row);
        }
        if(x === today.getDate()) {
            row.append(createElement("button", "today day col d-flex justify-content-center align-items-center", x));
        } else {
            row.append(createElement("button", "day col d-flex justify-content-center align-items-center", x));
        }
        weekDays ++;
    }
    // Renders the dates from the next month
    for(let x = 1; x <= nextDays; x++) {
        // Creates new row for cal days for each week
        //todo! bryt ut
        if(weekDays % 7 === 0) {
            row = createElement("div", "row g-0");
            dayGrid.append(row);
        }
        weekDays ++;
        row.append(createElement("button", "day nextMonth col d-flex justify-content-center align-items-center", x));
    }

    // Updates DOM
    dateHeader.innerHTML =  `<h2>${months[month]} ${year}</h2>`;
    // Iniates day view function for each calender button
    renderDayView()

}
renderMonthCalender()

let bookTime = (date) => {
    let timeslots = document.querySelectorAll(".time-slot");
    console.log(typeof date);
    console.log(date);
    // console.log({date});
    timeslots.forEach(slot => slot.addEventListener("click", (e) => {
        console.log("choosen", +e.target.innerText);
        console.log(date);
        date.setHours(+e.target.innerText, 00, 00);   
        console.log(date);
    }))
}