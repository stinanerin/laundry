const API_BASE_URL = "https://nackademin-item-tracker.herokuapp.com/"
// 642163c3a74e209fd250ff45
const fetchData = async(id) => {
    const res = await fetch(`${API_BASE_URL}lists/${id}`)
    const data = await res.json();
    let arr = data.itemList
    console.log(arr);
    console.log(arr[arr.length -1]);
}
fetchData("63fd07e82a491a4d0882d577")

