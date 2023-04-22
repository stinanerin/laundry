const userIcons = document.querySelector("#userIcons")
let userObj;

// ----------------------- ADD USER TO SESSION STORAGE -----------------------
const addSession = (user) => {
    setItem("user", {
        name: user.username,
        id: user._id,
    });
    checkSession()
}

// ----------------------- CHECK ONGOING USER SESSION -----------------------
const checkSession = () => {
    if (getitem("user")){
        userObj = getitem("user")
        addClass([loginContainer, registerContainer], "hidden")
        removeClass([calender], "hidden")
        displayUserIcons()
        renderMonthCal()
    } else {
        clearElem([userIcons])
    }
}

const displayUserIcons = () => {
    userIcons.innerHTML =` 
    <div class="d-flex align-items-center ">
        <p class="m-0 pe-2" id="userName"><b>${toUpperCaseStr(userObj.name)}</b></p>
        <button onclick="renderAccountPage()" class="btn border-0" aria-label="Account page button">
            <i class="fa-regular fa-user"></i>
        </button>
    </div>
    <div id="logoutWrapper" >
        <button onclick="logout()" class="btn border-0" aria-label="Log out button">
            <img class="logout" src="assets/icons/logout.svg"  aria-hidden="true" alt=""/>
        </button>
    </div>`
}

const renderAccountPage = () => {
    console.log("account");
    clearElem([calender])

    welcomeMsg(usersBooking);
}