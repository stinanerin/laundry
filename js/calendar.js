// ----------------------- GLOBAL VARIABLES -----------------------
const calendar = document.querySelector(".calendar"),
    dayGrid = document.querySelector(".calender-days-grid"),
    bookingForm = document.querySelector("#bookTime"),
    dayView = document.querySelector(".day-view"),
    timeBooking = document.querySelector(".booking"),
    dateHeader = document.querySelector(".month-header"),
    prevMonth = document.querySelector("#prevMonth"),
    nextMonth = document.querySelector("#nextMonth"),
    // curtesy of https://gist.github.com/seripap/9eb809268eb8026abd9f
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

const renderDayView = () => {
    dayGrid.querySelectorAll(".day:not(.deactivated)").forEach(li => {
        li.addEventListener("click", () => {
            // If another day has the active class - remove it
            dayGrid.querySelector(".active") ? dayGrid.querySelector(".active").classList.remove("active") : "";
           
            addClass([li], "active")
            
            const monthName = li.classList.contains("prevMonth") ? months[month - 1]
            : li.classList.contains("nextMonth") ? months[month + 1]
            : months[month]
            
            const currentDate = new Date(year, months.indexOf(monthName), li.innerText)

            dayView.innerHTML = `
            <div class="mb-5">
                <h2 class="row gx-0 mb-4">
                    <span class="weekday col">${weekdays[currentDate.getDay()]}</span>
                    <span class="date col text-end">${li.innerText} ${monthName}</span>
                </h2>
                <div class="row gx-0 text-center">
                    <div class="col d-flex justify-content-center align-items-center">
                        <input type="radio" name="time-slot" id="morning" value="08" required>
                        <label for="morning">08</label>
                    </div>
                    <div class="col d-flex justify-content-center align-items-center">
                        <input type="radio" name="time-slot" id="noon" value="12">
                        <label for="noon">12</label>
                    </div>
                    <div class="col d-flex justify-content-center align-items-center">
                        <input type="radio" name="time-slot" id="evening" value="17">
                        <label for="evening">17</label>
                    </div>
                    <div class="mt-4">
                        <p class="m-0"></p>
                    </div>
                    <div class="mt-4"><button type="submit" class="btn primary-btn">Book</button></div>
                </div>
            </div>`
            updateChoosenDate(currentDate)

            let bookedTimes;
            // Checks if currentDate is already booked
            // Returns every date obj that matches the current looped date - otherwise []]
            const match = bookings.filter(date => date.toLocaleDateString() === currentDate.toLocaleDateString())

            match.length > 0 ? bookedTimes = match.map(date => date.getHours()) : ""
            // If current date is already booked - disable radio for time slots
            bookedTimes ? diasableElem(bookedTimes) : ""
        })
    })
}

const renderMonthCal = async() => {
    // Clears calender & booking form when month changes
    dayGrid.innerHTML = "";
    dayView.innerHTML = "";
    //todo! bryt ut
    // Fetches all bookings from API
    const arr = await fetchData(currentList)

    //!todo limit signed in user to book multiple times?
    const userBookedTime = findUsersBooking(arr)
    // console.log("userBookedTime", userBookedTime);

    bookings = arr.map(date => new Date(date.booking))
    // console.log("bookings", bookings);

    const firstDay = new Date(year, month, 1),
        // The day of the week for the current date
        day = firstDay.getDay() - 1,
        // day = firstDay.getDay() === 0 ? firstDay.getDay() : firstDay.getDay() - 1,
        // The previous months last date
        prevLastDay = new Date(year, month, 0),
        prevMontshLastDate = prevLastDay.getDate(),
        // The spill over dates from the month before
        prevDays = prevLastDay.getDay();
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
    let currentMonth = month - 1

    //!todo break out each rendering of days by pushing the dates to three arrays.
    for (let x = 1; x <= prevDays; x++) {
        // Creates new row for cal days for each week
        if(weekDays % 7 === 0) {
            row = createElement("div", "row mb-2 g-0");
            dayGrid.append(row);
        }
        row.append(createElement("li", `${hasDatePassed(year, currentMonth, prevMontshLastDate - x + 1)} ${isDayBooked(userBookedTime, year, month, x)} day prevMonth col d-flex justify-content-center align-items-center`, prevMontshLastDate - x + 1));
        weekDays ++;
    }

    // Renders the dates from the current month
    for (let x = 1 ; x <= lastDate ; x++) {
        // Creates new row for cal days for each week
        if(weekDays % 7 === 0) {
            row = createElement("div", "row mb-2 g-0");
            dayGrid.append(row);
        }

        row.append(createElement("li", `${checkIfDayisToday(year, month, x)} ${hasDatePassed(year, month, x)} ${isDayBooked(userBookedTime, year, month, x)} day col d-flex justify-content-center align-items-center`, x));
        weekDays ++;
    }

    // Renders the dates from the next month
    currentMonth = month + 1
    for(let x = 1; x <= nextDays && nextDays !== 7; x++) {
        // Creates new row for cal days for each week
        //todo! bryt ut
        if(weekDays % 7 === 0) {
            console.log("tja");
            row = createElement("div", "row g-0");
            dayGrid.append(row);
        }
        row.append(createElement("li", `${checkIfDayisToday(year, currentMonth, x)} ${hasDatePassed(year, currentMonth, x)} ${isDayBooked(userBookedTime, year, month, x)} day nextMonth col d-flex justify-content-center align-items-center`, x));
        weekDays ++;
    }

    // Updates DOM
    dateHeader.innerHTML =  `<h2>${months[month]} ${year}</h2>`;
    // Iniates day view function for each calender button
    renderDayView()
}

const updateChoosenDate = (date) => {    
    document.querySelectorAll("input[type='radio'][name='time-slot']").forEach(slot => slot.addEventListener("change", (e) => {
        date.setHours(e.target.value, 00, 00)
        bookingForm.querySelector("p").innerHTML = `You have choosen <strong>${dateToText(date)}</strong>. </br>Make sure to book it to complete the process`
    }))
}

bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Disables booked radio
    e.target.querySelector("input[type='radio']:checked").disabled = true;    
    //!todo check so the booking is ok, then push to local array
    addBooking(currentList, currentDate)
    // Adds the recently booked date to global bookings-arr - avoiding another API-request - which is looped when the day-view is rendered
    bookings.push(currentDate)
    //todo! Add booked class on the li-tag directly after succesfull booking
});

// ----------------------- ALTER MONTH -----------------------

const alterMonth = (str) => {
    if(str === "add") {
        if(month === 11) {
            year++
            month = -1
        }
        month++
    } else {
        if(month === 0) {
            year--
            month = 12
        }
        month--
    }
    renderMonthCal()
}

// ----------------------- DISABLE PASSED DATES -----------------------

const hasDatePassed = (year, month, day) => {
    date = new Date(year, month, day)
    // Create a new date of the existing dates to cancel out the time
    return new Date(date.toDateString()) < new Date(today.toDateString()) ? "deactivated" : "";
}

const checkIfDayisToday = (year, month, day) => {
    return areDatesEqual(today, new Date(year, month, day)) ? "today" : ""
}

const isDayBooked = (bookedTime, year, month, day) => {
    return areDatesEqual(bookedTime, new Date(year, month, day)) ? "booked" : ""
}

const areDatesEqual = (d1, d2) => {
    return d1.toDateString() === d2.toDateString()
}