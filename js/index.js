// ----------------------- GLOBAL VARIABLES -----------------------
const calendar = document.querySelector(".calendar"),
    dayGrid = document.querySelector(".calender-days-grid"),
    bookingForm = document.querySelector("#bookTime"),
    dayView = document.querySelector(".day-view"),
    timeBooking = document.querySelector(".booking"),
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
    timeslots = ["08", "12", "17"];
let today = new Date(),
    month = today.getMonth(),
    year = today.getFullYear(),
    currentDate,
    currentList = "63fd07e82a491a4d0882d577",
    bookings;
// ----------------------- GLOBAL FUNCTIONS -----------------------
const createElement = (type, aClass, str, arr) => {
    let elem = document.createElement(type);
    elem.className = aClass;
    if(str) {
        elem.innerText = str
    }
    if(arr) {

    }
    return elem;
}
const diasableElem = (arr) => {
    document.querySelectorAll("input[type='radio'][name='time-slot']").forEach(radio => {
        arr.includes(+radio.value) ? radio.disabled = true : "";
    })
}

const renderDayView = () => {
    document.querySelectorAll(".day").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const date = e.target
            let bookedTimes;

            const monthName = date.classList.contains("prevMonth") ? months[month - 1]
                : date.classList.contains("nextMonth") ? months[month + 1]
                : months[month]
            
            const currentDate = new Date(year, months.indexOf(monthName), date.innerText)

            dayView.innerHTML = `
            <h2 class="row gx-0">
                <span class="weekday col">${weekdays[currentDate.getDay()]}</span>
                <span class="date col text-end">${date.innerText} ${monthName}</span>
            </h2>
            <div class="row gx-0">
                <div class="col">
                    <input type="radio" name="time-slot" id="morning" value="08" required>
                    <label for="morning">08</label>
                </div>
                <div class="col">
                    <input type="radio" name="time-slot" id="noon" value="12">
                    <label for="noon">12</label>
                </div>
                <div class="col">
                    <input type="radio" name="time-slot" id="evening" value="17">
                    <label for="evening">17</label>
                </div>
                <p class="m-0"></p>
                <button type="submit" class="btn btn-success">Book</button>
            </div>`
            updateChoosenDate(currentDate)

            // Checks if currentDate is already booked
            // Returns every date obj that matches the current looped date - otherwise []]
            const match = bookings.filter(date => date.toLocaleDateString() === currentDate.toLocaleDateString())
            match.length > 0 ? bookedTimes = match.map(date => date.getHours()) : ""
            // If current date is already booked - disable radio for time slots
            bookedTimes ? diasableElem(bookedTimes) : ""
        })
    })
}

const renderMonthCalender = async() => {
    //todo! bryt ut
    // Fetches all bookings from API
    const arr = await fetchData(currentList)
    bookings = arr.map(date => new Date(date.booking))

    const firstDay = new Date(year, month, 1),
        // The day of the week for the current date
        day = firstDay.getDay() - 1,
        // The previous months last date
        prevLastDay = new Date(year, month, 0),
        prevMontshLastDate = prevLastDay.getDate(),
        // Current months last date
        lastDay = new Date(year, month + 1, 0),
        lastDate = lastDay.getDate(),
        // The remaining dates, from the next month, which happen in the current months last week
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
        
        row.append(createElement("li", "day prevMonth col d-flex justify-content-center align-items-center", prevMontshLastDate - x + 1));
    }
    // Renders the dates from the current month
    for (let x = 1 ; x <= lastDate ; x++) {
        // Creates new row for cal days for each week
        if(weekDays % 7 === 0) {
            row = createElement("div", "row g-0");
            dayGrid.append(row);
        }
        if(x === today.getDate()) {
            row.append(createElement("li", "today day col d-flex justify-content-center align-items-center", x));
        } else {
            row.append(createElement("li", "day col d-flex justify-content-center align-items-center", x));
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
        row.append(createElement("li", "day nextMonth col d-flex justify-content-center align-items-center", x));
    }

    // Updates DOM
    dateHeader.innerHTML =  `<h2>${months[month]} ${year}</h2>`;
    // Iniates day view function for each calender button
    renderDayView()
}

renderMonthCalender()

const updateChoosenDate = (date) => {    
    document.querySelectorAll("input[type='radio'][name='time-slot']").forEach(slot => slot.addEventListener("change", (e) => {
        currentDate = date
        currentDate.setHours(e.target.value, 00, 00)
        bookingForm.querySelector("p").innerHTML = `You have choosen <strong>${currentDate.toLocaleTimeString()} ${currentDate.toLocaleDateString()}</strong>. </br>Make sure to book it to complete the process`
    }))
}

bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Disabled booked radio
    e.target.querySelector("input[type='radio']:checked").disabled = true;    
    addBooking(currentList, currentDate)
});