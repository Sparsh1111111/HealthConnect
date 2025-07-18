function startTimer() {
    var minutes = document.getElementById("minutes").value;
    var seconds = minutes * 60;
  
    var timerDisplay = document.getElementById("timer");
    var countdown = setInterval(updateTimer, 1000);
  
    function updateTimer() {
      var minutesLeft = Math.floor(seconds / 60);
      var secondsLeft = seconds % 60;
      timerDisplay.textContent = minutesLeft + ":" + (secondsLeft < 10 ? "0" : "") + secondsLeft;
  
      if (seconds <= 0) {
        clearInterval(countdown);
        timerDisplay.textContent = "Time's up!";
        playBuzzer();
      }
  
      seconds--;
    }
  }
  
  function playBuzzer() {
    var audio = new Audio("buzzer.mp3"); // Replace "buzzer.mp3" with the path to your buzzer sound file
    audio.play();
  }
  