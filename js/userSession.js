const userIcons = document.querySelector("#userIcons")

// ----------------------- ADD USER TO SESSION STORAGE -----------------------
const addSession = (user) => {
    console.log(user);
    setItem("user", {
        name: user.username,
        id: user._id,
        hasBooking: false,
    });
    checkSession()
}

// ----------------------- CHECK ONGOING USER SESSION -----------------------
const checkSession = () => {
    const userObj = getItem("user")
    if (userObj) {
        addClass([loginContainer, registerContainer], "hidden");
        removeClass([calender], "hidden");
        displayUserIcons(userObj);
        renderMonthCal();
    } else {
        clearElem([userIcons]);
    }
}

const displayUserIcons = (user) => {
    userIcons.innerHTML = ` 
    <div class="d-flex align-items-center ">
        <p class="m-0 p-sm-2 text-center" id="userName"><b>${
            toUpperCaseStr(user.name).split(" ")[0]
        }</b></p>
        <button id="prfPageBtn" class="btn border-0" aria-label="Account page button">
            <i class="fa-regular fa-user"></i>
        </button>
    </div>
    <div id="logoutWrapper" >
        <button onclick="logout()" class="btn border-0" aria-label="Log out button">
            <img class="logout" src="assets/icons/logout.svg"  aria-hidden="true" alt=""/>
        </button>
    </div>`;
    
    document
        .querySelector("#prfPageBtn")
        .addEventListener("click", () => renderAccountPage(user));

}

const renderAccountPage = async(user) => {
    addClass([calender], "hidden")

    const bookings = await fetchData("63fd07e82a491a4d0882d577");
    // Finds the signed in user's booking from the api bookings
    const userBooking = findUsersBooking(bookings)

    welcomeMsg(userBooking, user);
};