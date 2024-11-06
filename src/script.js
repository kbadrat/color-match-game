// Pages.
const mainPage = document.getElementById("main-page");
const gamePage = document.getElementById("game-page");

/*          Main page.          */
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
        "You can guess 3 times wrong.",
        "Get the highest score.",
        "Guess 10 correctly to win.",
    ],
    currentGameMode: 0,

    level: ["Easy", "Medium", "Hard"],
    currentLevel: 1,
};

// Actula game settings.
class Game {
    constructor() {
        this.playerMode = settings.currentPlayerMode;
        this.gameMode = settings.currentGameMode;
        this.level = settings.currentLevel;
        this.points = 0;
        this.round = 1;
        this.health = 3;
    }

    resetSettings() {
        this.playerMode = settings.currentPlayerMode;
        this.gameMode = settings.currentGameMode;
        this.level = settings.currentLevel;
        this.points = 0;
        this.round = 1;
        this.health = 3;
    }

    getLevelName() {
        return settings.level[this.level];
    }

    addPoint() {
        this.points++;
    }

    nextRound() {
        this.round++;
    }

    getPoints() {
        return this.points;
    }

    getRounds() {
        return this.round;
    }

    getGameMode() {
        return settings.gameMode[this.gameMode];
    }

    getHealth() {
        return this.health;
    }

    subHealth() {
        this.health--;
    }

    isGameOver() {
        switch (this.getGameMode()) {
            case "Survival":
                if (this.getHealth() === 0) return true;
                break;
            case "20 rounds":
                if (this.getRounds() === 20) return true;
                break;
            case "10 to win":
                if (this.getPoints() === 10) return true;
                break;
            default:
                throw new Error("Unexpected value in switch statement.");
        }
    }
}

const game = new Game();

// Change modes.
playerModeBtn.addEventListener("click", nextPlayerMode);
gameModeBtn.addEventListener("click", nextGameMode);
levelBtn.addEventListener("click", nextLevel);

// Game launch.
startBtn.addEventListener("click", () => {
    game.resetSettings();
    startGame();
    mainPage.classList.toggle("hidden");
});

function nextPlayerMode() {
    settings.currentPlayerMode =
        (settings.currentPlayerMode + 1) % settings.playerMode.length;
    playerModeTitle.innerText = settings.playerMode[settings.currentPlayerMode];
    playerModeDescription.innerText =
        settings.playerModeDescription[settings.currentPlayerMode];

    // ! Multiplayer mode is not available
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

/*          Game page            */

const playfield = document.querySelector(".playfield");
const score = document.getElementById("game-score");
const round = document.getElementById("game-round");
const result = document.querySelector(".result");
const nextBtn = document.getElementById("next-btn");
nextBtn.addEventListener("click", loadNextRound);

let duplicateColor = "";

function generateColors() {
    let colors = [];

    switch (game.getLevelName()) {
        case "Easy":
            colors = generateEasyColors(15);
            break;
        case "Medium":
            colors = generateMediumColors(15);
            break;
        case "Hard":
            colors = generateHardColors(15);
            break;
        default:
            throw new Error("Unexpected value in switch statement.");
    }

    // Get random main color.
    duplicateColor = colors[Math.floor(Math.random() * colors.length)];
    colors.push(duplicateColor);

    // Mix it.
    colors.sort(() => Math.random() - 0.5);

    return [colors, duplicateColor];
}

function getRandomColorRGB() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return { r, g, b };
}

function generateEasyColors(count) {
    const brightColors = [];
    const colorOptions = [
        "red",
        "green",
        "blue",
        "yellow",
        "purple",
        "cyan",
        "orange",
        "pink",
        "brown",
        "coral",
        "teal",
        "gray",
        "lime",
        "magenta",
        "gold",
    ];

    while (brightColors.length < count) {
        const randomColor =
            colorOptions[Math.floor(Math.random() * colorOptions.length)];
        if (!brightColors.includes(randomColor)) {
            brightColors.push(randomColor);
        }
    }

    return brightColors;
}

function generateMediumColors(count) {
    const mediumColors = [];

    while (mediumColors.length < count) {
        let newColor = getRandomColorRGB();
        newColor = `rgb(${newColor.r}, ${newColor.g}, ${newColor.b})`;
        if (!mediumColors.includes(newColor)) {
            mediumColors.push(newColor);
        }
    }
    return mediumColors;
}

function generateHardColors(count) {
    const baseColor = getRandomColorRGB();
    const shades = new Set();

    while (shades.size < count) {
        const shade = adjustColorBrightness(
            baseColor,
            Math.floor(Math.random() * 140) - 70
        );
        shades.add(shade);
    }

    return Array.from(shades);
}

function adjustColorBrightness(color, percent) {
    const maxRGBValue = 230;

    const r = Math.min(
        maxRGBValue,
        Math.max(0, color.r + (color.r * percent) / 100)
    );
    const g = Math.min(
        maxRGBValue,
        Math.max(0, color.g + (color.g * percent) / 100)
    );
    const b = Math.min(
        maxRGBValue,
        Math.max(0, color.b + (color.b * percent) / 100)
    );

    return `rgb(${Math.floor(r)}, ${Math.floor(g)}, ${Math.floor(b)})`;
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
            game.subHealth();
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
        game.addPoint();

        result.innerText = "✅";
    } else result.innerText = "❌";

    updateCurrentStats();

    if (game.isGameOver()) nextBtn.innerText = "Finish 😌";

    nextBtn.classList.toggle("hidden");
}

function loadNextRound() {
    if (game.isGameOver()) {
        showResults();
        return;
    }

    result.classList.toggle("hidden");
    nextBtn.classList.toggle("hidden");

    game.nextRound();

    gamePage.style.height = "552px";

    startGame();
}

function updateCurrentStats() {
    switch (game.getGameMode()) {
        case "Survival":
            score.innerText = `Score: ${game.getPoints()}`;

            let health = "";

            for (let i = 0; i < game.getHealth(); i++) {
                health = `${health}❤️`;
            }
            round.innerText = `Health: ${health}`;

            break;
        case "20 rounds":
            score.innerText = `Score: ${game.getPoints()}`;
            round.innerText = `Round: ${game.getRounds()} / 20`;
            break;
        case "10 to win":
            score.innerText = `Score: ${game.getPoints()} / 10`;
            round.innerText = `Round: ${game.getRounds()}`;

            break;
        default:
            throw new Error("Unexpected value in switch statement.");
    }
}

function startGame() {
    updateCurrentStats();

    const [colors, duplicateColor] = generateColors();
    renderSquares(colors, duplicateColor);

    if (gamePage.classList.contains("hidden"))
        gamePage.classList.remove("hidden");
}

/* Result page */

const end = document.querySelector(".end");
const restartBtn = document.getElementById("restart-btn");
const resultScore = document.querySelector("#result-score");
const changeModeBtn = document.querySelector("#change-mode-btn");
restartBtn.addEventListener("click", restartGame);
changeModeBtn.addEventListener("click", changeMode);

function showResults() {
    switch (game.getGameMode()) {
        case "Survival":
            resultScore.innerText = `Your survival score: ${game.getPoints()}`;
            break;
        case "20 rounds":
            resultScore.innerText = `Your score: ${game.getPoints()}`;

            break;
        case "10 to win":
            resultScore.innerText = `You scored ${game.getPoints()} in ${game.getRounds()} rounds.`;

            break;
        default:
            throw new Error("Unexpected value in switch statement.");
    }

    gamePage.classList.toggle("hidden");
    end.classList.toggle("hidden");
}

function prepareGamePage() {
    nextBtn.innerText = "Next round";
    result.classList.toggle("hidden");
    nextBtn.classList.toggle("hidden");
    gamePage.style.height = "552px";
    end.classList.toggle("hidden");
}

function restartGame() {
    prepareGamePage();
    game.resetSettings();
    startGame();
}

function changeMode() {
    mainPage.classList.toggle("hidden");
    prepareGamePage();
}
