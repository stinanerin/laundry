const calendar = document.querySelector(".calendar"),
    date = document.querySelector(".month-header"),
    daysContainer = document.querySelector(".calender-days-grid"),
    prev = document.querySelector(".fa-angle-left"),
    next = document.querySelector(".fa-angle-right");

console.log(calendar, date, daysContainer, prev, next);

let today = new Date(),
    month = today.getMonth(),
    year = today.getFullYear();
console.log(today);
console.log(month);
console.log(year);


