class TableRender {
    private _elementId: string;
    private _parentElementId: string; //parentElementId could/should? be eliminated from this class - at least as a property
    private _htmlTable: HTMLTableElement;

//#region constructor, get, set
    constructor(parentElementId: string) {
        this._parentElementId = parentElementId;
        this._elementId = "tableRender" + Math.floor(Math.random() * (100000));
        this._htmlTable = document.createElement("table");
        this.initTable();
    }
    public get elementId(): string {
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
        this.htmlTable.setAttribute("ondragstart", "return false;");
        document.getElementById(this.parentElementId)!.appendChild(this.htmlTable);
    }
    public clearTable() {
        //remove all row-Elements
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
                this.setColor(curRow.cells[cell], tableData.pixels[row][cell].color);
            }
        }
    }
    public setColor(pixel: HTMLTableCellElement, color: string | number) {
        pixel.removeAttribute("style");
        if (typeof(color) === "string") {
            if (color.trim() === "") { return; }
            pixel.setAttribute("style", "background-color: " + color);
        } else if (typeof(color) === "number") {
            color = JSFunctions.colorRgbIntToHex(color);
            pixel.setAttribute("style", "background-color: " + color);
        }
    }
    public getColor(row: number, cell: number): string {
        //returns the color of cell at specified position in hex-format
        let colorHex: string;
        colorHex = this.htmlTable.rows[row].cells[cell].style.backgroundColor;
        return JSFunctions.colorRgbToHex(colorHex);
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
        //sets the width of each row in htmlTable, to match newWidth
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
        //add cells to a HTMLTableRowElement
        //also adds the eventListener for drawing
        let cellClassName = "pixel";
        for (let i = 0; i < n; i++) {
            const cell: HTMLTableCellElement = row.insertCell(-1);
            cell.classList.add(cellClassName);
        }
    }
    public removeCells(row: HTMLTableRowElement, n: number) {
        //remove cells from a HTMLTableRow
        for (let i = 0; i < n; i++) {
            row.deleteCell(-1);
        }
    }
    public getCurrentTableData(): TableData {
        //returns the current state of the HTMLTable as new TableData
        let height = this.htmlTable.rows.length;
        let width = (height > 0) ? this.htmlTable.rows[0].cells.length : 0;
        let data = new TableData(height, width);
        
        for (let rowIdx = 0; rowIdx < height; rowIdx++) {
            for (let cellIdx = 0; cellIdx < width; cellIdx++) {
                data.setPixelColor(rowIdx, cellIdx, this.getColor(rowIdx, cellIdx));                
            }
        }
        return data;
    }
}

