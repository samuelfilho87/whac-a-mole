const state = {
    view: {
        squares: document.querySelectorAll('.square'),
        enemy: document.querySelector('.enemy'),
        timeLeft: document.querySelector('#time .value-status'),
        score: document.querySelector('#score .value-status'),
    },
    values: {
        gameVelocity: 1000,
        hitPosition: 0,
        score: 0,
        timeLeft: 60,
    },
    actions: {
        randoSquareTimer: setInterval(randomSquare, 1000),
        timeLeftTimer: setInterval(countDown, 1000),
    }
};

function countDown() {
    state.values.timeLeft--;
    state.view.timeLeft.textContent = state.values.timeLeft;

    if (state.values.timeLeft < 1) {
        clearInterval(state.actions.timeLeftTimer);
        clearInterval(state.actions.randoSquareTimer);
        alert(`Game Over! O seu resultado foi: ${state.values.score}`);
    }
}

function randomSquare() {
    state.view.squares.forEach(square => {
        square.classList.remove('enemy');
    });

    const randomNumber = Math.floor(Math.random() * 9);
    const randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add('enemy');
    state.values.hitPosition = randomSquare.id;
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
    addListenerHitBox();
}

execute();