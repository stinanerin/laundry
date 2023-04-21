// ----------------------- LOG OUT -----------------------

const logout = () => {
    localStorage.removeItem("user");
    toggleClass([loginContainer, calender], "hidden")
    checkSession()
}

