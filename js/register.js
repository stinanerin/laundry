
const registerUserForm = document.querySelector("#registerUser")

registerUserForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    console.log("register");

    const fullName = document.querySelector('#FullName'),
        email = document.querySelector('#email'),
        pwd = document.querySelector('#pwd'),
        pwdConf = document.querySelector('#pwdConf');

    console.log(fullName.value, email.value, pwd.value, pwdConf.value);

})