class TableData {
    private readonly elementId: string;
    private readonly tableHeight: number;
    private readonly tableWidth: number;
    private screenData: Pixel[][];

//#region constructor, get, set
    public constructor(elementId: string, tableWidth: number, tableHeight: number) {
        this.elementId = elementId;
        this.tableHeight = tableHeight;
        this.tableWidth = tableWidth;
        this.screenData = this.initTableData();
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
        return this.screenData;
    }

    public getPixel(x: number, y: number): Pixel {
        return this.screenData[x][y];
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
        this.screenData[x][y].setColor(color);
    }

    public newFrame() {
        for(let i = 0; i < this.tableHeight; i++){
            for(let j = 0; j < this.tableWidth; j++){
                this.setPixelColor(i, j, "#aa0000");
            }
        }
    }
}