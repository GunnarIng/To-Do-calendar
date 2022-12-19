window.addEventListener("DOMContentLoaded", calenderInfo);

/** Creates an object with the current date, year, month and day. */

let calendar = {
  date: new Date(),
  year: null,
  month: null,
  day: null,
};

/** Array with the months of the year.*/
const months = ["Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli", "Augusti", "September", "Oktober", "November",  "December"];

/**Array with the weekdays */
// const weekdays = ["Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Lördag", "Söndag"];
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];



function renderCalenderDays() {
const dt = new Date();
// const nav = 0;

// if (nav !== 0) {
//   dt.setMonth(new Date().getMonth() + nav);
// }

const day = dt.getDate();
const month = dt.getMonth();
const year = dt.getFullYear();

// 1. behöver få ut vilken dag det är på första dagen i månaden
const firstDay = new Date(year, month, 1);
// 2. behöver få ut hur många dagar det är i månaden
const daysInMonth = new Date(year, month + 1, 0).getDate();   // kolla att det blir rätt måndad!!!!!


const dateString = firstDay.toLocaleDateString("en-us", {
  weekday: "long",
  year: "numeric",
  month: "numeric",
  day: "numeric"
})
const paddingDays = weekdays.indexOf(dateString.split(', ')[0]) -1;
console.log(dateString)


console.log(paddingDays);


// 4. behöver få ut vilken dag det är på första dagen i nästa månad
// 5. behöver få ut hur många dagar det är i nästa månad
// 6. behöver få ut vilken dag det är på sista dagen i nästa månad

} 
// toLocaleDateString("sv-se",)
// paddingdays to work with sv-se
// const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);
// console.log(dateString)


/**
 * Gets the current year, month and day and displays the current month in the calendar.
 */
function calenderInfo() {
  changeMonths();
  renderCalenderDays();
  calendar.year = calendar.date.getFullYear();
  calendar.month = calendar.date.getMonth();
  calendar.day = calendar.date.getDate();

  drawCurrentMonth();
  
}

/**
 * Adds event listeners to the buttons that changes the month.
 */
function changeMonths() {
  document
    .getElementById("monthBackArrow")
    .addEventListener("click", monthBack);
  document
    .getElementById("monthForwardArrow")
    .addEventListener("click", monthForward);
}

/**
 * If the month is december, the month will be set to january and the year will be increased by one.
 */
function monthForward() {
  if (calendar.month === 11) {
    calendar.month = 0;
    calendar.year++;
  } else {
    calendar.month++;
  }
  calendar.date = new Date(calendar.year, calendar.month, 1);
  drawCurrentMonth();
}

/**
 * If the month is january, the month will be set to december and the year will be decreased by one.
 */
function monthBack() {
  if (calendar.month === 0) {
    calendar.month = 11;
    calendar.year--;
  } else {
    calendar.month--;
  }
  calendar.date = new Date(calendar.year, calendar.month, 1);
  drawCurrentMonth();
}
/**
 * Displays the current month and year in the calendar.
 */
function drawCurrentMonth() {
  document.getElementById("displayCurrentMonth").innerText =
    months[calendar.month] + " " + +calendar.year;
    
}
