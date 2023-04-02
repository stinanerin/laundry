// ----------------------- LOGIN -----------------------
const loginForm = document.querySelector('#loginForm');

loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    validateLogin(document.querySelector('#loginEmail').value, document.querySelector('#loginPWD').value)
});

let validateLogin = (email, pwd) => {
    console.log(email, pwd);
}
