class TableRender {
    private elementId: string;
    private parentElementId: string;
    public htmlTable: HTMLTableElement;

//#region constructor, get, set
    constructor(parentElementId: string) {
        this.parentElementId = parentElementId;
        this.elementId = "tableRender" + Math.floor(Math.random() * 1000)
        this.htmlTable = document.createElement("table");
    }

    public setParentElementId(): string {
        return this.parentElementId;
    }
//#endregion

    public initTable(tableData: TableData) {
        let cellClassName = "pixel";
        let tableHeight = tableData.getTableHeight();
        let tableWidth = tableData.getTableWidth();

        this.htmlTable.setAttribute("id", this.elementId);
        for (let i = 0; i < tableHeight; i++) {
            let row = document.createElement("tr");
            row.classList.add("r" + i);
            for(let j = 0; j < tableWidth; j++) {
                let cell = document.createElement("td");
                cell.classList.add(cellClassName);
                cell.classList.add("c" + j);
                //cell.setAttribute("style", `width: ${pixelWidth}; height: ${pixelWidth}`); //no but i dont want inline style for height and width. i want to change main.css
                cell.setAttribute("style", "background-color: " + tableData.getPixel(i, j).getColor());
                row.appendChild(cell);
            }
            this.htmlTable.appendChild(row);
        }
        document.getElementById(this.parentElementId)!.appendChild(this.htmlTable);
    }

    public removeTable() {
            this.htmlTable.remove();
    }
    
    public resizeTable(newHeight: number, newWidth: number) {
        
    }

    public draw(tableData: TableData) {
        let pixels: Pixel[][] = tableData.getAllPixels();
        let color: string;
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
}