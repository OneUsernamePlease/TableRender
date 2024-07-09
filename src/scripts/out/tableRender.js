"use strict";
class TableRender {
    //#region constructor, get, set
    constructor(parentElementId) {
        this.parentElementId = parentElementId;
        this.elementId = "tableRender" + Math.floor(Math.random() * 1000);
        this.htmlTable = document.createElement("table");
    }
    setParentElementId() {
        return this.parentElementId;
    }
    //#endregion
    initTable(tableData) {
        let cellClassName = "pixel";
        let tableHeight = tableData.getTableHeight();
        let tableWidth = tableData.getTableWidth();
        this.htmlTable.setAttribute("id", this.elementId);
        for (let i = 0; i < tableHeight; i++) {
            let row = document.createElement("tr");
            row.classList.add("r" + i);
            for (let j = 0; j < tableWidth; j++) {
                let cell = document.createElement("td");
                cell.classList.add(cellClassName);
                cell.classList.add("c" + j);
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
    resizeTable(newHeight, newWidth) {
    }
    draw(tableData) {
        let pixels = tableData.getAllPixels();
        let color;
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
}
//# sourceMappingURL=tableRender.js.map