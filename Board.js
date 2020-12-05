import Cell from "./Cell.js";

export default class Board {
    /**
     * 
     * @param {Array<Element>} fields 
     * @param {Function} getX 
     * @param {Function} getY 
     */
    constructor(fields, getX, getY) {
        this.cells = fields.map(field => new Cell(field, getX, getY));
        this.height = Math.max(...this.cells.map(cell => cell.y));
        this.width = Math.max(...this.cells.map(cell => cell.x));
    }

    /**
     * Generate all posible win sequences for current map and given win sequence length
     * @param {number} winLenght 
     * @returns {Array<Array<Element>>}
     */
    generateWinSeqs(winLength) {
        let seqs = [];
        for (let cell of this.cells) {
            seqs.push(this._getRightNeighbours(cell, winLength));
            seqs.push(this._getBottomNeighbours(cell, winLength));
            seqs.push(this._getRightDiagonalNeighbours(cell, winLength));
            seqs.push(this._getLeftDiagonalNeighbours(cell, winLength));
        }
        return seqs.filter(seq => seq.length == winLength).map(seq => seq.map(cell => cell.field));
    }

    _getRightNeighbours(cell, length) {
        let filterPredicate = (c, i) => c.y == cell.y && c.x == cell.x + i;
        return this._getNeighbours(length, filterPredicate);
    }

    _getBottomNeighbours(cell, length) {
        let filterPredicate = (c, i) => c.y == cell.y + i && c.x == cell.x;
        return this._getNeighbours(length, filterPredicate);

    }

    _getRightDiagonalNeighbours(cell, length) {
        let filterPredicate = (c, i) => c.y == cell.y + i && c.x == cell.x + i;
        return this._getNeighbours(length, filterPredicate);
    }

    _getLeftDiagonalNeighbours(cell, length) {
        let filterPredicate = (c, i) => c.y == cell.y + i && c.x == cell.x - i;
        return this._getNeighbours(length, filterPredicate);
    }

    _getNeighbours(length, filterPredicate) {
        let seq = [];
        for (let i = 0; i < length; i++) {
            let neighbour = this.cells.filter(c => filterPredicate(c, i)).pop();
            if (neighbour) {
                seq.push(neighbour);
            }
        }
        return seq;
    }

}