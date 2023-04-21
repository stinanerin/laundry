// ----------------------- LOG OUT -----------------------

const logout = () => {
<<<<<<< HEAD
    // If a user is set in local - storage log them out
    if(getitem("user")) {
        setItem("user", "")
        calender.classList.add("hidden")
        registerContainer.classList.remove("hidden")
        loginContainer.classList.add("hidden")
        checkSignedInUser()
    }
=======
    localStorage.removeItem("user");
    toggleClass([loginContainer, calender], "hidden")
    checkSession()
>>>>>>> 7fdf9b8db51d68af1f20b701171fa942b7c6b41a
}

