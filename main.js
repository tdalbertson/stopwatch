// Buttons
const startButton = document.querySelector(".start");
const stopButton = document.querySelector(".stop");
const resetButton = document.querySelector(".reset");

// Time Values
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
    startButton.classList.add("disabled");
    resetButton.classList.add("disabled");
    stopButton.classList.remove("disabled");

    document.dispatchEvent(countingEvent);
});

stopButton.addEventListener("click", (event) => {
    event.stopPropagation;
    
    stopButton.disabled = false;
    resetButton.disabled = false;
    startButton.disabled = false;

    resetButton.classList.remove("disabled");
    startButton.classList.remove("disabled");
    stopButton.classList.add("disabled");

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

    resetButton.classList.add("disabled");
    resetButton.disabled = true;
    startButton.disabled = false;
})

// Counting event listeners
document.addEventListener("counting", () => {
    startButton.disabled = true;
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