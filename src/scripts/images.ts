class Images {
//#region decode
    public static fromBMP(bitmap: Blob): TableData | null {
    /*
    use typed arrays to manipulate binary data
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Typed_arrays  
    */
        
        throw new Error("Method not implemented.");
        
        if (!!bitmap) { return null; }

        let tableData = new TableData();

        return tableData;
    }
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