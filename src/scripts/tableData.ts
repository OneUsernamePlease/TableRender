
class TableData {
    private elementId: string;
    private tableHeight: number;
    private tableWidth: number;
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

    public setId(id: string) {
        this.elementId = id;
    }

    public setTableWidth(tableWidth: number) {
        this.tableWidth = tableWidth;
    }

    public setTableHeight(tableHeight: number) {
        this.tableHeight = tableHeight;
    }
//#endregion

    private initTableData(): Pixel[][] {
        let pixels: Pixel[][] = [];
        for(let i = 0; i < this.tableHeight; i++){
            pixels[i] = [];
            for(let j = 0; j < this.tableWidth; j++){
                pixels[i][j] = new Pixel()
            }
        }
        return pixels;
    }

    public colorPixel(x: number, y: number, color: string) {
        this.pixels[x][y].setColor(color);
    }
}