// ----------------------- LOGIN -----------------------
const loginForm = document.querySelector('#loginForm');

loginForm.addEventListener("submit", async(e) => {
    e.preventDefault();
    const users = await fetchData("6429d84525fc8200e0300328")
    validateLogin(users, document.querySelector('#loginEmail').value, document.querySelector('#loginPWD').value)
});

let validateLogin = (arr, email, pwd) => {
    console.log(arr, email, pwd);
    //todo bryt ut?
    const findUser = user => user.email === email && user.password === pwd;

    if(arr.find(findUser)) {
        console.log("user exists");
        setItem("user", arr.find(findUser)._id);
        console.log(getitem("user"));
    } else {
        console.log("user doesn´t exist");
    }
}
