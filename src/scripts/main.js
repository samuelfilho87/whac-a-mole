const state = {
    view: {
        squares: document.querySelectorAll('.showEnemy'),
        enemy: document.querySelector('.enemy'),
        timeLeft: document.querySelector('#time .value-status'),
        score: document.querySelector('#score .value-status'),
        player: document.querySelector('#player .value-status'),
        restart: document.querySelector('#restart').addEventListener('mousedown', () => restart()),
    },
    values: {
        gameVelocity: 1000,
        score: 0,
        timeLeft: 60,
        playerAttempts: 3,
        squareEnemy: null,
        gameOver: false,
    },
    actions: {
        randoSquareTimer: setInterval(randomSquare, 1000),
        timeLeftTimer: setInterval(countDown, 1000),
        hitSound: () => playSound('mouse.wav'),
    }
};

function countDown() {
    state.values.timeLeft--;
    state.view.timeLeft.textContent = state.values.timeLeft;
    gameOverHandle();
}

function playSound(sound) {
    const audio = new Audio(`./src/sounds/${sound}`);
    audio.play();
}

function randomSquare() {
    if (state.values.squareEnemy) state.values.squareEnemy.classList.remove('enemy');

    const randomNumber = Math.floor(Math.random() * 9);
    state.values.squareEnemy = state.view.squares[randomNumber];
    state.values.squareEnemy.classList.add('enemy');
}

function addListenerHitBox() {
    state.view.squares.forEach(square => {
        square.addEventListener('mousedown', () => {
            square.id === state.values.squareEnemy.id ? hitSuccessful() : hitFail();
        });
    });
}

function hitSuccessful() {
    state.actions.hitSound();
    state.values.score++;
    state.view.score.textContent = state.values.score;
    state.values.hitPosition = null;
    increaseSpeed();
}

function hitFail() {
    state.values.playerAttempts--;
    state.view.player.textContent = `x${state.values.playerAttempts}`;
    gameOverHandle();
}

function increaseSpeed() {
    clearInterval(state.actions.randoSquareTimer);
    state.values.gameVelocity = state.values.gameVelocity - 100;
    state.actions.randoSquareTimer = setInterval(randomSquare, state.values.gameVelocity);
}

function gameOverHandle() {
    const timeIsOver = state.values.timeLeft < 1;
    const playerAttemptsIsOver = state.values.playerAttempts === 0;
    const gameOver = timeIsOver || playerAttemptsIsOver;

    if (!state.values.gameOver && gameOver) {
        state.values.gameOver = gameOver;
        clearInterval(state.actions.timeLeftTimer);
        clearInterval(state.actions.randoSquareTimer);
        alert(`Game Over! O seu resultado foi: ${state.values.score}`);
    }
}

function restart() {
    state.values.gameOver = false;
    state.values.gameVelocity = 1000;
    state.values.playerAttempts = 3;
    state.view.player.textContent = `x3`;
    state.values.score = 0;
    state.view.score.textContent = 0;
    state.values.timeLeft = 60;
    state.view.timeLeft.textContent = 60;
    clearInterval(state.actions.timeLeftTimer);
    clearInterval(state.actions.randoSquareTimer);
    state.actions.timeLeftTimer = setInterval(countDown, 1000);
    state.actions.randoSquareTimer = setInterval(randomSquare, 1000);
}

function execute() {
    addListenerHitBox();
}

execute();