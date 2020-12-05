import Board from './Board.js';
import GameManager from './GameManager.js';

const playerTurn = document.getElementById('player-turn').firstChild;
const FIRTS_PLAYER = 'O';
const SECOND_PLAYER = 'X';
const PRESSED_FIELD_COLOR = 'red';
const WIN_SEQ_LENGTH = 3;

/** @type {GameManager} */
let manager;

let initGame = () => {
    let fields = [];
    for (let button of document.querySelectorAll('#board-table tr td button')) {
        fields.push(button);
    }
    let board = new Board(fields,
        (button) => button.parentElement.cellIndex,
        (button) => button.parentElement.parentElement.rowIndex);
    manager = new GameManager(board, WIN_SEQ_LENGTH, [FIRTS_PLAYER, SECOND_PLAYER]);
}

initGame();


let switchTurns = () => {
    if (playerTurn.data == FIRTS_PLAYER) {
        playerTurn.data = SECOND_PLAYER;
    } else {
        playerTurn.data = FIRTS_PLAYER;
    }
}

/**
 * Set as marked and check wins
 * @param {Element} button 
 */
let onFieldClick = (button) => {
    if (button.clickedPreviously) {
        console.log('Clicked again');
    } else {
        console.log('Clicked first time');
        markButtonAsPressed(button);
        if (manager.checkWin(button, playerTurn.data)) {
            endGame("Winner: " + playerTurn.data);
        } else if (manager.checkPass()) {
            endGame("Pass");
        }
        else {
            switchTurns();
        }
    }
}

let reset = () => {
    location.reload();
}

window.onFieldClick = onFieldClick;
window.reset = reset;


function endGame(message) {
    setTimeout(() => {
        alert(message);
        reset();
    }, 5);
}

function markButtonAsPressed(button) {
    button.style.backgroundColor = PRESSED_FIELD_COLOR;
    button.firstChild.data = playerTurn.data;
    button.clickedPreviously = true;
}

