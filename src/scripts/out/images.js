"use strict";
class Images {
    //#region decode
    static parseImageData(imageData) {
        const pixelData = imageData.data;
        let newTableData = new TableData();
        if (pixelData === undefined) {
            return newTableData;
        }
        let pixels = [];
        for (let y = 0; y < imageData.height; y++) {
            const row = [];
            for (let x = 0; x < imageData.width; x++) {
                const imageDataIndex = (y * imageData.width + x) * 4; //4 byte per pixel (rgba)
                const r = pixelData[imageDataIndex];
                const g = pixelData[imageDataIndex + 1];
                const b = pixelData[imageDataIndex + 2];
                //we don't have alpha values (yet)
                const pixel = new Pixel(JSFunctions.calculateRgbInt(r, g, b));
                row.push(pixel);
            }
            pixels.push(row);
        }
        newTableData.setTableData(pixels);
        return newTableData;
    }
    /**
     * Turns a bitmap-blob into a TableData-Object.
     * (this functions cheats by using a canvas to parse the blob)
     * @param bitmap a blob in which a bitmap file's content has been read
     * @returns a resolved Promise of TableData
     */
    static async fromBMP(bitmap) {
        const imageBitmap = await createImageBitmap(bitmap);
        const offscreenCanvas = new OffscreenCanvas(imageBitmap.width, imageBitmap.height);
        const canvasCtx = offscreenCanvas.getContext("2d");
        canvasCtx === null || canvasCtx === void 0 ? void 0 : canvasCtx.drawImage(imageBitmap, 0, 0);
        const imageData = canvasCtx === null || canvasCtx === void 0 ? void 0 : canvasCtx.getImageData(0, 0, offscreenCanvas.width, offscreenCanvas.height);
        if (imageData === undefined) {
            return new TableData();
        }
        return this.parseImageData(imageData);
    }
    /*
    public static fromBMP(bitmap: Blob): TableData {
        
        //use typed arrays to manipulate binary data
        //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Typed_arrays
        
        yeayeayea i'll parse the blob myself later. jesus...

        let tableData = new TableData();

        //return tableData;
    }
    */
    static fromJson(json) {
        //load from json (has to be pf1), and draw
        let data = json.imgdata;
        let height = Math.max(data.length, 1);
        let widths = data.map((x) => x.length); //get array of the string-arrays' lengths in imgdata
        let width = Math.max(...widths, 1);
        let tableData = new TableData(height, width);
        for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {
                tableData.setPixelColor(i, j, data[i][j]);
            }
            ;
        }
        return tableData;
    }
    /**
     * returns a string representing a string[][] containing Pixel colors in hex, formatted like a json-array.
     */
    static pixelDataAsString(data) {
        let s = "[";
        data.pixels.forEach(row => {
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
    //#endregion
    //#region encode
    static encodeTableData(tableData, format) {
        //returns a json object containing tableData encoded with format
        format = format.toLowerCase().trim();
        let encoded = new Object;
        switch (format) {
            case "pf1":
                encoded = this.encodePf1(tableData);
                break;
            default:
                break;
        }
        return encoded;
    }
    static encodePf1(tableData) {
        //returns a pf1-json object
        //(containing tableData as string[][] named imgdata)
        let encoded = "";
        const start = '{"meta":{"format":"pf1"},"imgdata":';
        const end = '}';
        let data = this.pixelDataAsString(tableData);
        encoded = start + data + end;
        return JSON.parse(encoded);
    }
    //#endregion
    static createBlob(obj) {
        //create a blob from json-object (containing the encoded data)
        //to be used in creating a file
        let content = JSON.stringify(obj);
        let file = new Blob([content], { type: "text" });
        return file;
    }
}
//# sourceMappingURL=images.js.map