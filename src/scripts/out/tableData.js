"use strict";
class TableData {
    //#region constructor, get, set
    constructor(tableWidth, tableHeight) {
        this.tableHeight = tableHeight;
        this.tableWidth = tableWidth;
        this.pixels = this.initTableData();
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
    testFrame() {
        //this is a testfunction, going to be deleted at some point
        for (let i = 0; i < this.tableHeight; i++) {
            for (let j = 0; j < this.tableWidth; j++) {
                this.setPixelColor(i, j, "#aa0000");
            }
        }
    }
    setPixels(newFrame) {
        let height = Math.min(this.tableHeight, newFrame.length);
        let width = Math.min(this.tableWidth, newFrame[0].length);
        for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {
                this.setPixelColor(i, j, newFrame[i][j].getColor());
            }
        }
    }
}
//# sourceMappingURL=tableData.js.map