/**
* @param {array}  arr - array of all bookings
*/ 
const findUsersBooking = (arr) => {
    // Returns the booking object of the signed in user if it exists - otherwise undefined
    const signedInUserBooking = arr.find(booking => booking.user_id === userObj.id)
    if(signedInUserBooking) {
        console.log("booking from api",signedInUserBooking.booking);
        const bookingDateObj = new Date(signedInUserBooking.booking)
        // console.log("bookingDateObj",bookingDateObj);
        // console.log(bookingDateObj.toLocaleTimeString(), bookingDateObj.toLocaleDateString());
        return bookingDateObj;
    }
    return
}
const welcomeMsg = (booking) => {
    const div = document.querySelector("#welcomeMsg")
    div.className = "my-5 text-center"
    // console.log(new Date(booking));
    div.innerHTML =`
        <p>Welcome back <b>${toUpperCaseStr(userObj.name)}</b>!</p>
       ${booking 
            ? " <p>Your next laundry time is <b>" + dateToText(booking) + "</b></p>" + 
            "<p>Do you want to book another time? Cancel your scheduled time below first.</p>"
            : " <p>You have no booked times"}</p>
        ${booking ? "<button id='delBooking' onclick='delBooking()' class='button danger-btn' >Cancel</button>" : ""}`
    loginContainer.insertAdjacentElement("afterend", div)
}

const delBooking = async() => {
    const arr = await fetchData(currentList)
    const signedInUserBooking = arr.find(booking => booking.user_id === userObj.id)
    const res = await deleteBooking(currentList, signedInUserBooking)
    if(res.status === 200) {
        /* If deletion of booking is ok, set global usersBooking variable to false as to ot disable booking-form again */
        usersBooking = false;
    }
}
