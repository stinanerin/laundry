const API_BASE_URL = "https://nackademin-item-tracker.herokuapp.com/"

const fetchData = async(id) => {
    try {
        const res = await fetch(`${API_BASE_URL}lists/${id}`)
        const data = await res.json();
        let arr = data.itemList
        let  objBooking  = arr[arr.length -1];
        // console.log("latest booking", objBooking);
        return arr
    } catch(error) {
        //todo! display errror
        console.log(error);
        return error
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
        const { list } = await res.json();
    
        // Find latest registered user and adds to local storage as signed in
        const user  = list.itemList[list.itemList.length -1];
        addSession(user)
        
    } catch (error) {
        //todo! display errror
        console.log(error);
    }
}

const addBooking = async(listId, dateObject) => {
    if(!usersBooking) {
        try {
            return await fetch(`${API_BASE_URL}lists/${listId}/items`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    booking: dateObject,
                    user_id: getitem("user").id
                }),
            })   
        } catch(error) {
            //todo! display errror
            console.log(error);
        }
    }
}

const deleteBooking = async(listId, item) => {
    try {
        return await fetch(`${API_BASE_URL}lists/${listId}/items/${item._id}`,
            {
            method: "DELETE",
            }
        );
    } catch(error) {
        //todo! display errror
        console.log(error);
    }
}