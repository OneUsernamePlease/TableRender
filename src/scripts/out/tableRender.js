"use strict";
class TableRender {
    //#region constructor, get, set
    constructor(parentElementId) {
        this.parentElementId = parentElementId;
        this.elementId = "tableRender" + Math.floor(Math.random() * 1000);
        this.htmlTable = document.createElement("table");
    }
    //#endregion
    initTable(tableData) {
        let cellClassName = "pixel";
        let tableHeight = tableData.getTableHeight();
        let tableWidth = tableData.getTableWidth();
        this.htmlTable.setAttribute("id", this.elementId);
        for (let i = 0; i < tableHeight; i++) {
            let row = document.createElement("tr");
            for (let j = 0; j < tableWidth; j++) {
                let cell = document.createElement("td");
                cell.classList.add(cellClassName);
                //cell.setAttribute("style", `width: ${pixelWidth}; height: ${pixelWidth}`); //no but i dont want inline style for height and width. i want to change main.css
                cell.setAttribute("style", "background-color: " + tableData.getPixel(i, j).getColor());
                row.appendChild(cell);
            }
            this.htmlTable.appendChild(row);
        }
        document.getElementById(this.parentElementId).appendChild(this.htmlTable);
    }
    removeTable() {
        this.htmlTable.remove();
    }
    draw(tableData) {
        let pixels = tableData.getAllPixels();
        let height = tableData.getTableHeight();
        let width = tableData.getTableWidth();
        this.resizeTable(height, width);
        for (let row = 0; row < height; row++) {
            const curRow = this.htmlTable.rows[row];
            for (let cell = 0; cell < tableData.getTableWidth(); cell++) {
                this.setColor(curRow.cells[cell], pixels[row][cell].getColor());
            }
        }
    }
    setColor(pixel, color) {
        pixel.removeAttribute("style");
        pixel.setAttribute("style", "background-color: " + color);
    }
    resizeTable(newHeight, newWidth) {
        this.setHeight(newHeight);
        this.setWidth(newWidth);
    }
    setHeight(newHeight) {
        let rowCnt = this.htmlTable.rows.length;
        if (rowCnt < newHeight) {
            this.addRows(newHeight - rowCnt);
        }
        else if (rowCnt > newHeight) {
            this.removeRows(rowCnt - newHeight);
        }
    }
    addRows(diff) {
        for (let i = 0; i < diff; i++) {
            this.htmlTable.insertRow(-1);
        }
    }
    removeRows(diff) {
        for (let i = 0; i < diff; i++) {
            this.htmlTable.deleteRow(-1);
        }
    }
    setWidth(newWidth) {
        for (let curRowIdx = 0; curRowIdx < this.htmlTable.rows.length; curRowIdx++) {
            const row = this.htmlTable.rows[curRowIdx];
            const cellCnt = row.cells.length;
            if (cellCnt < newWidth) {
                this.addCells(row, newWidth - cellCnt);
            }
            else if (cellCnt > newWidth) {
                this.removeCells(row, cellCnt - newWidth);
            }
        }
    }
    addCells(row, diff) {
        let cellClassName = "pixel";
        for (let i = 0; i < diff; i++) {
            const cell = row.insertCell(-1);
            cell.classList.add(cellClassName);
        }
    }
    removeCells(row, diff) {
        for (let i = 0; i < diff; i++) {
            row.deleteCell(-1);
        }
    }
}
//# sourceMappingURL=tableRender.js.map