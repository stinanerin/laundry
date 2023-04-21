const userIcons = document.querySelector("#userIcons")

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
        addClass([loginContainer, registerContainer], "hidden")
        removeClass([calender], "hidden")
        displayUser(getitem("user").name)
    } else {
        clearElem([userIcons])
    }
}

const displayUser = (userName) => {
    //todo! display userName
    userIcons.innerHTML =` 
    <div class="d-flex align-items-center ">
        <p class="m-0 pe-2" id="userName">Welcome ${toUpperCaseStr(userName)}!</p>
        <i class="fa-regular fa-user"></i>
    </div>
    <div id="logoutWrapper" >
        <button onclick="logout()" class="btn border-0" aria-label="Log out button">
            <img class="logout" src="assets/icons/logout.svg"  aria-hidden="true" alt=""/>
        </button>
    </div>`
}