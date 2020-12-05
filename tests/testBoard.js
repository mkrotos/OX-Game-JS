import chai from 'chai';
import Board from '../Board.js';
const assert = chai.assert;

describe('rightNeighbours', () => {
    let fields = generateFields(3, 3);
    let board = new Board(fields, (field) => field.x, (field) => field.y);

    it('should return the same cell for length = 1', () => {
        let field = fields[0];
        assert.deepEqual(board._getRightNeighbours(field, 1), [findCorespondingCellInMap(board, field)])
    })
    it('should return the same cell and right neighbour for length = 2', () => {
        let field = fields[0];
        assert.deepEqual(board._getRightNeighbours(field, 2),
            [findCorespondingCellInMap(board, field), findCorespondingCellInMap(board, field, 1)])
    })
    it('should return the same cell for length = 2, if neighbour do not exists', () => {
        let field = fields[8];
        assert.deepEqual(board._getRightNeighbours(field, 2), [findCorespondingCellInMap(board, field)])
    })
})


describe('bottom Neighbours', () => {
    let fields = generateFields(3, 3);
    let board = new Board(fields, (field) => field.x, (field) => field.y);

    it('should return the same cell and bottom neighbour for length = 2', () => {
        let field = fields[0];
        assert.deepEqual(board._getBottomNeighbours(field, 2),
            [findCorespondingCellInMap(board, field), findCorespondingCellInMap(board, field, 0, 1)])
    })
    it('should return the same cell for length = 2, if neighbour do not exists', () => {
        let field = fields[8];
        assert.deepEqual(board._getBottomNeighbours(field, 2), [findCorespondingCellInMap(board, field)])
    })
})

describe('generate win sequences', () => {

    it('should generate 6 win sequences for 2x2 map for win sequence length 2', () => {
        let fields = generateFields(2, 2);
        let board = new Board(fields, (field) => field.x, (field) => field.y);
        assert.equal(board.generateWinSeqs(2).length, 6);
    })

    it('should generate 8 win sequences for 3x3 map for win sequence length 3', () => {
        let fields = generateFields(3, 3);
        let board = new Board(fields, (field) => field.x, (field) => field.y);
        assert.equal(board.generateWinSeqs(3).length, 8);
    })

    it('should generate 0 win sequences for 2x2 map for win sequence length 3', () => {
        let fields = generateFields(2, 2);
        let board = new Board(fields, (field) => field.x, (field) => field.y);
        assert.equal(board.generateWinSeqs(3).length, 0);
    })

    it('win sequences contains collections of fields', () => {
        let fields = generateFields(1, 1);
        let board = new Board(fields, (field) => field.x, (field) => field.y);
        assert.equal(board.generateWinSeqs(1)[0][0], fields[0]);
    })


})


function findCorespondingCellInMap(map, field, xShift = 0, yShift = 0) {
    return map.cells.filter(cell => cell.x == field.x + xShift && cell.y == field.y + yShift)[0];
}

function generateFields(xNumber, yNumber) {
    let fields = [];
    for (let x = 0; x < xNumber; x++) {
        for (let y = 0; y < yNumber; y++) {
            fields.push({ x, y });
        }
    }
    return fields;
}