class Images {
//#region decode
    public static parseCanvasImageData(imgData: ImageData): TableData {
        let tableData: TableData = new TableData();

        return tableData;
    }

    public static async fromBMP(bitmap: Blob): Promise<TableData> {
        const imageBitmap = await createImageBitmap(bitmap);
        const offscreenCanvas = new OffscreenCanvas(imageBitmap.width, imageBitmap.height);
        const canvasCtx = offscreenCanvas.getContext("2d");
        canvasCtx?.drawImage(imageBitmap, 0, 0);
        const imageData = canvasCtx?.getImageData(0, 0, offscreenCanvas.width, offscreenCanvas.height).data;
        let tableFromBmp = new TableData(); 
        if (imageData === undefined) { return tableFromBmp; }

        let pixels = [];
        for (let y = 0; y < imageBitmap.height; y++) {
            const row = [];
            for (let x = 0; x < imageBitmap.width; x++) {
                const imageDataIndex = (y * imageBitmap.width + x) * 4; //4 byte per pixel (rgba)
                const r = imageData[imageDataIndex];
                const g = imageData[imageDataIndex + 1];
                const b = imageData[imageDataIndex + 2];
                //we don't have alpha values (yet)
                const pixel = new Pixel(JSFunctions.calculateRgbInt(r, g, b));
                row.push(pixel);
            }
            pixels.push(row);
        }
        tableFromBmp.setTableData(pixels);
        return tableFromBmp; 
    }
    /*
    public static async fromBMP(bitmap: Blob): Promise<TableData> {
        
        //use typed arrays to manipulate binary data
        //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Typed_arrays  
        
        createImageBitmap(bitmap).then(imageBitmap => {
            const offscreenCanvas = new OffscreenCanvas(imageBitmap.width, imageBitmap.height)
            const canvasCtx = offscreenCanvas.getContext("2d");
            canvasCtx?.drawImage(imageBitmap, 0, 0);
            const imageData = canvasCtx?.getImageData(0, 0, offscreenCanvas.width, offscreenCanvas.height).data;

            let tableData = new TableData();

            return tableData;

        }).catch(error => {
            console.log("Error creating imageBitmap", error);
            return null;
        });

        let tableData = new TableData();

        //return tableData;
    }
    */
    public static fromJson(json: {imgdata: string[][], format?: string}): TableData {
        //load from json (has to be pf1), and draw
        let data = json.imgdata;
        let height = Math.max(data.length, 1);
        let widths: number[] = data.map((x) => x.length); //get array of the string-arrays' lengths in imgdata
        let width = Math.max(...widths, 1);
        
        let tableData = new TableData(height, width);
        for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {
                tableData.setPixelColor(i, j, data[i][j]);
            };
            
        }
        return tableData;
    }
    /**
     * returns a string representing a string[][] containing Pixel colors in hex, formatted like a json-array.
     */
    public static pixelDataAsString(data: TableData): string {
        let s = "["; 
        data.pixels.forEach(row => {
            s += "["
            row.forEach(cell => {
                s += "\"" + cell.color + "\",";
            })
            s = s.slice(0, -1);
            s += "],"
        });
        s = s.slice(0, -1);
        s += "]";

        return s;
    }
//#endregion
//#region encode
    public static encodeTableData(tableData: TableData, format: string): object {
        //returns a json object containing tableData encoded with format
        format = format.toLowerCase().trim();
        let encoded: object = new Object;

        switch (format) {
            case "pf1":
                encoded = this.encodePf1(tableData);
                break;
        
            default:
                break;
        }
        return encoded;
    }
    public static encodePf1(tableData: TableData): object {
        //returns a pf1-json object
        //(containing tableData as string[][] named imgdata)
        let encoded: string = "";
        const start = '{"meta":{"format":"pf1"},"imgdata":';
        const end = '}';
        
        let data = this.pixelDataAsString(tableData);
        encoded = start + data + end;

        return JSON.parse(encoded);
    }
//#endregion
    public static createBlob(obj: JSON): Blob {
        //create a blob from json-object (containing the encoded data)
        //to be used in creating a file
        let content = JSON.stringify(obj);
        let file: Blob = new Blob([content], {type: "text"});
        return file;
    }
}