export default class Cell {
    constructor(field, getX, getY) {
        this.field = field;
        this.x = getX(field);
        this.y = getY(field);
    }

}