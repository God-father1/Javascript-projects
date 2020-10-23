let timerVariable;

function initialize(countDownDate) {
  timerVariable = setInterval(function () {
    const now = new Date().getTime();
    const distance = countDownDate - now;
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    document.getElementById("timer").innerHTML = `${hours ? `${hours}h` : ""} 
    ${hours || minutes ? `${minutes}m` : ""} 
    ${hours || minutes || seconds ? `${seconds}s` : ""}`;

    if (distance < 0) {
      clearInterval(timerVariable);
      document.getElementById("timer").innerHTML = "Timer Expired";
    }
  }, 1000);
}

function startTimer() {
  clearInterval(timerVariable);
  const userHours = Number(document.getElementById("hours").value) || 0;
  const userMins = Number(document.getElementById("mins").value) || 0;
  const userSecs = Number(document.getElementById("secs").value) + 1 || 0;
  const now = new Date().getTime();
  const newTime =
    now + 1000 * userSecs + 1000 * 60 * userMins + 1000 * 60 * 60 * userHours;

  const countDownDate = new Date(newTime).getTime();
  initialize(countDownDate);
}

function toggleDarkMode() {
  const body = document.body;
  body.classList.toggle("darkmode");
}
