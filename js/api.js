const API_BASE_URL = "https://nackademin-item-tracker.herokuapp.com/"

const fetchData = async(id) => {
    try {
        const res = await fetch(`${API_BASE_URL}lists/${id}`)
        if(!res.ok) {
            throw new Error(res.statusText)
        }
        const data = await res.json();
        let arr = data.itemList
        console.log(arr);
        let  objBooking  = arr[arr.length -1];
        // console.log("latest booking", objBooking);
        return arr
    } catch(error) {
        console.log(error);
        displayModal(error.message)

    }
}

// ----------------------- CREATE USER IN API -----------------------
const createUser = async(name, email, pwd) => {
    try {
        //todo! Change lsit
        const res = await fetch(`${API_BASE_URL}lists/6429d84525fc8200e0300328/items`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: name,
                email: email,
                password: pwd,
            }),
        });
        if(!res.ok) {
            throw new Error(res.statusText)
        } 
        const { list } = await res.json();
    
        // Find latest registered user and adds to local storage as signed in
        const user  = list.itemList[list.itemList.length -1];
        addSession(user)
        
    } catch (error) {
        displayModal(error.message)
    }
}

const addBooking = async(listId, dateObject) => {
    if(!usersBooking) {
        try {
            const res = await fetch(`${API_BASE_URL}lists/${listId}/items`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    booking: dateObject,
                    user_id: getitem("user").id
                }),
            })   
            if(!res.ok) {
                throw new Error(res.statusText)
            } 
            return res
        } catch(error) {
            displayModal(error.message)
        }
    }
}

const deleteBooking = async(listId, item) => {
    try {
        const res = await fetch(`${API_BASE_URL}lists/${listId}/items/${item._id}`,
            {
                method: "DELETE",
            }
        )
        if(!res.ok) {
            throw new Error(res.statusText)
        } 
        return res
    } catch(error) {
        displayModal(error.message)
    }
}