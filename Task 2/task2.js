let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

const startButton = document.getElementById("start-button");
const pauseButton = document.getElementById("pause-button");
const resetButton = document.getElementById("reset-button");
const lapButton = document.createElement("button");
lapButton.textContent = "Lap";
lapButton.id = "lap-button";
lapButton.classList.add("control-button");
lapButton.disabled = true; // Initially disabled
document.querySelector(".button-group").appendChild(lapButton);

const hoursDisplay = document.getElementById("hours");
const minutesDisplay = document.getElementById("minutes");
const secondsDisplay = document.getElementById("seconds");
const lapTimesList = document.getElementById("lap-times");

function updateDisplay() {
    const totalSeconds = Math.floor(elapsedTime / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    hoursDisplay.textContent = String(hours).padStart(2, '0');
    minutesDisplay.textContent = String(minutes).padStart(2, '0');
    secondsDisplay.textContent = String(seconds).padStart(2, '0');
}

function startStopwatch() {
    if (!isRunning) {
        isRunning = true;
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            updateDisplay();
        }, 1000);
        startButton.disabled = true;
        pauseButton.disabled = false;
        lapButton.disabled = false; // Enable lap button when running
    }
}

function pauseStopwatch() {
    if (isRunning) {
        isRunning = false;
        clearInterval(timerInterval);
        startButton.disabled = false;
        pauseButton.disabled = true;
    }
}

function resetStopwatch() {
    clearInterval(timerInterval);
    isRunning = false;
    elapsedTime = 0;
    updateDisplay();
    lapTimesList.innerHTML = ''; // Clear all lap times
    startButton.disabled = false;
    pauseButton.disabled = true;
    lapButton.disabled = true; // Disable lap button when reset
}

function recordLap() {
    if (elapsedTime > 0 && isRunning) {
        const lapTime = document.createElement("li");
        lapTime.textContent = `Lap ${lapTimesList.children.length + 1}: ${hoursDisplay.textContent}:${minutesDisplay.textContent}:${secondsDisplay.textContent}`;
        lapTimesList.appendChild(lapTime);
    }
}

// Event listeners
startButton.addEventListener("click", startStopwatch);
pauseButton.addEventListener("click", pauseStopwatch);
resetButton.addEventListener("click", resetStopwatch);
lapButton.addEventListener("click", recordLap);
