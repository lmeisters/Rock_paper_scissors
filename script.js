"use strict";

// Selecting elements
const resultDisplay = document.querySelector(".instructions--0");
const resultDisplay1 = document.querySelector(".instructions--1");
const playerMoveImage = document.getElementById("selected-move-image--0");
const computerMoveImage = document.getElementById("selected-move-image--1");

const playAgainButton = document.getElementById("play-again");

// Event listeners for player moves
document.getElementById("rock--0").addEventListener("click", function () {
    playerMove("rock");
});
document.getElementById("paper--0").addEventListener("click", function () {
    playerMove("paper");
});
document.getElementById("scissors--0").addEventListener("click", function () {
    playerMove("scissors");
});

// Event listener for play again button
document.getElementById("play-again").addEventListener("click", function () {
    resetGame();
});

let gameActive = true; // Global variable to track game status

// Generate computer's move
function generateComputerMove() {
    const moves = ["Rock", "Paper", "Scissors"];
    const randomIndex = Math.floor(Math.random() * 3);
    resultDisplay1.textContent = `Computer chose ${moves[randomIndex]}!`;
    return moves[randomIndex];
}

// Determine the winner
function determineWinner(playerMove, computerMove) {
    if (playerMove === computerMove) {
        return "draw";
    } else if (
        (playerMove === "rock" && computerMove === "scissors") ||
        (playerMove === "paper" && computerMove === "rock") ||
        (playerMove === "scissors" && computerMove === "paper")
    ) {
        return "player";
    } else {
        return "computer";
    }
}

// Update game interface
function updateGameUI(playerMove, computerMove, winner) {
    // Display player's move
    const playerMoveImagePath = `img/${playerMove}.svg`;
    playerMoveImage.src = playerMoveImagePath;
    playerMoveImage.alt = playerMove;

    // Display computer's move
    const computerMoveImagePath = `img/${computerMove}.svg`;
    computerMoveImage.src = computerMoveImagePath;
    computerMoveImage.alt = computerMove;

    // Display game result
    if (winner === "draw") {
        resultDisplay.textContent = "It's a draw!";
    } else if (winner === "player") {
        resultDisplay.textContent = "You win!";
    } else {
        resultDisplay.textContent = "Computer wins!";
    }

    // Check if game is over
    if (winner !== "draw" && gameActive) {
        gameActive = !updateLives(winner === "player" ? "computer" : "player");
        if (!gameActive) {
            endGame();
        }
    }
}

// Update player or computer lives
function updateLives(loser) {
    const lives = document.getElementById(`lives--${loser}`);
    const hearts = lives.querySelectorAll(".heart");

    // Remove a heart from the loser
    for (let i = hearts.length - 1; i >= 0; i--) {
        if (!hearts[i].classList.contains("heart--lost")) {
            hearts[i].classList.add("heart--lost");
            break;
        }
    }

    // Check if the loser has lost all hearts
    const lostHearts = lives.querySelectorAll(".heart--lost");
    if (lostHearts.length !== 3) {
        return false; // All hearts lost, game over
    }
    return true; // Still has hearts remaining
}

// Handle player's move
function playerMove(playerChoice) {
    if (!gameActive) return; // Don't process move if game is over
    const computerMove = generateComputerMove();
    const winner = determineWinner(playerChoice, computerMove);
    updateGameUI(playerChoice, computerMove, winner);
}

// End game function
function endGame() {
    playAgainButton.style.display = "block";
}

// Reset game function
function resetGame() {
    gameActive = true;
    const hearts = document.querySelectorAll(".heart--lost");
    hearts.forEach((heart) => {
        heart.classList.remove("heart--lost");
    });
    // playAgainButton.style.display = "none";

    // Return elements to starting conditions
    playerMoveImage.src = "";
    playerMoveImage.alt = "";
    computerMoveImage.src = "";
    computerMoveImage.alt = "";
    resultDisplay.textContent = "Choose your move";
    resultDisplay1.textContent = "";
}
