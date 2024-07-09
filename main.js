// Buttons
const startButton = document.querySelector(".start");
const stopButton = document.querySelector(".stop");
const resetButton = document.querySelector(".reset");

// Time Text
const oneHundredthText = document.querySelector("#one-hundredth");
const secondText = document.querySelector("#second");

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

// Counting
function startCounting() {
    if(oneHundredthSecond == 100) {
        oneHundredthSecond = 0;
        secondText.dispatchEvent(countSecondEvent);
    }

    checkTimeLessThanTen(oneHundredthSecond, oneHundredthText);

    oneHundredthSecond++;
}

// Need to fix 'Sec' text disappearing when updating the seconds amount
secondText.addEventListener("countSecond", () => {
    console.log(second);
    if(second == 60) {
        second = 0;
        console.log('Minute counted')
    }

    checkTimeLessThanTen(second, secondText);

    second++;

});


function checkTimeLessThanTen(time, timeText) {
    if(time < 10) {
        timeText.innerText = '0' + time;
    } else {
        timeText.innerText = time;
    }
}