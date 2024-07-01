let counting = false;
const startButton = document.querySelector(".start");
const stopButton = document.querySelector(".stop");
const resetButton = document.querySelector(".reset");
const oneHundredth = document.querySelector("#one-hundredth");

const countingEvent = new CustomEvent("counting", {
    detail: {
        counting: true,
    },
});

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

document.addEventListener("counting", () => {
    startButton.disabled = true;

    countingInterval = setInterval(startCounting, 10);
});

function startCounting() {
    console.log("In setInterval");

    oneHundredth.innerText++;
    if (oneHundredth.innerText < 10) {
        oneHundredth.innerText = `0${oneHundredth.innerText}`;
    }
}
