"use strict";

const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");

const diceEl = document.querySelector(".dice");
const newGameButton = document.querySelector(".button--new");
const rollDiceButton = document.querySelector(".button--roll");
const holdButton = document.querySelector(".button--hold");

let scores, currentScore, activePlayer, playing; // scoping

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

rollDiceButton.addEventListener("click", function () {
  if (playing) {
    const randomDiceValue = Math.floor(Math.random() * 6) + 1;
    diceEl.classList.remove("hidden");
    diceEl.src = "images/dice-" + randomDiceValue + ".png";

    if (randomDiceValue !== 1) {
      currentScore += randomDiceValue;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

holdButton.addEventListener("click", function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("active--player");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
    } else {
      switchPlayer();
    }
  }
});

newGameButton.addEventListener("click", init);

/* if (activePlayer === 1) {
  console.log(activePlayer);
  activePlayer = 0;
  player0El.classList.add("player--active");
} 

/* for (let i = 0; i < scores.length; i++) {
  document.getElementById(`score--${[i]}`).textContent = 0;
  document.getElementById(`current--${[i]}`).textContent = 0;
} */
