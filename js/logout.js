// ----------------------- LOG OUT -----------------------

const logout = () => {
    // If a user is set in local - storage log them out
    if(getitem("user")) {
        setItem("user", "")
        calender.classList.add("hidden")
        registerContainer.classList.remove("hidden")
        loginContainer.classList.add("hidden")
        checkSignedInUser()
    }
}

document.querySelector("#logoutBtn").addEventListener("click", logout)
