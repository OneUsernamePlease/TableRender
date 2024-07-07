"use strict";
class TableData {
    //#region constructor, get, set
    constructor(elementId, tableWidth, tableHeight) {
        this.elementId = elementId;
        this.tableHeight = tableHeight;
        this.tableWidth = tableWidth;
        this.pixels = this.initTableData();
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
        let pixels = [];
        for (let i = 0; i < this.tableHeight; i++) {
            pixels[i] = [];
            for (let j = 0; j < this.tableWidth; j++) {
                pixels[i][j] = new Pixel();
            }
        }
        return pixels;
    }
    colorPixel(x, y, color) {
        this.pixels[x][y].setColor(color);
    }
}
