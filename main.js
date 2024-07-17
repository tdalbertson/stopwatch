// Buttons
const startButton = document.querySelector(".start");
const stopButton = document.querySelector(".stop");
const resetButton = document.querySelector(".reset");

let oneHundredthSecond = 0;
let second = 0;
let minute = 0;
let hour = 0;

// Time Events
const countingEvent = new Event("counting");
const countSecondEvent = new Event("countSecond");
const countMinuteEvent = new Event("countMinute");
const countHourEvent = new Event("countHour");

// Button Event Listeners
startButton.addEventListener("click", () => {
    document.dispatchEvent(countingEvent);
});

stopButton.addEventListener("click", (event) => {
    event.stopPropagation;
    
    stopButton.disabled = true;
    resetButton.disabled = false;
    startButton.disabled = false;

    // To stop the counting of time
    clearInterval(countingInterval);
});

resetButton.addEventListener("click", (event) => {
    event.stopPropagation;

    // Reset values and displayed text
    oneHundredthSecond = 0;
    second = 0;
    minute = 0;
    hour = 0;
    resetTimeText('time');

    resetButton.disabled = true;
    startButton.disabled = false;
})

// Counting event listeners
document.addEventListener("counting", () => {
    startButton.disabled = true;
    stopButton.disabled = false;
    resetButton.disabled = true;

    countingInterval = setInterval(startCounting, 10);
});

document.addEventListener("countSecond", () => {
    const secondValue = document.querySelector("#second");
    second++;

    if(second == 60) {
        document.dispatchEvent(countMinuteEvent);
        second = 0;
    }
    checkTimeLessThanTen(second, secondValue);
});

document.addEventListener("countMinute", () => {
    const minuteValue = document.querySelector("#minute");
    minute++;

    if(minute == 60) {
        document.dispatchEvent(countHourEvent);
        minute = 0;
    }
    checkTimeLessThanTen(minute, minuteValue);
});

document.addEventListener("countHour", () => {
    const hourValue = document.querySelector("#hour");
    hour++;

    checkTimeLessThanTen(hour, hourValue);
});

// Counting
function startCounting() {
    const oneHundredthText = document.querySelector("#one-hundredth");
    
    if(oneHundredthSecond == 100) {
        document.dispatchEvent(countSecondEvent);
        oneHundredthSecond = 0;
    }
    checkTimeLessThanTen(oneHundredthSecond, oneHundredthText);
    oneHundredthSecond++;
}

// Checking
function checkTimeLessThanTen(time, timeText) {
    let newText = '';
    
    if(time < 10) {
        newText = '0' + time;
    } else {
        newText = time;
    }

    timeText.innerText = newText;
}

// Resetting
function resetTimeText(className) {
    const elements = document.querySelectorAll(`.${className}`);

    elements.forEach((element) => {
        element.innerText = '00';
    })
}

// For abstracting within event listeners


// Time Values
// const Clock = {
//     oneHundredthSecond: 0,
//     second: 0,
//     minute: 0,
//     hour: 0
// }

// document.addEventListener("countMinute", () => {
//     someFunction('#minute', Clock.minute, countMinuteEvent);
// });

// function someFunction(element, timeValue, dispatchedEvent) {
//     const el = document.querySelector(`${element}`);
//     timeValue++;

//     if(timeValue == 60 && element != "#hour") {
//         document.dispatchEvent(dispatchedEvent);
//         timeValue = 0;
//     }
//     checkTimeLessThanTen(timeValue, el);
// } 