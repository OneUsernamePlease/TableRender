class TableRender {
    public htmlTable: HTMLTableElement;

    constructor() {
        this.htmlTable = document.createElement("table");
    }

    public initTable(tableData: TableData, tableContainerId: string) {
        let cellClassName = "pixel";
        let tableHeight = tableData.getTableHeight();
        let tableWidth = tableData.getTableWidth();

        this.htmlTable.setAttribute("id", tableData.getId());
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
        document.getElementById(tableContainerId)!.appendChild(this.htmlTable);
    }

    public removeTable() {
            this.htmlTable.remove();
    }
    
    public draw(tableData: TableData) {
        let pixels: Pixel[][] = tableData.getAllPixels();
        let color: string;
        
        for (let row = 0; row < tableData.getTableHeight(); row++) {
            const curRow: HTMLTableRowElement = this.htmlTable.rows[row];
            for (let cell = 0; cell < tableData.getTableWidth(); cell++) {
                curRow.cells[cell].removeAttribute("style");
                color = pixels[row][cell].getColor();
                curRow.cells[cell].setAttribute("style", "background-color: " + color);
            }
        }

    }
}