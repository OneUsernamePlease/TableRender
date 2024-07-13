class TableData {
    private tableHeight: number;
    private tableWidth: number;
    private pixels: Pixel[][];

//#region constructor, get, set
    public constructor(tableHeight: number, tableWidth: number) {
        this.tableHeight = tableHeight;
        this.tableWidth = tableWidth;
        this.pixels = this.initTableData();
    }

    public getTableHeight(): number {
        return this.tableHeight;
    }

    public getTableWidth(): number {
        return this.tableWidth;
    }

    public getAllPixels(): Pixel[][] {
        return this.pixels;
    }

    public getPixel(x: number, y: number): Pixel {
        return this.pixels[x][y];
    }
//#endregion

    private initTableData(): Pixel[][] {
        let pixel: Pixel[][] = [];
        for(let i = 0; i < this.tableHeight; i++){
            pixel[i] = [];
            for(let j = 0; j < this.tableWidth; j++){
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

    public fromJson(json: {imgdata: string[][]}) {
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
        let encoded: object = new Object;

        switch (format) {
            case "mf1":
                encoded = this.encodeMf1();            
                break;
        
            default:
                break;
        }
        return encoded;
    }
    public encodeMf1(): object {
        let encoded: string = "";
        const start = '{"meta":{"format":"pf1"},"imgdata":';
        const end = '}';
        
        let data = this.dataAsString();
        encoded = start + data + end;

        return JSON.parse(encoded);
    }
    public dataAsString(): string {
        let s = "["; 
        this.pixels.forEach(row => {
            s += "["
            row.forEach(cell => {
                s += "\"" + cell.getColor() + "\",";
            })
            s = s.slice(0, -1);
            s += "],"
        });
        s = s.slice(0, -1);
        s += "]";

        return s;
    }

//#endregion

//#region everyting related to drawing/updating image data

    public setPixelColor(row: number, col: number, color: string) {
        if (this.pixels[row][col] === undefined) {return;}
        this.pixels[row][col].setColor(color);
    }

    public setDimensions(height: number, width: number) {
        this.setHeight(height);
        this.setWidth(width);
    }

    public setWidth(newWidth: number) {
        //add/remove pixels to/from every row in this.pixels
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