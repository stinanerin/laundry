// ----------------------- LOGIN -----------------------
const loginForm = document.querySelector('#loginForm'),
    loginError = document.querySelector(".login-alert-container"),
    email = document.querySelector('#loginEmail'),
    password = document.querySelector('#loginPWD');


loginForm.addEventListener("submit", (e) => {
    e.preventDefault()

    login()
})

const login = async() => {
    const users = await fetchData("6429d84525fc8200e0300328")
    //! todo error handling
    console.log(users);
    validateLogin(users, email.value, password.value)
}

const validateLogin = (arr, mail, pwd) => {
    console.log(arr, mail, pwd);
    //todo bryt ut?
    const findUser = user => user.email === mail && user.password === pwd;

    if(arr.find(findUser)) {
        console.log("user exists");
        clearValue([email, password])
        clearElem([loginError])
        removeClass([email, password], "error");

        addSession(arr.find(findUser))
    } else {
        console.log("user doesn´t exist");
        displayError(loginError, "Invalid email or password")
        addClass([email, password], "error");
    }
}


// ----------------------- ERROR MESSAGE BOX FORMS -----------------------
const displayError = (wrapper, message) => {
    wrapper.innerHTML = `
    <div class="alert alert-danger container" role="alert">
        <div class="row">
            <div class="col-auto">
                <i class="fa-solid fa-triangle-exclamation"></i>
            </div>
            <div class="col">
                <span> ${message}</span>
            </div>
        </div>
    </div>`
}