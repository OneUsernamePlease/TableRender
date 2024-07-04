document.addEventListener("DOMContentLoaded", initialise);
function initialise() {
    generateTable("tableContainer");
}
//+++++
var tableId = "mainTable";
//+++++
function generateTable(tableContainerId) {
    removeTable(tableId);
    var cellClassName = "pixel";
    var table = document.createElement("table");
    var row = document.createElement("tr");
    var cell = document.createElement("td");
    table.setAttribute("id", tableId);
    cell.classList.add(cellClassName);
    row.appendChild(cell);
    table.appendChild(row);
    document.getElementById(tableContainerId).appendChild(table);
}
function removeTable(tableId) {
    var _a;
    (_a = document.getElementById(tableId)) === null || _a === void 0 ? void 0 : _a.remove();
}
