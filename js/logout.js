// ----------------------- LOG OUT -----------------------

const logout = () => {
    // If a user is set in local - storage log them out
    if(getitem("user")) {
        setItem("user", "")
        toggleClass([registerContainer, calender], "hidden")
    }
}

document.querySelector("#logoutBtn").addEventListener("click", logout)
