// Pages.
const mainPage = document.getElementById("main-page");
const gamePage = document.getElementById("game-page");

/* Main page. */
const playerModeBtn = document.getElementById("player-mode");
const playerModeTitle = document.getElementById("player-mode-title");
const playerModeDescription = document.getElementById(
    "player-mode-description"
);
const gameModeBtn = document.getElementById("game-mode-btn");
const gameModeTitle = document.getElementById("game-mode-title");
const gameModeDescription = document.getElementById("game-mode-description");

const levelBtn = document.getElementById("level-btn");
const levelTitle = document.getElementById("level-btn-text");

const startBtn = document.getElementById("start-btn");
const notAvailableText = document.getElementById("mode-not-available");

// All settings.
const settings = {
    playerMode: ["Singleplayer", "Multiplayer"],
    playerModeDescription: ["Play on your own.", "Play with your friends."],
    currentPlayerMode: 0,

    gameMode: ["Survival", "20 rounds", "10 to win"],
    gameModeDescription: [
        "You can guess 4 times wrong.",
        "Get the highest score.",
        "Guess 10 correctly to win.",
    ],
    currentGameMode: 0,

    level: ["Easy", "Meduim", "Hard"],
    currentLevel: 1,
};

// Actula game settings.
const game = {
    playerMode: settings.currentPlayerMode,
    gameMode: settings.currentGameMode,
    level: settings.currentLevel,
};

// Change modes.
playerModeBtn.addEventListener("click", nextPlayerMode);
gameModeBtn.addEventListener("click", nextGameMode);
levelBtn.addEventListener("click", nextLevel);

// Game launch.
startBtn.addEventListener("click", () => {
    startGame();
    switchPages();
});

function nextPlayerMode() {
    settings.currentPlayerMode =
        (settings.currentPlayerMode + 1) % settings.playerMode.length;
    playerModeTitle.innerText = settings.playerMode[settings.currentPlayerMode];
    playerModeDescription.innerText =
        settings.playerModeDescription[settings.currentPlayerMode];

    /* Multiplayer mode is not available */
    gameModeBtn.classList.toggle("not-available");
    levelBtn.classList.toggle("not-available");
    startBtn.classList.toggle("hidden");
    notAvailableText.classList.toggle("hidden");
}

function nextGameMode() {
    settings.currentGameMode =
        (settings.currentGameMode + 1) % settings.gameMode.length;
    gameModeTitle.innerText = settings.gameMode[settings.currentGameMode];
    gameModeDescription.innerText =
        settings.gameModeDescription[settings.currentGameMode];
}

function nextLevel() {
    settings.currentLevel = (settings.currentLevel + 1) % settings.level.length;
    levelTitle.innerText = settings.level[settings.currentLevel];
}

/* Game page */

const playfield = document.querySelector(".playfield");
const score = document.getElementById("game-score");
const round = document.getElementById("game-round");
const result = document.querySelector(".result");
const nextBtn = document.getElementById("next-btn");
nextBtn.addEventListener("click", loadNextRound);

const statistics = {
    score: 0,
    round: 1,
};

function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

let duplicateColor;

function generateColors() {
    let colors = [];

    while (colors.length < 15) {
        const newColor = getRandomColor();
        if (!colors.includes(newColor)) colors.push(newColor);
    }

    // Get random main color.
    duplicateColor = colors[Math.floor(Math.random() * colors.length)];
    colors.push(duplicateColor);

    // Mix it.
    colors.sort(() => Math.random() - 0.5);

    return [colors, duplicateColor];
}

function renderSquares(colors, duplicateColor) {
    playfield.innerHTML = "";

    colors.forEach((color) => {
        const square = document.createElement("button");
        square.classList.add("square");
        square.style.backgroundColor = color;
        square.addEventListener("click", () =>
            showAnswer(color, duplicateColor)
        );
        playfield.appendChild(square);
    });
}

function showAnswer(selectedColor, duplicateColor) {
    let isCorrectAnswer = true;

    playfield.childNodes.forEach((square) => {
        const clickedColor = square.style.backgroundColor;

        if (duplicateColor === clickedColor) {
            square.style.pointerEvents = "none";
        } else if (selectedColor === clickedColor) {
            square.style.pointerEvents = "none";
            isCorrectAnswer = false;
        } else {
            square.classList.add("invisible");
        }
    });

    handleStatistics(isCorrectAnswer);
}

function handleStatistics(isCorrectAnswer) {
    gamePage.style.height = "684px";
    result.classList.toggle("hidden");

    if (isCorrectAnswer) {
        statistics.score++;
        score.innerText = `Score: ${statistics.score} / 10`;
        result.innerText = "✅";
    } else result.innerText = "❌";

    statistics.round++;
    round.innerText = `Round: ${statistics.round}`;
    nextBtn.classList.toggle("hidden");
}

function loadNextRound() {
    result.classList.toggle("hidden");
    nextBtn.classList.toggle("hidden");
    score.innerText = `Score: ${statistics.score} / 10`;

    gamePage.style.height = "552px";

    startGame();
}

function switchPages() {
    mainPage.classList.toggle("hidden");
    gamePage.classList.toggle("hidden");
}

function startGame() {
    const [colors, duplicateColor] = generateColors();
    renderSquares(colors, duplicateColor);
}