
/**
* @param {array}  arr - array of all bookings
*/ 
const findUsersBooking = (arr) => {
    // Returns the booking object of the signed in user if it exists - otherwise undefined
    let signedInUserBooking = arr.find(booking => booking.user_id === userObj.id)
    if(signedInUserBooking) {
        console.log(signedInUserBooking);
        const bookingDateObj = new Date(signedInUserBooking.booking)
        console.log(bookingDateObj);
        console.log(bookingDateObj.toLocaleTimeString(), bookingDateObj.toLocaleDateString());
        welcomeMsg(bookingDateObj)
        return bookingDateObj
    }
    return
}
const welcomeMsg = (booking) => {
    const div = createElement("div", "text-center")
    console.log(
        new Intl.DateTimeFormat("en-GB", {
          dateStyle: "full",
          timeStyle: "long",
        }).format(booking)
      );
    div.innerHTML =
    `<div class="text-center my-5">
        <p>Welcome back <b>${toUpperCaseStr(userObj.name)}</b>!</p>
        <p>${booking 
            ? "Your next laundry time is " + dateToText(booking)
            : "You have no booked times"}</p
    </div>`
    loginContainer.insertAdjacentElement("afterend", div)
}

