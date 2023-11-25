// Wait for the DOM to be fully loaded before executing the code
document.addEventListener("DOMContentLoaded", function () {
    // Retrieve user data from local storage or set default values
    const userJSON = localStorage.getItem('whackAMoleUser');
    const user = userJSON ? JSON.parse(userJSON) : { username: 'User' };
    const userScore = localStorage.getItem('whackAMoleScore') || 0;
    const highestScore = localStorage.getItem('whackAMoleHighestScore') || 0;

    // Get references to HTML elements
    const messageElement = document.getElementById('message');
    const userScoreElement = document.getElementById('userScore');
    const highestScoreElement = document.getElementById('highestScore');

    // Display user-specific information on the page
    messageElement.textContent = getScoreMessage(user.username, userScore);
    userScoreElement.textContent = userScore;
    highestScoreElement.textContent = `Highest Score: ${highestScore}`;
});

// Function to redirect the user to the game page for a new round
function playAgain() {
    window.location.href = "/game/game.html";
}

// Function to generate a personalized message based on the user's score
function getScoreMessage(username, score) {
    let message = `Well played, ${username}! `;
    if (score < 50) {
        message += "You can do better 🙂!";
    } else if (score >= 50 && score < 100) {
        message += "Good job! 👌";
    } else {
        message += "Excellent work! 🤗";
    }

    return message;
}
