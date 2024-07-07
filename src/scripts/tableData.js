"use strict";
class TableData {
    //#region constructor, get, set
    constructor(elementId, tableWidth, tableHeight) {
        this.elementId = elementId;
        this.tableHeight = tableHeight;
        this.tableWidth = tableWidth;
        this.initTableData();
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
    getAllPixels() {
        return this.pixels;
    }
    getPixel(x, y) {
        return this.pixels[x][y];
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
    initTableData() {
        for (let i = 0; i < this.tableHeight; i++) {
            for (let j = 0; j < this.tableWidth; j++) {
                this.pixels[i][j] = new Pixel();
            }
        }
    }
    colorPixel(x, y, color) {
        this.pixels[x][y].setColor(color);
    }
}
