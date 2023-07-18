"use strict"

//selecting elements
/*
const score = document.querySelectorAll(".score");
score[0].textContent=0;
score[1].textContent=0;
*/
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.getElementById("score--0");
const score1El = document.querySelector("#score--1");
const currScore0El = document.getElementById("current--0");
const currScore1El = document.getElementById("current--1");

const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

let score, currentScore, activePlayer, playing;

//setting intial conditions
const init = function(){
    score = [0,0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0El.textContent=0;
    score1El.textContent=0;
    currScore0El.textContent=0;
    currScore1El.textContent=0;        
    
    diceEl.classList.add("hidden");

    player0El.classList.remove("player--winner");
    player1El.classList.remove("player--winner");

    player0El.classList.add("player--active");
    player1El.classList.remove("player--active");
}

const switchPlayer = function(){
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle("player--active");
    player1El.classList.toggle("player--active");
}

init();

btnRoll.addEventListener("click", function(){
    if(playing){
        //1.generate random dice roll
        const dice = Math.trunc(Math.random()*6) + 1;

        //2.display dice roll
        diceEl.classList.remove("hidden");
        diceEl.src = `dice-${dice}.png`;

        //3.check condition
        if(dice!=1){
            //Add score to current
            currentScore+=dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        }
        else{
            switchPlayer();    
        }
    }
});

btnHold.addEventListener("click", function(){
    if(playing){
        //1.add current score to total score
        score[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = score[activePlayer];

        //2.check condition
        if(score[activePlayer]>=20){
            //game finish
            playing=false;

            //current player wins
            document.querySelector(`.player--${activePlayer}`).classList.add("player--winner");
            document.querySelector(`.player--${activePlayer}`).classList.remove("player--active");
        }
        else{
            switchPlayer();
        }

    }
});

btnNew.addEventListener("click", init);