const state = {
    view: {
        squares: document.querySelectorAll('.showEnemy'),
        enemy: document.querySelector('.enemy'),
        timeLeft: document.querySelector('#time .value-status'),
        score: document.querySelector('#score .value-status'),
        player: document.querySelector('#player .value-status'),
    },
    values: {
        gameVelocity: 1000,
        score: 0,
        timeLeft: 60,
        playerAttempts: 3,
        squareEnemy: null,
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
            if (square.id === state.values.squareEnemy.id) {
                state.actions.hitSound();
                state.values.score++;
                state.view.score.textContent = state.values.score;
                state.values.hitPosition = null;
            } else {
                state.values.playerAttempts--;
                state.view.player.textContent = `x${state.values.playerAttempts}`;
                gameOverHandle();
            }
        });
    });
}

function gameOverHandle() {
    const timeIsOver = state.values.timeLeft < 1;
    const playerAttemptsIsOver = state.values.playerAttempts === 0;
    const gameOver = timeIsOver || playerAttemptsIsOver;

    if (gameOver) {
        clearInterval(state.actions.timeLeftTimer);
        clearInterval(state.actions.randoSquareTimer);
        alert(`Game Over! O seu resultado foi: ${state.values.score}`);
    }
}

function execute() {
    addListenerHitBox();
}

execute();