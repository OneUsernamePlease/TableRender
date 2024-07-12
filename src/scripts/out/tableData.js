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
        //add pixel if nexessary
        this.pixels[x][y].setColor(color);
    }
    setDimensions(height, width) {
        this.setHeight(height);
        this.setWidth(width);
    }
    setWidth(width) {
        //add/remove pixels to/from every row in this.pixels
        //set property this.tableWidth
        if (width < 1) {
            return;
        }
        for (let i = 0; i < this.tableHeight; i++) {
            const curRowWidth = this.pixels[i].length;
            if (curRowWidth < width) {
                this.removePixels(i, this.tableWidth - width);
            }
            else if (true) {
                this.addPixels(i, this.tableWidth - width);
            }
        }
        this.tableWidth = width;
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
    setHeight(height) {
        if (height < 1) {
            return;
        }
        if (height < this.tableHeight) {
            this.addRows(this.tableHeight - height);
        }
        else if (height > this.tableHeight) {
            this.removeRows(this.tableHeight - height);
        }
        this.tableHeight = height;
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
        for (let i = 0; i < this.tableHeight; i++) {
            for (let j = 0; j < this.tableWidth; j++) {
                this.setPixelColor(i, j, "#aa0000");
            }
        }
    }
}
//# sourceMappingURL=tableData.js.map