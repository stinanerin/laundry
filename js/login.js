// ----------------------- LOGIN -----------------------
const loginForm = document.querySelector('#loginForm');
let email, 
    password;

loginForm.addEventListener("submit", async(e) => {
    e.preventDefault();
    const users = await fetchData("6429d84525fc8200e0300328")
    email = document.querySelector('#loginEmail')
    password = document.querySelector('#loginPWD')
    validateLogin(users, email.value, password.value)
});

let validateLogin = (arr, mail, pwd) => {
    console.log(arr, mail, pwd);
    //todo bryt ut?
    const findUser = user => user.email === mail && user.password === pwd;

    if(arr.find(findUser)) {
        console.log("user exists");
        setItem("user", [arr.find(findUser)._id, arr.find(findUser).username]);
        calender.classList.remove("hidden")
        loginContainer.classList.add("hidden")
        checkSignedInUser()
    } else {
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

// ----------------------- CHECK IF USER IS ALREADY LOGGED IN -----------------------

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