class TableRender {
    private _elementId: string;
    private _parentElementId: string; //parentElementId could/should? be eliminated from this class
    public _htmlTable: HTMLTableElement;

//#region constructor, get, set
    constructor(parentElementId: string) {
        this._parentElementId = parentElementId;
        this._elementId = "tableRender" + Math.floor(Math.random() * (100000));
        this._htmlTable = document.createElement("table");
        this.initTable();
    }
    public get elementId(): string{
        return this._elementId;
    }
    public get parentElementId(): string {
        return this._parentElementId;
    }
    public set parentElementId(id: string) {
        this._parentElementId = id;
    }
    public get htmlTable(): HTMLTableElement {
        return this._htmlTable;
    }

//#endregion
    private initTable() {
        //set id and append the table to the DOM
        this.htmlTable.setAttribute("id", this.elementId);
        document.getElementById(this.parentElementId)!.appendChild(this.htmlTable);
    }
    public clearTable() {
        this.removeRows(this.htmlTable.rows.length);
    }
    public draw(tableData: TableData) {
        //draw tableData
        let height = tableData.tableHeight;
        let width = tableData.tableWidth;
        
        this.resizeTable(height, width);
        for (let row = 0; row < height; row++) {
            const curRow: HTMLTableRowElement = this.htmlTable.rows[row];
            for (let cell = 0; cell < tableData.tableWidth; cell++) {
                this.setColor(curRow.cells[cell], tableData.getPixel(row, cell).color);
            }
        }
    }
    public setColor(pixel: HTMLTableCellElement, color: string) {
        pixel.removeAttribute("style");
        pixel.setAttribute("style", "background-color: " + color);
    }
    public resizeTable(newHeight: number, newWidth: number) {
        this.setHeight(newHeight);
        this.setWidth(newWidth);
    }
    public setHeight(newHeight: number) {
        let rowCnt = this.htmlTable.rows.length;

        if (rowCnt < newHeight) {
            this.addRows(newHeight - rowCnt);
        } else if (rowCnt > newHeight) {
            this.removeRows(rowCnt - newHeight);
        }
    }
    public addRows(n: number) {
        for (let i = 0; i < n; i++) {
            this.htmlTable.insertRow(-1);
        }
    }
    public removeRows(n: number) {
        for (let i = 0; i < n; i++) {
            this.htmlTable.deleteRow(-1);
        }
    }
    public setWidth(newWidth: number) {
        for (let curRowIdx = 0; curRowIdx < this.htmlTable.rows.length; curRowIdx++) {
            const row = this.htmlTable.rows[curRowIdx];
            const cellCnt = row.cells.length;
            if(cellCnt < newWidth) {
                this.addCells(row, newWidth - cellCnt);
            }
            else if (cellCnt > newWidth) {
                this.removeCells(row, cellCnt - newWidth);
            }
        }
    }
    public addCells(row: HTMLTableRowElement, n: number) {
        let cellClassName = "pixel";
        for (let i = 0; i < n; i++) {
            const cell: HTMLTableCellElement = row.insertCell(-1);
            cell.classList.add(cellClassName);
        }
    }
    public removeCells(row: HTMLTableRowElement, n: number) {
        for (let i = 0; i < n; i++) {
            row.deleteCell(-1);
        }
    }
}

