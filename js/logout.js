// ----------------------- LOG OUT -----------------------

const logout = () => {
    // If a user is set in local - storage log them out
    if(getitem("user")) {
        checkSignedInUser()
        setItem("user", "")
        calender.classList.add("hidden")
        registerContainer.classList.remove("hidden")
        loginContainer.classList.add("hidden")
    }
}

document.querySelector("#logoutBtn").addEventListener("click", logout)
