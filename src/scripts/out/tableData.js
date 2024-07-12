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
        if (this.pixels[x][y] === undefined) {
            return;
        }
        this.pixels[x][y].setColor(color);
    }
    setDimensions(height, width) {
        this.setHeight(height);
        this.setWidth(width);
    }
    setWidth(newWidth) {
        //add/remove pixels to/from every row in this.pixels
        //set property this.tableWidth
        if (newWidth < 1) {
            return;
        }
        for (let i = 0; i < this.tableHeight; i++) {
            const curRowWidth = this.pixels[i].length;
            if (curRowWidth < newWidth) {
                this.addPixels(i, newWidth - curRowWidth);
            }
            else if (curRowWidth > newWidth) {
                this.removePixels(i, curRowWidth - newWidth);
            }
        }
        this.tableWidth = newWidth;
    }
    addPixels(rowIdx, n) {
        //adds n pixels to this.pixels, to row at rowIdx
        for (let i = 0; i < n; i++) {
            const curRowLength = this.pixels[rowIdx].length;
            this.pixels[rowIdx][curRowLength] = new Pixel();
        }
    }
    removePixels(rowIdx, n) {
        //removes n pixels from this.pixels, from row at rowIdx
        for (let i = 0; i < n; i++) {
            this.pixels[rowIdx].pop();
        }
    }
    setHeight(newHeight) {
        if (newHeight < 1) {
            return;
        }
        if (newHeight < this.tableHeight) {
            this.removeRows(this.tableHeight - newHeight);
        }
        else if (newHeight > this.tableHeight) {
            this.addRows(newHeight - this.tableHeight);
        }
        this.tableHeight = newHeight;
    }
    addRows(n) {
        //adds n rows to pixels, these new rows are empty arrays
        const height = this.pixels.length;
        for (let i = 0; i < n; i++) {
            this.pixels[height + i] = [];
        }
    }
    removeRows(n) {
        //removes n rows from pixels
        for (let i = 0; i < n; i++) {
            this.pixels.pop();
        }
    }
    testFrame() {
        //this is a testfunction, going to be deleted at some point
        this.setDimensions(100, 150);
        for (let i = 0; i < this.tableHeight; i++) {
            for (let j = 0; j < this.tableWidth; j++) {
                this.setPixelColor(i, j, "#aa0000");
            }
        }
    }
}
//# sourceMappingURL=tableData.js.map