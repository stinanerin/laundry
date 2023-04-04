const loginUserLink  = document.querySelector('#loginLink'),
    loginContainer =  document.querySelector("#loginWrapper"),
    registerUserLink  = document.querySelector('#registerLink'),
    registerContainer = document.querySelector("#registerWrapper"),
    registerUserForm = document.querySelector("#registerUser"),
    calender = document.querySelector('#calenderWrapper'),
    pwdAlert = document.querySelector("#passwordAlert"),
    emailAlert = document.querySelector("#emailAlert");

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
    const userArr = await fetchData("6429d84525fc8200e0300328")
    const checkUniqueEmail = user => user.email !== email;
    
    // If email is unique and pwds match 
    if(userArr.every(checkUniqueEmail) && password === confPwd) {
        // Cretes user in API
        createUser(name, email, password, confPwd);
        calender.classList.remove("hidden")
        registerContainer.classList.add("hidden")
        checkSignedInUser()
    // If email is not unique and pwds do not match 
    } else if (!userArr.every(checkUniqueEmail) && password !== confPwd) {
        // Hidden
        pwdAlert.classList.remove("hidden")
        emailAlert.classList.remove("hidden")
        // Error
        pwd.classList.add("error");
        pwdConf.classList.add("error");
        regEmail.classList.add("error");
    // If email is not unique 
    } else if(!userArr.every(checkUniqueEmail)) {
        // Hidden
        pwdAlert.classList.add("hidden")
        emailAlert.classList.remove("hidden")
        // Error
        pwd.classList.remove("error");
        pwdConf.classList.remove("error");
        regEmail.classList.add("error");
    // If pwds do not match 
    } else {
        // Hidden
        pwdAlert.classList.remove("hidden")
        emailAlert.classList.add("hidden")
        // Error
        pwd.classList.add("error");
        pwdConf.classList.add("error");
        regEmail.classList.remove("error");
    }
}
