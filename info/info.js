function playGame() {
  // User interaction, trigger audio playback
  audio.play().catch(error => {
      // Handle the error (e.g., the user didn't interact)
      console.error("Autoplay failed:", error);
  });
  
  window.location.href = "/game/game.html";
}

// Create a background audio element
const audio = new Audio('/assets/audio/bgaudio.mp3');
audio.play()
audio.loop = true;
audio.volume = 0.3;
