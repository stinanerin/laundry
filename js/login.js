// ----------------------- LOGIN -----------------------
const loginForm = document.querySelector('#loginForm'),
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
    console.log(email.value, password.value);
    validateLogin(users, email.value, password.value)
}

const validateLogin = (arr, mail, pwd) => {
    console.log(arr, mail, pwd);
    //todo bryt ut?
    const findUser = user => user.email === mail && user.password === pwd;

    if(arr.find(findUser)) {
        console.log("user exists");
        addSession(arr.find(findUser))
        toggleClass([calender, loginContainer], "hidden")
    } else {
        //todo! break out
        console.log("user doesn´t exist");
        document.querySelector(".login-alert-container").innerHTML = `
        <div class="alert alert-danger container" role="alert">
            <div class="row">
                <div class="col-auto">
                    <i class="fa-solid fa-triangle-exclamation"></i>
                </div>
                <div class="col">
                    <span class="error">Invalid email or password</span>
                </div>
            </div>
        </div>`
        email.classList.add("error");
        password.classList.add("error");
    }
}


