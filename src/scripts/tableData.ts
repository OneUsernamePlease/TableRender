class TableData {
    private tableHeight: number;
    private tableWidth: number;
    private pixels: Pixel[][];

//#region constructor, get, set
    public constructor(tableWidth: number, tableHeight: number) {
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

    public setPixelColor(x: number, y: number, color: string) {
        if (this.pixels[x][y] === undefined) {return;}
        this.pixels[x][y].setColor(color);
    }

    public setDimensions(height: number, width: number) {
        this.setHeight(height);
        this.setWidth(width);
    }

    public setWidth(width: number) {
        //add/remove pixels to/from every row in this.pixels
        //set property this.tableWidth
        if (width < 1) {return;}
        for (let i = 0; i < this.tableHeight; i++) {
            const curRowWidth = this.pixels[i].length;
            if (curRowWidth < width) {
                this.removePixels(i, this.tableWidth - width);
            } else if (true) {
                this.addPixels(i, this.tableWidth - width);
            }
        }
        this.tableWidth = width;
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

    public setHeight(height: number) {
        if (height < 1) {return;}
        if (height < this.tableHeight) {
            this.addRows(this.tableHeight - height);
        } else if (height > this.tableHeight) {
            this.removeRows(this.tableHeight - height);
        }
        this.tableHeight = height;
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

    public testFrame() {
        //this is a testfunction, going to be deleted at some point
        for(let i = 0; i < this.tableHeight; i++){
            for(let j = 0; j < this.tableWidth; j++) {
                this.setPixelColor(i, j, "#aa0000");
            }
        }
    }
}