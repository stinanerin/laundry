/**
* @param {array}  arr - array of all bookings
*/ 
const findUsersBooking = (arr) => {
    // Returns the booking object of the signed in user if it exists - otherwise undefined
    let signedInUserBooking = arr.find(booking => booking.user_id === userObj.id)
    if(signedInUserBooking) {
        console.log("booking from api",signedInUserBooking.booking);
        const bookingDateObj = new Date(signedInUserBooking.booking)
        console.log("bookingDateObj",bookingDateObj);
        console.log(bookingDateObj.toLocaleTimeString(), bookingDateObj.toLocaleDateString());
        welcomeMsg(bookingDateObj);
        return bookingDateObj;
    }
    return
}
const welcomeMsg = (booking) => {
    const div = createElement("div", "text-center")
    // console.log(new Date(booking));
    div.innerHTML =
    `<div class="text-center my-5">
        <p>Welcome back <b>${toUpperCaseStr(userObj.name)}</b>!</p>
        <p>${booking 
            ? "Your next laundry time is <b>" + dateToText(booking) + "</b>"
            : "You have no booked times"}</p>
        ${booking ? "<button id='delBooking' class='button danger-btn' >Cancel</button>" : ""}
    </div>`
    loginContainer.insertAdjacentElement("afterend", div)
    /* Initate delBooking function */
    delBooking(booking)
}

const delBooking = (date) => {
    document.querySelector("#delBooking").addEventListener("click", () => {
        
        console.log(date);
    })
}
