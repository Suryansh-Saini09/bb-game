let timer = 30;
let score = 0;
let hitNumber = 0;

const timerEl = document.querySelector("#timerval");
const scoreEl = document.querySelector("#scoreval");
const hitEl = document.querySelector("#hitval");
const panelBottom = document.querySelector("#pbtm");

const hitSound = document.querySelector("#hitSound");
const gameOverSound = document.querySelector("#gameOverSound");
const bgMusic = document.getElementById("bgMusic");
bgMusic.volume = 0.2;

gameOverSound.volume = 0.2;
const toggleMusicBtn = document.getElementById("toggleMusic");

toggleMusicBtn.addEventListener("click", () => {
    if (bgMusic.paused) {
        bgMusic.play();
        toggleMusicBtn.textContent = "🔈";
    } else {
        bgMusic.pause();
        toggleMusicBtn.textContent = "🔇";
    }
});



function increaseScore() {
    score += 10;
    scoreEl.textContent = score;
    scoreEl.style.transform = "scale(1.3)";
    setTimeout(() => scoreEl.style.transform = "scale(1)", 150);
}

function generateHitNumber() {
    hitNumber = Math.floor(Math.random() * 10);
    hitEl.textContent = hitNumber;
}

function createBubbles() {
    let clutter = "";
    let bubbleCount = 64

    for (let i = 0; i < bubbleCount; i++) {
        let randomNum = Math.floor(Math.random() * 10);
        clutter += `<div class="bubble">${randomNum}</div>`;
    }

    panelBottom.innerHTML = clutter;
}

function startMusicOnInteraction() {
    document.body.addEventListener("click", () => {
        if (bgMusic.paused) {
            bgMusic.play().catch(() => {});
        }
    }, { once: true }); 
}


function runGameTimer() {
    bgMusic.play();
    const interval = setInterval(() => {
        if (timer > 0) {
            timer--;
            timerEl.textContent = timer;
        } else {
            bgMusic.pause();
            clearInterval(interval);
            gameOverSound.play();
            panelBottom.innerHTML = `
                <div style="text-align:center;">
                    <h1>Game Over</h1>
                    <h3>Your Score: ${score}</h3>
                    <button onclick="restartGame()" style="
                        margin-top:15px;
                        padding:10px 20px;
                        font-size:16px;
                        background-color:#3498db;
                        color:white;
                        border:none;
                        border-radius:5px;
                        cursor:pointer;
                    ">Play Again</button>
                </div>
            `;
        }
    }, 1000);
}

function restartGame() {
    bgMusic.currentTime = 0;
    bgMusic.play();
    timer = 30;
    score = 0;
    scoreEl.textContent = 0;
    timerEl.textContent = 30;
    createBubbles();
    generateHitNumber();
    runGameTimer();
}

panelBottom.addEventListener("click", function (e) {
    if (e.target.classList.contains("bubble")) {
        const clicked = Number(e.target.textContent);

        if (clicked === hitNumber) {
            hitSound.currentTime = 0;
            hitSound.play();

            increaseScore();
            createBubbles();
            generateHitNumber();
        }
    }
});


// Game Init
createBubbles();
generateHitNumber();
runGameTimer();
startMusicOnInteraction();


