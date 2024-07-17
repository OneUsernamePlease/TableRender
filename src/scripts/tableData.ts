class TableData {
    private _tableHeight: number;
    private _tableWidth: number;
    private _pixels: Pixel[][];

//#region constructor, get, set
    public constructor(tableHeight: number, tableWidth: number) {
        this._tableHeight = tableHeight;
        this._tableWidth = tableWidth;
        this._pixels = this.initTableData();
    }
    public get tableHeight(): number {
        return this._tableHeight;
    }
    public get tableWidth(): number {
        return this._tableWidth;
    }    
    public set tableHeight(height: number) {
        this._tableHeight = height;
    }
    public set tableWidth(width: number) {
        this._tableWidth = width;
    }
    public get pixels(): Pixel[][] {
        return this._pixels;
    }
    public getPixel(x: number, y: number): Pixel {
        return this._pixels[x][y];
    }
//#endregion
    private initTableData(): Pixel[][] {
        let pixel: Pixel[][] = [];
        for(let i = 0; i < this.tableHeight; i++) {
            pixel[i] = [];
            for(let j = 0; j < this.tableWidth; j++) {
                pixel[i][j] = new Pixel();
            }
        }
        return pixel;
    }
    public testFrame() {
        //this is a testfunction, going to be deleted at some point
        this.setDimensions(50, 100);
        for(let i = 0; i < this.tableHeight; i++){
            for(let j = 0; j < this.tableWidth; j++) {
                this.setPixelColor(i, j, "#aa0000");
            }
        }
    }
//#region en/decode
    public fromJson(json: {imgdata: string[][], format?: string}) {
        //load from json (has to be pf1), and draw
        let data = json.imgdata;
        let height = Math.max(data.length, 1);
        let widths: number[] = data.map((x) => x.length); //get array of the string-arrays' lengths in imgdata
        let width = Math.max(...widths, 1);

        this.setDimensions(height, width);
        for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {
                this.setPixelColor(i, j, data[i][j]);
            };
            
        }
    }
    public encode(format: string): object {
        //returns a json object containing tableData encoded with format
        let encoded: object = new Object;

        switch (format) {
            case "pf1":
                encoded = this.encodePf1();
                break;
        
            default:
                break;
        }
        return encoded;
    }
    public encodePf1(): object {
        //returns a pf1-json object
        //(containing tableData as string[][] named imgdata)
        let encoded: string = "";
        const start = '{"meta":{"format":"pf1"},"imgdata":';
        const end = '}';
        
        let data = this.dataAsString();
        encoded = start + data + end;

        return JSON.parse(encoded);
    }
    public dataAsString(): string {
        //returns a string representing a string[][] containing Pixel colors in hex
        let s = "["; 
        this.pixels.forEach(row => {
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
    public createBlob(obj: JSON): Blob {
        //create a blob from json-object (containing the encoded data)
        //to be used in creating a file
        let content = JSON.stringify(obj);
        let file: Blob = new Blob([content], {type: "text"});
        return file;
    }
//#endregion

//#region drawing/updating image data
    public setPixelColor(row: number, col: number, color: string) {
        //0,0 is top left
        if (this.pixels[row][col] === undefined) {return;}
        this.pixels[row][col].color = color;
    }
    public setDimensions(height: number, width: number) {
        //resize this.pixles
        this.setHeight(height);
        this.setWidth(width);
    }
    public setWidth(newWidth: number) {
        //add/remove pixels to/from every row in this.pixels, until its length matches newWidth
        //set property this.tableWidth
        if (newWidth < 1) {return;}
        for (let i = 0; i < this.tableHeight; i++) {
            const curRowWidth = this.pixels[i].length;
            if (curRowWidth < newWidth) {
                this.addPixels(i, newWidth - curRowWidth);
            } else if (curRowWidth > newWidth) {
                this.removePixels(i, curRowWidth - newWidth);
            }
        }
        this.tableWidth = newWidth;
    }
    public addPixels(rowIdx: number, n: number) {
        //adds n pixels to this.pixels, to row at rowIdx
        for (let i = 0; i < n; i++) {
            const curRowLength: number = this.pixels[rowIdx].length;
            this.pixels[rowIdx][curRowLength] = new Pixel();
        }
    }
    public removePixels(rowIdx: number, n: number) {
        //removes n pixels from this.pixels, from row at rowIdx
        for (let i = 0; i < n; i++) {
            this.pixels[rowIdx].pop();
        }
    }
    public setHeight(newHeight: number) {
        //add/remove rows until pixels[][]'s length matches newHeight
        if (newHeight < 1) {return;}
        if (newHeight < this.tableHeight) {
            this.removeRows(this.tableHeight - newHeight);
        } else if (newHeight > this.tableHeight) {
            this.addRows(newHeight - this.tableHeight);
        }
        this.tableHeight = newHeight;
    }
    public addRows(n: number) {
        //adds n rows to pixels, these new rows are empty arrays
        const height = this.pixels.length;
        for (let i = 0; i < n; i++) {
            this.pixels[height + i] = [];
        }
    }
    public removeRows(n: number) {
        //removes n rows from pixels
        for (let i = 0; i < n; i++) {
            this.pixels.pop();
        }
    }
//#endregion
}