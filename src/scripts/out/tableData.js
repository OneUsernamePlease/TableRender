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
    //#region en/decode
    fromJson(json) {
        //load from json (has to be pf1), and draw
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
                s += "\"" + cell.color + "\",";
            });
            s = s.slice(0, -1);
            s += "],";
        });
        s = s.slice(0, -1);
        s += "]";
        return s;
    }
    createBlob(obj) {
        //create a blob from json-object (containing the encoded data)
        //to be used in creating a file
        let content = JSON.stringify(obj);
        let file = new Blob([content], { type: "text" });
        return file;
    }
    //#endregion
    //#region drawing/updating image data
    colorAll(color, newHeight, newWidth) {
        //color all pixles in color. if height and/or width are provided, resize.
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