const loginUserLink  = document.querySelector('#loginLink'),
    loginContainer =  document.querySelector("#loginWrapper"),
    registerUserLink  = document.querySelector('#registerLink'),
    registerContainer = document.querySelector("#registerWrapper"),
    registerUserForm = document.querySelector("#registerUser"),
    calender = document.querySelector('#calenderWrapper'),
    pwdAlert = document.querySelector("#passwordAlert"),
    emailAlert = document.querySelector("#emailAlert"),
    fullName = document.querySelector('#FullName'),
    regEmail = document.querySelector('#email'),
    pwd = document.querySelector('#pwd'),
    pwdConf = document.querySelector('#pwdConf');

// ----------------------- TOGGLE BETWEEN REGISTER / LOGIN VIEW -----------------------
loginUserLink.addEventListener("click", () => { toggleClass([registerContainer, loginContainer], "hidden") })
registerUserLink.addEventListener("click", () => { toggleClass([registerContainer, loginContainer], "hidden") })

// ----------------------- REGISTER USER FORM -----------------------
registerUserForm.addEventListener("submit", (e) => {
    e.preventDefault();

    registerUser()
})

const registerUser = async() => {
    const userArr = await fetchData("6429d84525fc8200e0300328")
    //! todo error handling
    console.log(userArr);
    validateRegisterUser(userArr, fullName.value, regEmail.value, pwd.value, pwdConf.value)
}

// ----------------------- VALIDATION - REGISTER USER -----------------------
const validateRegisterUser = async(userArr, name, email, password, confPwd) => {
    const checkUniqueEmail = user => user.email !== email;
    
    // If email is unique and pwds match 
    if(userArr.every(checkUniqueEmail) && password === confPwd) {
        // Cretes user in API
        createUser(name, email, password, confPwd);
<<<<<<< HEAD
        calender.classList.remove("hidden")
        registerContainer.classList.add("hidden")
        checkSignedInUser()
=======
        toggleClass([calender, registerContainer], "hidden")
        clearValue([fullName, regEmail, pwd, pwdConf])
        addClass([pwdAlert, emailAlert], "hidden")
        removeClass([fullName, regEmail, pwd, pwdConf], "error");
>>>>>>> 7fdf9b8db51d68af1f20b701171fa942b7c6b41a
    // If email is not unique and pwds do not match 
    } else if (!userArr.every(checkUniqueEmail) && password !== confPwd) {
        // Hidden
        removeClass([pwdAlert, emailAlert], "hidden")
        // Error
        addClass([pwd, pwdConf, regEmail], "error");

    // If email is not unique 
    } else if(!userArr.every(checkUniqueEmail)) {
        // Hidden
        addClass([pwdAlert, emailAlert], "hidden");
        // Error
        removeClass([pwd, pwdConf], "error")
        addClass([regEmail], "error");

    // If pwds do not match 
    } else {
        // Hidden
        removeClass([pwdAlert], "hidden")
        addClass([emailAlert], "hidden");

        // Error
        addClass([pwd, pwdConf], "error");
        removeClass([regEmail], "error")
    }
}
