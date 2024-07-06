"use strict";
class TableData {
    //#region constructor, get, set
    constructor(elementId, tableWidth, tableHeight) {
        this.elementId = elementId;
        this.tableHeight = tableHeight;
        this.tableWidth = tableWidth;
        //this.pixels = [tableWidth][tableHeight]
        this.initTable();
    }
    getId() {
        return this.elementId;
    }
    getTableHeight() {
        return this.tableHeight;
    }
    getTableWidth() {
        return this.tableWidth;
    }
    setId(id) {
        this.elementId = id;
    }
    setTableWidth(tableWidth) {
        this.tableWidth = tableWidth;
    }
    setTableHeight(tableHeight) {
        this.tableHeight = tableHeight;
    }
    //#endregion
    initTable() {
        for (let i = 0; i < this.tableWidth; i++) {
            for (let j = 0; j < this.tableHeight; j++) {
                this.pixels[i][j] = new Pixel();
            }
        }
    }
    colorPixel(x, y, color) {
        this.pixels[x][y].setColor(color);
    }
}
