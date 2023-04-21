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
    validateLogin(users, email.value, password.value)
}

const validateLogin = (arr, mail, pwd) => {
    //todo bryt ut?
    const findUser = user => user.email === mail && user.password === pwd;

    if(arr.find(findUser)) {
        console.log("user exists");
<<<<<<< HEAD
        // console.log(arr.find(findUser));
        setItem("user", [arr.find(findUser)._id, arr.find(findUser).username]);
        calender.classList.remove("hidden")
        loginContainer.classList.add("hidden")
        checkSignedInUser()
=======
        clearValue([email, password])
        clearElem([loginError])
        removeClass([email, password], "error");

        addSession(arr.find(findUser))
>>>>>>> 7fdf9b8db51d68af1f20b701171fa942b7c6b41a
    } else {
        console.log("user doesn´t exist");
        displayError(loginError, "Invalid email or password")
        addClass([email, password], "error");
    }
}


<<<<<<< HEAD
const checkSignedInUser = () => {
    let div = document.querySelector(".header-child")
    if(getitem("user")) {
        console.log("auto inlogg");
        div.innerHTML = `
        <i class="fa-regular fa-user"></i>
        <p>${getitem("user")[1]}</p>`
        if(div.innerHTML) {
            calender.classList.remove("hidden")
            registerContainer.classList.add("hidden")
        }
    } else {
        console.log("ingen gammal inloggning kvar");
        div.innerHTML = "";
    } 
}

checkSignedInUser()
=======
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
>>>>>>> 7fdf9b8db51d68af1f20b701171fa942b7c6b41a
