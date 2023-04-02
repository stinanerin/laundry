const loginUserLink  = document.querySelector('#loginLink'),
    loginContainer =  document.querySelector("#loginWrapper"),
    registerUserLink  = document.querySelector('#registerLink'),
    registerContainer = document.querySelector("#registerWrapper"),
    registerUserForm = document.querySelector("#registerUser");

//-------------------------------------------- TOGGLE REGISTER / LOGIN VIEW ---------------------------------------------------
loginUserLink.addEventListener("click", () => { toggleClass([registerContainer, loginContainer], "hidden") })
registerUserLink.addEventListener("click", () => { toggleClass([registerContainer, loginContainer], "hidden") })

registerUserForm.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("register");

    const fullName = document.querySelector('#FullName'),
        email = document.querySelector('#email'),
        pwd = document.querySelector('#pwd'),
        pwdConf = document.querySelector('#pwdConf');

    console.log(fullName.value, email.value, pwd.value, pwdConf.value);

})

