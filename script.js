'use strict';

// selecting elements
const player0EL = document.querySelector('.player--0');
const player1EL = document.querySelector('.player--1');

const score0EL = document.querySelector('#score--0');
const score1EL = document.getElementById('score--1');
const current0EL = document.getElementById('current--0');
const current1EL = document.getElementById('current--1');


const diceEL = document.querySelector('.dice');
const buttonNew = document.querySelector('.btn--new');
const buttonRoll = document.querySelector('.btn--roll');
const buttonHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

const init = function () {

    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0EL.textContent = 0;
    score1EL.textContent = 0;
    current0EL.textContent = 0;
    current1EL.textContent = 0;

    diceEL.classList.add('hidden');
    player0EL.classList.remove('player--winner');
    player1EL.classList.remove('player--winner');
    player0EL.classList.add('player--active');
    player1EL.classList.remove('playe--active');
    diceEL.classList.remove('hidden');
};

init();

diceEL.classList.add('hidden');

const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0; // ternary operator logic
    currentScore = 0;
    player0EL.classList.toggle('player--active');
    player1EL.classList.toggle('player--active');
}

// roll dice functionality
buttonRoll.addEventListener('click', function () {

    if (playing) {
        // 1. Genrating random rice roll
        const dice = Math.trunc(Math.random() * 6) + 1;
        console.log(dice);

        // 2. display dice
        diceEL.classList.remove('hidden');
        diceEL.src = `dice-${dice}.png`;

        //3. Check for rolled 1 if true, switch to the next player
        if (dice !== 1) {
            // add dice to the current score 
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            // switch to next player
            switchPlayer();
        }
    }

})

buttonHold.addEventListener('click', function () {

    if (playing) {
        // 1. Add current score to the acitve player score
        scores[activePlayer] += currentScore;
        // scores[1] = scores[1] + currentScore
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        // 2. Check if the score is  >= 100
        // finish game
        if (scores[activePlayer] >= 10) {
            // finish game
            playing = false;
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.add('player--winner');
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.remove('player--active');

            diceEL.classList.add('hidden');
        } else {
            // 3. switch the player 
            switchPlayer();
        }
    }
})

buttonNew.addEventListener('click', init); 