"use strict";
class TableRender {
    //should the renderer (this) store a ref to the actual table?
    //should it inherit from htmltableele, and "be" the table and draw itself?
    //atm, it retrieves the table whenever a frame is to be painted
    static initTable(tableData, tableContainerId) {
        let htmlTable = document.createElement("table");
        let cellClassName = "pixel";
        let tableHeight = tableData.getTableHeight();
        let tableWidth = tableData.getTableWidth();
        htmlTable.setAttribute("id", tableData.getId());
        for (let i = 0; i < tableHeight; i++) {
            let row = document.createElement("tr");
            row.classList.add("r" + i);
            for (let j = 0; j < tableWidth; j++) {
                let cell = document.createElement("td");
                cell.classList.add(cellClassName);
                cell.classList.add("c" + j);
                //cell.setAttribute("style", `width: ${pixelWidth}; height: ${pixelWidth}`); //no but i dont want inline style. i want to change main.css
                row.appendChild(cell);
            }
            htmlTable.appendChild(row);
        }
        document.getElementById(tableContainerId).appendChild(htmlTable);
    }
    static removeTable(tableId) {
        var _a;
        (_a = document.getElementById(tableId)) === null || _a === void 0 ? void 0 : _a.remove();
    }
    static draw(tableData) {
        let htmlTable = document.getElementById(tableData.getId());
        let pixels = tableData.getAllPixels();
        let color;
        for (let row = 0; row < tableData.getTableHeight(); row++) {
            const curRow = htmlTable.rows[row];
            for (let cell = 0; cell < tableData.getTableWidth(); cell++) {
                curRow.cells[cell].removeAttribute("style");
                color = pixels[row][cell].getColor();
                curRow.cells[cell].setAttribute("style", "background-color: " + color);
            }
        }
    }
}
