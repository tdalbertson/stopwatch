// Buttons
const startButton = document.querySelector(".start");
const stopButton = document.querySelector(".stop");
const resetButton = document.querySelector(".reset");

// Time Values
let oneHundredthSecond = 0;
let second = 0;

// Time Events
const countingEvent = new Event("counting");
const countSecondEvent = new Event("countSecond");

// Button Event Listeners
startButton.addEventListener("click", () => {
    startButton.classList.add("disabled");
    stopButton.classList.remove("disabled");

    document.dispatchEvent(countingEvent);
});

stopButton.addEventListener("click", (event) => {
    event.stopPropagation;
    
    startButton.disabled = false;
    startButton.classList.remove("disabled");
    stopButton.classList.add("disabled");

    // To stop the counting of time
    clearInterval(countingInterval);
});

// Counting event listeners
document.addEventListener("counting", () => {
    startButton.disabled = true;

    countingInterval = setInterval(startCounting, 10);
});

document.addEventListener("countSecond", () => {
    const secondValue = document.querySelector("#second");

    if(second == 60) {
        second = 0;
    }

    checkTimeLessThanTen(second, secondValue);
    second++;
});

// Counting
function startCounting() {
    const oneHundredthText = document.querySelector("#one-hundredth");

    if(oneHundredthSecond == 100) {
        oneHundredthSecond = 0;
        document.dispatchEvent(countSecondEvent);
    }

    checkTimeLessThanTen(oneHundredthSecond, oneHundredthText);
    oneHundredthSecond++;
}

function checkTimeLessThanTen(time, timeText) {
    let newText = '';
    
    if(time < 10) {
        newText = '0' + time;
    } else {
        newText = time;
    }

    timeText.innerText = newText;
}