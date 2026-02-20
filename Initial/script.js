// Game State Variables
let scores = [0, 0];
let activePlayer = 0; // 0 for Player 1, 1 for Player 2
let isPlaying = true;

// DOM Elements
const score0El = document.getElementById("score-0");
const score1El = document.getElementById("score-1");
const player0Panel = document.querySelector(".player-0-panel");
const player1Panel = document.querySelector(".player-1-panel");
const diceDisplay = document.getElementById("dice-display");
const btnRoll = document.getElementById("btn-roll");

// Array of Unicode dice faces (Index 0 is empty, 1-6 are the faces)
const diceFaces = ["", "⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];

// Function to switch turns
function switchPlayer() {
  activePlayer = activePlayer === 0 ? 1 : 0;
  // Toggle the visual 'active' class on both halves
  player0Panel.classList.toggle("active");
  player1Panel.classList.toggle("active");
}

// Event Listener for the Roll Button
btnRoll.addEventListener("click", function () {
  if (isPlaying) {
    // 1. Generate random number between 1 and 6
    const diceNum = Math.trunc(Math.random() * 6) + 1;

    // 2. Display the correct dice face
    diceDisplay.textContent = diceFaces[diceNum];

    // 3. Check for rolled 1
    if (diceNum !== 1) {
      // Add dice to total score
      scores[activePlayer] += diceNum;

      // Update the UI
      document.getElementById(`score-${activePlayer}`).textContent =
        scores[activePlayer];

      // 4. Check if player's score is >= 100 (Win Condition)
      if (scores[activePlayer] >= 100) {
        isPlaying = false; // Stop the game
        document
          .querySelector(`.player-${activePlayer}-panel`)
          .classList.add("winner");
        document.getElementById(`name-${activePlayer}`).textContent = "WINNER!";
        diceDisplay.textContent = "🏆";
      }
    } else {
      // If dice is 1, immediately switch to the other player
      switchPlayer();
    }
  }
});
