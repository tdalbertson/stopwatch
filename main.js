let counting = false;
const startButton = document.querySelector('.start');
const stopButton = document.querySelector('.stop');
const resetButton = document.querySelector('.reset');

startButton.addEventListener('click', () => {
    counting = true;
    
    startButton.classList.add('disabled');
    stopButton.classList.remove('disabled');
});

stopButton.addEventListener('click', (event) => {
    event.stopPropagation;

    counting = false;

    startButton.classList.remove('disabled');
    stopButton.classList.add('disabled');
});

while(counting) {
    startButton.disabled = true;

    /*
        Time counting here
    */
}