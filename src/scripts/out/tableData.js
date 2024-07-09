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
    //#endregion
    initTableData() {
        let pixel = [];
        for (let i = 0; i < this.tableHeight; i++) {
            pixel[i] = [];
            for (let j = 0; j < this.tableWidth; j++) {
                pixel[i][j] = new Pixel();
            }
        }
        return pixel;
    }
    setPixelColor(x, y, color) {
        this.pixels[x][y].setColor(color);
    }
    newFrame() {
        for (let i = 0; i < this.tableHeight; i++) {
            for (let j = 0; j < this.tableWidth; j++) {
                this.setPixelColor(i, j, "#aa0000");
            }
        }
    }
    updateFrame() {
    }
}
//# sourceMappingURL=tableData.js.map