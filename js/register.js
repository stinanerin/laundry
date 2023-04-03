const loginUserLink  = document.querySelector('#loginLink'),
    loginContainer =  document.querySelector("#loginWrapper"),
    registerUserLink  = document.querySelector('#registerLink'),
    registerContainer = document.querySelector("#registerWrapper"),
    registerUserForm = document.querySelector("#registerUser"),
    calender = document.querySelector('#calenderWrapper'),
    pwdAlert = document.querySelector("#passwordAlert");
    // emailAlert = document.querySelector(".reg-alert-container")

let fullName,
    regEmail,
    pwd,
    pwdConf;

// ----------------------- TOGGLE BETWEEN REGISTER / LOGIN VIEW -----------------------
loginUserLink.addEventListener("click", () => { toggleClass([registerContainer, loginContainer], "hidden") })
registerUserLink.addEventListener("click", () => { toggleClass([registerContainer, loginContainer], "hidden") })

// ----------------------- REGISTER USER FORM -----------------------
registerUserForm.addEventListener("submit", (e) => {
    e.preventDefault();

    fullName = document.querySelector('#FullName'),
    regEmail = document.querySelector('#email'),
    pwd = document.querySelector('#pwd'),
    pwdConf = document.querySelector('#pwdConf');

    validateRegisterUser(fullName.value, regEmail.value, pwd.value, pwdConf.value)
})

// ----------------------- VALIDATION - REGISTER USER -----------------------
const validateRegisterUser = async(name, email, password, confPwd) => {
    console.log(name, email, password, confPwd);

    const userArr = await fetchData("6429d84525fc8200e0300328")
    console.log(userArr);
    const checkUniqueUser = user => user.email !== email;

    if(userArr.every(checkUniqueUser) && password === confPwd) {
        console.log("create user!");
        // Cretes user in API
        createUser(name, email, password, confPwd);
        toggleClass([calender, registerContainer], "hidden")

    } else if (!userArr.every(checkUniqueUser) && password !== confPwd) {
        console.log("email already registered & pwds do not match");
        // Hidden
        pwdAlert.classList.remove("hidden")
        // Error
        pwd.classList.add("error");
        pwdConf.classList.add("error");


    } else if(!userArr.every(checkUniqueUser)) {
        console.log("email already registered - pwds OK!");
        // Hidden
        pwdAlert.classList.add("hidden")
        // Error
        pwd.classList.remove("error");
        pwdConf.classList.remove("error");
    } else {
        console.log("pwds do not match - email OK!");
        // Hidden
        pwdAlert.classList.remove("hidden")
        // Error
        pwd.classList.add("error");
        pwdConf.classList.add("error");
    }
}
