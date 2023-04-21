
// ----------------------- ADD USER TO SESSION STORAGE -----------------------
const addSession = (user) => {
    console.log(user);
    setItem("user", user._id);
    checkSession()
}

// ----------------------- CHECK ONGOING USER SESSION -----------------------
const checkSession = () => {
    if (getitem("user")){
        //todo! display userName
        addClass([loginContainer, registerContainer], "hidden")
        removeClass([calender], "hidden")
    } else {
        //Todo! Hide logout btn
    }
}