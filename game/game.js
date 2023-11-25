// Created audio objects for background music and hammer sound effect
const background = new Audio('/assets/audio/bgaudio.mp3');
const hammer = new Audio('/assets/audio/hammer.mp3');

// Selected elements from the DOM
let holes = document.querySelectorAll('.hole');
let moles = document.querySelectorAll('.mole');
let counter = document.querySelector('.score span');
let start = document.querySelector('.start');
let timer = document.querySelector('.time span');
let healthIcons = document.querySelectorAll('.health-img');
let volumeIcon = document.querySelector('.vol-img');

// Retrieved difficulty setting from local storage
const storedDifficulty = localStorage.getItem('whackAMoleDifficulty');

// Initialized game variables
let score = 0;
let health = 5;
let timeUp = false;
let time;
let countdown;
let started = false;
let isMuted = false;

// Set background music volume
background.volume = 0.3;

// Added event listeners for game controls
start.addEventListener('click', startTime);
holes.forEach(hole => hole.addEventListener('click', up));
volumeIcon.addEventListener('click', toggleMute);

// Function to play a sound effect
function playSound(audio) {
    if (!isMuted) {
        audio.currentTime = 0;
        audio.play();
    }
}

// Function to toggle mute on/off
function toggleMute() {
    isMuted = !isMuted;
    if (isMuted) {
        volumeIcon.src = '/assets/images/mute.png';
        background.pause();
    } else {
        volumeIcon.src = '/assets/images/low-volume.png';
        background.play();
    }
}

// Function to initialize the game when the start button is clicked
function startTime() {
    if (!started) {
        // Set up background music and initialize game variables
        background.currentTime = 0;
        background.play();
        score = 0;
        health = 5;
        counter.textContent = '0';
        updateHealth();
        timeUp = false;
        time = 0;
        started = true;
        timer.textContent = `${getTime()}`;
        
        // Start the game loop
        peep();
        countdown = setInterval(() => {
            time++;
            timer.textContent = `${getTime() - time}`;
            (getTime() - time === 3 || getTime() - time === 1) ? timer.style.color = '#f33' : timer.style.color = 'inherit';

            // Check if time is up
            if (time >= getTime()) {
                clearInterval(countdown);
                timeUp = true;
                started = false;
                background.pause();
                setTimeout(() => {
                    scoreboardUpdater();
                }, 1000);
            }
        }, 1000);
    }
}

// Function to handle whack (mole click) events
function up(e) {
    if (!timeUp && e.isTrusted) {
        const mole = this.querySelector('.mole');

        // Check if the clicked mole is active
        if (mole && mole.classList.contains('up')) {
            playSound(hammer);
            score += 10;
            mole.classList.remove('up');

            // Update the highest score in local storage
            if (score > parseInt(localStorage.getItem('whackAMoleHighestScore') || 0)) {
                localStorage.setItem('whackAMoleHighestScore', score);
            }
        } else {
            playSound(hammer);
            health--;
            updateHealth();
        }

        // Update the score display
        counter.textContent = `${score}`;
    }
}

// Function to update health icons on the screen
function updateHealth() {
    healthIcons.forEach((icon, index) => {
        if (index < health) {
            icon.style.visibility = 'visible';
        } else {
            icon.style.visibility = 'hidden';
        }
    });

    // Check if the player has run out of health
    if (health === 0) {
        timeUp = true;
        started = false;
        background.pause();
        setTimeout(() => {
            scoreboardUpdater();
        }, 1000);
    }
}

// Function to make moles appear and disappear
function peep() {
    const randomTime = getRandomTime();
    const hole = randomHole(holes);
    const mole = hole.querySelector('.mole');

    hole.classList.add('up');
    if (mole) mole.classList.add('up');

    // Set a timeout for mole disappearance
    setTimeout(() => {
        if (!timeUp) {
            hole.classList.remove('up');
            if (mole) mole.classList.remove('up');
            peep();
        }
    }, randomTime);
}

// Function to randomly select a mole hole
function randomHole(holes) {
    const index = Math.floor(Math.random() * holes.length);
    const hole = holes[index];
    return hole;
}

// Function to update the scoreboard and redirect to the result page
function scoreboardUpdater() {
    localStorage.setItem('whackAMoleScore', score);
    window.location.href = '/result/result.html';
}

// Function to get a random display time for moles
function getRandomTime() {
    switch (storedDifficulty) {
        case 'easy':
            return Math.round(Math.random() * (1500 - 600) + 600);
        case 'medium':
            return Math.round(Math.random() * (1500 - 400) + 400);
        case 'hard':
            return Math.round(Math.random() * (450 - 450) + 450);
        default:
            return Math.round(Math.random() * (1500 - 400) + 400);
    }
}

// Function to get the total game time based on difficulty
function getTime() {
    switch (storedDifficulty) {
        case 'easy':
            return 60;
        case 'medium':
            return 45;
        case 'hard':
            return 30;
        default:
            return 45;
    }
}

// Event listener for when the page has fully loaded
window.addEventListener('load', () => {
    background.play();
});
