"use strict";
class TableData {
    //#endregion
    //#region constructor, get, set, init
    constructor(tableHeight = 0, tableWidth = 0) {
        this._tableHeight = tableHeight;
        this._tableWidth = tableWidth;
        this._pixels = this.initTableData();
    }
    get tableHeight() {
        return this._tableHeight;
    }
    get tableWidth() {
        return this._tableWidth;
    }
    set tableHeight(height) {
        this._tableHeight = height;
    }
    set tableWidth(width) {
        this._tableWidth = width;
    }
    get pixels() {
        return this._pixels;
    }
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
    //#endregion
    //#region drawing/updating image data
    colorAll(color, newHeight, newWidth) {
        //color all pixels in color. if height and/or width are provided, resize.
        if (newHeight != null) {
            this.setHeight(newHeight);
        }
        if (newWidth != null) {
            this.setWidth(newWidth);
        }
        for (let i = 0; i < this.tableHeight; i++) {
            for (let j = 0; j < this.tableWidth; j++) {
                this.setPixelColor(i, j, color);
            }
        }
    }
    setPixelColor(row, col, color) {
        //0,0 is top left
        if (this.pixels[row][col] === undefined) {
            return;
        }
        this.pixels[row][col].color = color;
    }
    setDimensions(height, width) {
        //resize this.pixels
        this.setHeight(height);
        this.setWidth(width);
    }
    setWidth(newWidth) {
        //add/remove pixels to/from every row in this.pixels, until its length matches newWidth
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
        //add/remove rows until pixels[][]'s length matches newHeight
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
}
//# sourceMappingURL=tableData.js.map