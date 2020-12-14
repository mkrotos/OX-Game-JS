import Board from './Board.js';

export default class GameManager {
    /**
     * @param {Board} board 
     * @param {number} winLength 
     * @param {Array} players 
     */
    constructor(board, winLength, players) {
        this.winSeqs = board.generateWinSeqs(winLength);
        this.numberOfFields = board.cells.length;
        /** @type {Map<any, Array<Element>>} */
        this.playersFields = new Map();
        players.forEach(player => this.playersFields.set(player, []));
    }

    /**
     * Add current field to player pool and check if he won a match.
     * @param {Element} field 
     * @param {String} player 
     * @returns {boolean}
     */
    checkWin(field, player) {
        const currentPlayerFields = this.playersFields.get(player);
        currentPlayerFields.push(field);
        return this.winSeqs.some(seq => seq.every(f => currentPlayerFields.includes(f)));
    }

    checkPass() {
        let currentlyPressed = [...this.playersFields.values()]
            .map(val => val.length)
            .reduce((prev, curr) => prev + curr);
        return this.numberOfFields == currentlyPressed;
    }
}