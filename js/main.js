
checkSession()

prevMonth.addEventListener("click", () => { alterMonth("prev") })
nextMonth.addEventListener("click", () => { alterMonth("add") })

// ----------------------- TOGGLE BETWEEN REGISTER / LOGIN VIEW -----------------------
loginUserLink.addEventListener("click", () => { toggleClass([registerContainer, loginContainer], "hidden") })
registerUserLink.addEventListener("click", () => { toggleClass([registerContainer, loginContainer], "hidden") })