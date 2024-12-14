class TableData {
//#region properties
    private _tableHeight: number;
    private _tableWidth: number;
    private _pixels: Pixel[][];
//#endregion

//#region constructor, get, set, init
    public constructor(tableHeight: number = 0, tableWidth: number = 0) {
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
//#endregion

//#region drawing/updating image data
    public colorAll(color: string, newHeight?: number, newWidth?: number) {
        //color all pixels in color. if height and/or width are provided, resize.
        if (newHeight != null) { this.setHeight(newHeight); }
        if (newWidth != null) { this.setWidth(newWidth); }
        
        for(let i = 0; i < this.tableHeight; i++) {
            for(let j = 0; j < this.tableWidth; j++) {
                this.setPixelColor(i, j, color);
            }
        }
    }
    public setPixelColor(row: number, col: number, color: string) {
        //0,0 is top left
        if (this.pixels[row][col] === undefined) {return;}
        this.pixels[row][col].color = color;
    }
    public setDimensions(height: number, width: number) {
        //resize this.pixels
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
    private addPixels(rowIdx: number, n: number) {
        //adds n pixels to this.pixels, to row at rowIdx
        for (let i = 0; i < n; i++) {
            const curRowLength: number = this.pixels[rowIdx].length;
            this.pixels[rowIdx][curRowLength] = new Pixel();
        }
    }
    private removePixels(rowIdx: number, n: number) {
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
    private addRows(n: number) {
        //adds n rows to pixels, these new rows are empty arrays
        const height = this.pixels.length;
        for (let i = 0; i < n; i++) {
            this.pixels[height + i] = [];
        }
    }
    private removeRows(n: number) {
        //removes n rows from pixels
        for (let i = 0; i < n; i++) {
            this.pixels.pop();
        }
    }
//#endregion
}