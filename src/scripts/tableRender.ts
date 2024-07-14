class TableRender {
    private elementId: string;
    private parentElementId: string; //parentElementId could/should? be eliminated from this class
    public htmlTable: HTMLTableElement;

//#region constructor, get, set
    constructor(parentElementId: string) {
        this.parentElementId = parentElementId;
        this.elementId = "tableRender";
        this.htmlTable = document.createElement("table");
    }
//#endregion
    public initTable(tableData: TableData) {
        //this should be removed, and this.draw should be expanded, to work when no table exists
        let cellClassName = "pixel";
        let tableHeight = tableData.getTableHeight();
        let tableWidth = tableData.getTableWidth();

        this.htmlTable.setAttribute("id", this.elementId);
        for (let i = 0; i < tableHeight; i++) {
            let row = document.createElement("tr");
            for(let j = 0; j < tableWidth; j++) {
                let cell = document.createElement("td");
                cell.classList.add(cellClassName);
                //cell.setAttribute("style", `width: ${pixelWidth}; height: ${pixelWidth}`); //no but i dont want inline style for height and width. i want to change main.css
                this.setColor(cell, tableData.getPixel(i, j).getColor());
                row.appendChild(cell);
            }
            this.htmlTable.appendChild(row);
        }
        document.getElementById(this.parentElementId)!.appendChild(this.htmlTable);
    }
    public removeTable() {
            this.htmlTable.remove();
    }
    public draw(tableData: TableData) {
        //draw tableData
        let pixels: Pixel[][] = tableData.getAllPixels();
        let height = tableData.getTableHeight();
        let width = tableData.getTableWidth();
        
        this.resizeTable(height, width);
        for (let row = 0; row < height; row++) {
            const curRow: HTMLTableRowElement = this.htmlTable.rows[row];
            for (let cell = 0; cell < tableData.getTableWidth(); cell++) {
                this.setColor(curRow.cells[cell], pixels[row][cell].getColor());
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
    public addRows(diff: number) {
        for (let i = 0; i < diff; i++) {
            this.htmlTable.insertRow(-1);
        }
    }
    public removeRows(diff: number) {
        for (let i = 0; i < diff; i++) {
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
    public addCells(row: HTMLTableRowElement, diff: number) {
        let cellClassName = "pixel";
        for (let i = 0; i < diff; i++) {
            const cell: HTMLTableCellElement = row.insertCell(-1);
            cell.classList.add(cellClassName);
        }
    }
    public removeCells(row: HTMLTableRowElement, diff: number) {
        for (let i = 0; i < diff; i++) {
            row.deleteCell(-1);
        }
    }
}

