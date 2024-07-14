"use strict";
class TableData {
    //#region constructor, get, set
    constructor(tableHeight, tableWidth) {
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
    testFrame() {
        //this is a testfunction, going to be deleted at some point
        this.setDimensions(50, 100);
        for (let i = 0; i < this.tableHeight; i++) {
            for (let j = 0; j < this.tableWidth; j++) {
                this.setPixelColor(i, j, "#aa0000");
            }
        }
    }
    //#region en/decode
    fromJson(json) {
        let data = json.imgdata;
        let height = Math.max(data.length, 1);
        let widths = data.map((x) => x.length); //get array of the string-arrays' lengths in imgdata
        let width = Math.max(...widths, 1);
        this.setDimensions(height, width);
        for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {
                this.setPixelColor(i, j, data[i][j]);
            }
            ;
        }
    }
    encode(format) {
        //returns a json object containing tableData encoded with format
        let encoded = new Object;
        switch (format) {
            case "pf1":
                encoded = this.encodePf1();
                break;
            default:
                break;
        }
        return encoded;
    }
    encodePf1() {
        //returns a pf1-json object
        //(containing tableData as string[][] named imgdata)
        let encoded = "";
        const start = '{"meta":{"format":"pf1"},"imgdata":';
        const end = '}';
        let data = this.dataAsString();
        encoded = start + data + end;
        return JSON.parse(encoded);
    }
    dataAsString() {
        //returns a string representing a string[][] containing Pixel colors in hex
        let s = "[";
        this.pixels.forEach(row => {
            s += "[";
            row.forEach(cell => {
                s += "\"" + cell.getColor() + "\",";
            });
            s = s.slice(0, -1);
            s += "],";
        });
        s = s.slice(0, -1);
        s += "]";
        return s;
    }
    createBlob(obj) {
        let content = JSON.stringify(obj);
        let file = new Blob([content], { type: "text" });
        return file;
    }
    //#endregion
    //#region drawing/updating image data
    setPixelColor(row, col, color) {
        //0,0 is top left
        if (this.pixels[row][col] === undefined) {
            return;
        }
        this.pixels[row][col].setColor(color);
    }
    setDimensions(height, width) {
        //resize this.pixles
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