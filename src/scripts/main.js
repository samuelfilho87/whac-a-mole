const state = {
    view: {
        squares: document.querySelectorAll('.square'),
        enemy: document.querySelector('.enemy'),
        timeLeft: document.querySelector('#time-left .value-status'),
        score: document.querySelector('#score .value-status'),
    },
    values: {
        timerId: null,
        gameVelocity: 1000,
        hitPosition: 0,
        score: 0,
    },
};

function randomSquare() {
    state.view.squares.forEach(square => {
        square.classList.remove('enemy');
    });

    const randomNumber = Math.floor(Math.random() * 9);
    const randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add('enemy');
    state.values.hitPosition = randomSquare.id;
}

function moveEnemy() {
    state.values.timerId = setInterval(randomSquare, state.values.gameVelocity);
}

function addListenerHitBox() {
    state.view.squares.forEach(square => {
        square.addEventListener('mousedown', () => {
            if (square.id === state.values.hitPosition) {
                state.values.score++;
                state.view.score.textContent = state.values.score;
                state.values.hitPosition = null;
            }
        });
    });
}

function execute() {
    moveEnemy();
    addListenerHitBox();
}

execute();