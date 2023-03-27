const API_BASE_URL = "https://nackademin-item-tracker.herokuapp.com/"
// 642163c3a74e209fd250ff45
const fetchData = async(id) => {
    const res = await fetch(`${API_BASE_URL}lists/${id}`)
    const data = await res.json();
    let arr = data.itemList
    let  objBooking  = arr[arr.length -1];
    console.log(objBooking);
}
fetchData("63fd07e82a491a4d0882d577")

const addBooking = async(listId, dateObject, userID) => {
    try {
        const res = await fetch(`${API_BASE_URL}lists/${listId}/items`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                booking: dateObject,
                user_id: userID
            }),
    
        })
        const { list } = await res.json();
        console.log(list);
    } catch(error) {
        console.log(error);
    }
}