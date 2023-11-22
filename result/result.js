document.addEventListener("DOMContentLoaded", function () {
    // Fetch the username and userScore from localStorage
    const username = localStorage.getItem('whackAMoleUsername') || 'User';
    const userScore = localStorage.getItem('whackAMoleScore') || 0;

    // Fetch the highestScore from localStorage
    let highestScore = localStorage.getItem('whackAMoleHighestScore') || 0;

    // Display username in the message
    document.getElementById('message').textContent = `Well played, ${username}!`;

    // Display user score
    document.getElementById('userScore').textContent = userScore;

    // Compare the new score with the highest score
    if (userScore > highestScore) {
        highestScore = userScore;
        // Update the highestScore in localStorage
        localStorage.setItem('whackAMoleHighestScore', highestScore);
        // Display a message for achieving the highest score
        document.getElementById('highScoreMessage').textContent = 'New High Score!';
    }
});

// Function to handle the "Play Again" button click
function playAgain() {
    // Redirect to the game page
    window.location.href = "/game/game.html";
}
