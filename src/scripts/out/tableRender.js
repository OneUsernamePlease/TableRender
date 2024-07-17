"use strict";
class TableRender {
    //#region constructor, get, set
    constructor(parentElementId) {
        this._parentElementId = parentElementId;
        this._elementId = "tableRender" + Math.floor(Math.random() * (100000));
        this._htmlTable = document.createElement("table");
        this.initTable();
    }
    get elementId() {
        return this._elementId;
    }
    get parentElementId() {
        return this._parentElementId;
    }
    set parentElementId(id) {
        this._parentElementId = id;
    }
    get htmlTable() {
        return this._htmlTable;
    }
    //#endregion
    initTable() {
        //set id and append the table to the DOM
        this.htmlTable.setAttribute("id", this.elementId);
        document.getElementById(this.parentElementId).appendChild(this.htmlTable);
    }
    clearTable() {
        this.removeRows(this.htmlTable.rows.length);
    }
    draw(tableData) {
        //draw tableData
        let height = tableData.tableHeight;
        let width = tableData.tableWidth;
        this.resizeTable(height, width);
        for (let row = 0; row < height; row++) {
            const curRow = this.htmlTable.rows[row];
            for (let cell = 0; cell < tableData.tableWidth; cell++) {
                this.setColor(curRow.cells[cell], tableData.getPixel(row, cell).color);
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
    addRows(n) {
        for (let i = 0; i < n; i++) {
            this.htmlTable.insertRow(-1);
        }
    }
    removeRows(n) {
        for (let i = 0; i < n; i++) {
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
    addCells(row, n) {
        let cellClassName = "pixel";
        for (let i = 0; i < n; i++) {
            const cell = row.insertCell(-1);
            cell.classList.add(cellClassName);
        }
    }
    removeCells(row, n) {
        for (let i = 0; i < n; i++) {
            row.deleteCell(-1);
        }
    }
}
//# sourceMappingURL=tableRender.js.map