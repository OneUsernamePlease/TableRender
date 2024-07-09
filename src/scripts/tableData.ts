class TableData {
    private readonly elementId: string;
    private readonly tableHeight: number;
    private readonly tableWidth: number;
    private pixels: Pixel[][];

//#region constructor, get, set
    public constructor(elementId: string, tableWidth: number, tableHeight: number) {
        this.elementId = elementId;
        this.tableHeight = tableHeight;
        this.tableWidth = tableWidth;
        this.pixels = this.initTableData();
        }

    public getId(): string {
        return this.elementId;
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
        this.pixels[x][y].setColor(color);
    }

    public testFrame() {
        //this is a testfunction, going to be deleted at some point
        for(let i = 0; i < this.tableHeight; i++){
            for(let j = 0; j < this.tableWidth; j++) {
                this.setPixelColor(i, j, "#aa0000");
            }
        }
    }

    public setPixels(newFrame: Pixel[][]) {
        let height: number = Math.min(this.tableHeight, newFrame.length);
        let width: number = Math.min(this.tableWidth, newFrame[0].length);
        
        for(let i = 0; i < height; i++) {
            for(let j = 0; j < width; j++) {
                this.setPixelColor(i, j, newFrame[i][j].getColor());
            }
        }
    }
}