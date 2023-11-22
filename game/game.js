const background = new Audio('/assets/audio/bgaudio.mp3');
const hammer = new Audio('/assets/audio/hammer.mp3');
let holes = document.querySelectorAll('.hole');
let moles = document.querySelectorAll('.mole');
let counter = document.querySelector('.score span');
let start = document.querySelector('.start');
let timer = document.querySelector('.time span');
let healthIcons = document.querySelectorAll('.health-img');
let volumeIcon = document.querySelector('.vol-img');

const storedDifficulty = localStorage.getItem('whackAMoleDifficulty');

let score = 0;
let health = 5;
let timeUp = false;
let time;
let countdown;
let started = false;
let isMuted = false;

start.addEventListener('click', startTime);
holes.forEach(hole => hole.addEventListener('click', up));
volumeIcon.addEventListener('click', toggleMute);

function playSound(audio) {
    if (!isMuted) {
        audio.currentTime = 0;
        audio.play();
    }
}

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

function startTime() {
    if (!started) {
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
        peep();
        countdown = setInterval(() => {
            time++;
            timer.textContent = `${getTime() - time}`;
            (getTime() - time === 3 || getTime() - time === 1) ? timer.style.color = '#f33' : timer.style.color = 'inherit';

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

function up(e) {
    if (!timeUp && e.isTrusted) {
        if (this.querySelector('.mole').classList.contains('up')) {
            playSound(hammer);
            score += 10;
        } else {
            playSound(hammer); // Play hammer sound even when the click is unsuccessful
            health--;
            updateHealth();
        }

        counter.textContent = `${score}`;
    }
}

function updateHealth() {
    healthIcons.forEach((icon, index) => {
        if (index < health) {
            icon.style.visibility = 'visible';
        } else {
            icon.style.visibility = 'hidden';
        }
    });

    if (health === 0) {
        timeUp = true;
        started = false;
        background.pause();
        setTimeout(() => {
            scoreboardUpdater();
        }, 1000);
    }
}

function peep() {
    const randomTime = getRandomTime();
    const hole = randomHole(holes);
    const mole = hole.querySelector('.mole');
    hole.classList.add('up');
    mole.classList.add('up');
    setTimeout(() => {
        if (!timeUp) {
            hole.classList.remove('up');
            mole.classList.remove('up');
            peep();
        }
    }, randomTime);
}

function randomHole(holes) {
    const index = Math.floor(Math.random() * holes.length);
    const hole = holes[index];
    return hole;
}

function scoreboardUpdater() {
    // Store the score in localStorage for retrieval on the result page
    localStorage.setItem('whackAMoleScore', score);

    // Redirect to the result page
    window.location.href = '/result/result.html';
}

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

function getTime() {
    switch (storedDifficulty) {
        case 'easy':
            return 60;
        case 'medium':
            return 45;
        case 'hard':
            return 20;
        default:
            return 45;
    }
}

// Reload the page to refresh the moles when starting a new game
function reloadPage() {
    window.location.reload();
}

// Ensure that the background audio starts playing when the page is loaded
window.addEventListener('load', () => {
    background.play();
});
