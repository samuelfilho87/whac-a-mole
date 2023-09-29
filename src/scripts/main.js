const state = {
    view: {
        squares: document.querySelectorAll('.square'),
        enemy: document.querySelector('.enemy'),
        timeLeft: document.getElementById('time-left'),
        score: document.getElementById('score'),
    },
    values: {
        timerId: null,
        gameVelocity: 1000,
    },
};

function randomSquare() {
    state.view.squares.forEach(square => {
        square.classList.remove('enemy');
    });

    const randomNumber = Math.floor(Math.random() * 9);
    const randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add('enemy');
}

function moveEnemy() {
    state.values.timerId = setInterval(randomSquare, state.values.gameVelocity);
}

function addListenerHitBox() {
    state.view.squares.forEach(square => { });
}

function execute() {
    moveEnemy();
}

execute();