'use strict';
// Выборка элементов
const score0Elemtnt = document.querySelector('#score--0');
const score1Element = document.getElementById('score--1');
const current0Element = document.getElementById('current--0');
const current1Element = document.getElementById('current--1');
const diceElement = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');




// Устанавливаем изначальные условия 

let totalScores, currentScore, activePlayer, isPlaying;

const initGame = function () {

    totalScores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    isPlaying = true;

    score0Elemtnt.textContent = 0;
    score1Element.textContent = 0;
    current0Element.textContent = 0;
    current1Element.textContent = 0;
    player0Element.classList.remove('player--winner');
    player1Element.classList.remove('player--winner');
    player0Element.classList.remove('player--active');
    player1Element.classList.remove('player--active');
    player0Element.classList.add('player--active');
    diceElement.classList.add('hidden');
}

initGame();

const switchActivePlayer = function () {
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).
        textContent = currentScore;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0Element.classList.toggle('player--active');
    player1Element.classList.toggle('player--active');
};

//Бросаем кубик
btnRoll.addEventListener('click', function () {
    if (isPlaying) {
        // 1.Сгенирировать случайное число
        const diceNumber = Math.trunc(Math.random() * 6) + 1;
        console.log(diceNumber);
        // 2.Показать число на кубике
        diceElement.classList.remove('hidden');
        diceElement.src = `dice${diceNumber}.png`;
        // 3. Если число равно 1, переключиться на другого игрока, если не равно 1 добавить к текущим очкам
        if (diceNumber !== 1) {
            currentScore += diceNumber;
            document.getElementById(`current--${activePlayer}`).
                textContent = currentScore;
        } else {
            switchActivePlayer();
        }
    }
});

btnHold.addEventListener('click', function () {
    if (isPlaying) {
        //1. Добавить текущие очки к общим очкам активного игрока
        totalScores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = totalScores[activePlayer];

        //2. Если общие очки активного игрока >=100, ативный игрок выиграл, иначе переключить активного игрока на другого
        if (totalScores[activePlayer] >= 100) {
            isPlaying = false;
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            diceElement.classList.add('hidden');

        } else {
            switchActivePlayer();
        }
    }
});

btnNew.addEventListener('click', initGame);