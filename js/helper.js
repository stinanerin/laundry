const createElement = (type, aClass, str, arr) => {
    let elem = document.createElement(type);
    elem.className = aClass;
    if(str) {
        elem.innerText = str
    }
    if(arr) {

    }
    return elem;
}
const diasableElem = (arr) => {
    document.querySelectorAll("input[type='radio'][name='time-slot']").forEach(radio => {
        arr.includes(+radio.value) ? radio.disabled = true : "";
    })
}