const playButton = document.getElementById('play');
const difficultySelect = document.getElementById('difficulty');
const usernameInput = document.getElementById('username');

// Add click sound for the PLAY button
playButton.addEventListener('click', () => {
  playClickSound();
  playGame();
});

// Add click sound for the difficulty dropdown
difficultySelect.addEventListener('click', playClickSound);

// Function to handle the "PLAY" button click
function playGame() {
  const selectedDifficulty = difficultySelect.value;
  const enteredUsername = usernameInput.value;
  localStorage.setItem('whackAMoleUsername', enteredUsername);
  localStorage.setItem('whackAMoleDifficulty', selectedDifficulty);
  window.location.href = "/game/game.html";
}

// Function to play the click sound
function playClickSound() {
  const clickSound = new Audio('/assets/audio/click.mp3'); 
  clickSound.play();
}

// Create a background audio element
const audio = new Audio('/assets/audio/bgaudio.mp3');
audio.pause();
audio.play();
audio.loop = true;
audio.volume = 0.6;
