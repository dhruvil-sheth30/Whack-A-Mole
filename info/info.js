// Get references to HTML elements
const playButton = document.getElementById('play');
const difficultySelect = document.getElementById('difficulty');
const usernameInput = document.getElementById('username');
const nicknameInput = document.getElementById('nickname');

// Added a click event listener to the play button
playButton.addEventListener('click', () => {
  playClickSound();
  playGame();
});

// Added a click event listener to the difficulty dropdown
difficultySelect.addEventListener('click', playClickSound);

// Function to handle the "Play" button click
function playGame() {
  // Get the selected difficulty, entered username, and nickname
  const selectedDifficulty = difficultySelect.value;
  const enteredUsername = usernameInput.value;
  const enteredNickname = nicknameInput.value;

  // Checking if the username is entered
  if (!enteredUsername) {
    alert("Please enter both username and nickname.");
    return;
  }

  // Created a user object with username and nickname
  const user = {
    username: enteredUsername,
    nickname: enteredNickname,
  };

  // Storeing user object and difficulty in localStorage
  localStorage.setItem('whackAMoleUser', JSON.stringify(user));
  localStorage.setItem('whackAMoleDifficulty', selectedDifficulty);
  
  // Redirecting to the game page
  window.location.href = "/game/game.html";
}

// Function to play a click sound
function playClickSound() {
  const clickSound = new Audio('/assets/audio/click.mp3'); 
  clickSound.play();
}

// Creating an audio element for the background music
const audio = new Audio('/assets/audio/bgaudio.mp3');
audio.pause();
audio.play();
audio.loop = true;
audio.volume = 0.3;
