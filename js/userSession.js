
// ----------------------- ADD USER TO SESSION STORAGE -----------------------
const addSession = (user) => {
    console.log(user);
    setItem("user", user._id);
}

//! ----------------------- CHECK IF USER IS ALREADY LOGGED IN -----------------------

getitem("user") ? toggleClass([registerContainer, calender], "hidden") : ""

