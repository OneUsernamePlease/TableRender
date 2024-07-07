"use strict";
class TableRender {
    static initTable(tableData, tableContainerId) {
        let htmlTable = document.createElement("table");
        let cellClassName = "pixel";
        let tableHeight = tableData.getTableHeight();
        let tableWidth = tableData.getTableWidth();
        htmlTable.setAttribute("id", tableId);
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
}
