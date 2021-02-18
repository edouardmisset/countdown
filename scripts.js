// Grabbing DOM elements & Defining Variables
const buttons = document.querySelectorAll(".timer__button");
const form = document.querySelector("form");
const input = document.querySelector("input");
const timeLeft = document.querySelector(".display__time-left");
const endTime = document.querySelector(".display__end-time");
let countdown;

// Addining some event listeners
buttons.forEach((button) => button.addEventListener("click", switchFunction));
form.addEventListener("submit", switchFunction);

// Creating the main timer function to display the time when the timer ends and time at the end
function timer(seconds) {
  const now = Date.now();
  const then = now + seconds * 1000; // value of the timer's end in ms

  clearInterval(countdown); // Clears any previous timer

  displayTimeLeft(seconds); // First 'iteration' of setInterval is after the delay, so we display it for the first time here
  displayEndTime(then);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);

    if (secondsLeft < 0) {
      clearInterval(countdown); // Clears timer
      return; // Stops the function here
    }
    displayTimeLeft(secondsLeft);
    // seconds--;
  }, 1000);
}

// Function to display the time left on the timer
function displayTimeLeft(seconds) {
  const minutesRemaining = Math.floor(seconds / 60);
  const secondsRemaining = seconds % 60;
  const fixedSecondRemaining =
    secondsRemaining < 10 ? `0${secondsRemaining}` : secondsRemaining;
  const displayedString = `${minutesRemaining}:${fixedSecondRemaining}`;

  document.title = displayedString;
  timeLeft.textContent = displayedString;
}

function displayEndTime(seconds) {
  const endTimeValue = new Date(seconds);

  endTime.textContent = endTimeValue.toLocaleTimeString().substr(0, 5); // Grabbing the first 5 char of the time object > string
}

function switchFunction(e) {
  if (e.target === document.customForm) {
    e.preventDefault();
    timer(this.minutes.value * 60);
    this.reset();
  } else {
    timer(this.dataset.time);
  }
}
