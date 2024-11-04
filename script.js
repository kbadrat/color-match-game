// Pages
const mainPage = document.getElementById("main-page");

// Main Page
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

// Actual game settings.
const game = {
    playerMode: settings.currentPlayerMode,
    gameMode: settings.currentGameMode,
    level: settings.currentLevel,
};

playerModeBtn.addEventListener("click", nextPlayerMode);
gameModeBtn.addEventListener("click", nextGameMode);
levelBtn.addEventListener("click", nextLevel);

startBtn.addEventListener("click", () => {
    startGame();
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
