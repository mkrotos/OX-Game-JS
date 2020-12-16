import Board from './Board.js';
import GameManager from './GameManager.js';

const playerTurn = document.getElementById('player-turn').firstChild;
const FIRST_PLAYER = 'O';
const SECOND_PLAYER = 'X';
const PRESSED_FIELD_COLOR = 'red';
const MIN_SIZE = 2;
const MAX_SIZE = 30;

/** @type {GameManager} */
let manager;
/** @type {HTMLTableElement} */
let boardTable;

let initUI = (rowsNumber = 3, columnsNumber = 3) => {
    boardTable = document.createElement('table');
    boardTable.id = 'board-table';
    let rows = [];
    for (let y = 0; y < rowsNumber; y++) {
        let row = document.createElement('tr');
        for (let x = 0; x < columnsNumber; x++) {
            let field = document.createElement('td');
            let button = createButton();
            field.append(button);
            row.append(field);
        }
        rows.push(row);
    }
    boardTable.append(...rows);

    let boardDiv = document.getElementById('board');
    boardDiv.append(boardTable);
}


let initGame = (winSequence = 3) => {
    let fields = [];
    for (let button of document.querySelectorAll('.button')) {
        fields.push(button);
    }
    let board = new Board(fields,
        (button) => button.parentElement.cellIndex,
        (button) => button.parentElement.parentElement.rowIndex);
    manager = new GameManager(board, winSequence, [FIRST_PLAYER, SECOND_PLAYER]);
}


let init = () => {
    let boardWidth = document.getElementById('width').value;
    let boardHeight = document.getElementById('height').value;
    let winSequence = document.getElementById('win-seq').value;

    checkBoardSize(boardWidth, boardHeight, winSequence);

    initUI(boardHeight, boardWidth);
    initGame(winSequence);
}

init();


let switchTurns = () => {
    if (playerTurn.data == FIRST_PLAYER) {
        playerTurn.data = SECOND_PLAYER;
    } else {
        playerTurn.data = FIRST_PLAYER;
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
    boardTable?.remove();
    console.log('reset');
    init();
}

window.onFieldClick = onFieldClick;
window.reset = reset;


function checkBoardSize(boardWidth, boardHeight, winSequence) {
    if (boardWidth < MIN_SIZE || boardWidth > MAX_SIZE
        || boardHeight < MIN_SIZE || boardHeight > MAX_SIZE
        || winSequence < MIN_SIZE || winSequence > MAX_SIZE) {
        alert(`Height and width af the board and win sequence length have to be between ${MIN_SIZE} and ${MAX_SIZE}.`);
        location.reload();
    }
}

function createButton() {
    let button = document.createElement('button');
    button.onclick = () => onFieldClick(button);
    button.innerText = ' ';
    button.className = 'button';
    return button;
}

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

