class TableData {
    private elementId: string;
    private tableHeight: number;
    private tableWidth: number;
    private pixels!: Pixel[][]; // ! is needed, otherwise -> problem bs its not initialized directy in the constructor

//#region constructor, get, set
    public constructor(elementId: string, tableWidth: number, tableHeight: number) {
        this.elementId = elementId;
        this.tableHeight = tableHeight;
        this.tableWidth = tableWidth;
        //this.pixels = [tableWidth][tableHeight]
        this.initTable();
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

    public initTable() {
        for(let i = 0; i < this.tableWidth; i++){
            for(let j = 0; j < this.tableHeight; j++){
                this.pixels[i][j] = new Pixel()
            }
        }
    }

    public colorPixel(x: number, y: number, color: string) {
        this.pixels[x][y].setColor(color);
    }

}