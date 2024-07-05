document.addEventListener("DOMContentLoaded", initialise);
function initialise() {
    var _a, _b;
    (_a = document.getElementById("testBtn")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", testfunction);
    (_b = document.getElementById("btnGenerateTable")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", regenerateTable);
    generateTable();
}
//+++++
var tableId = "mainTable";
//+++++
function generateTable() {
    var table = document.createElement("table");
    var row = document.createElement("tr");
    var cell = document.createElement("td");
    var cellClassName = "pixel";
    var tableContainerId = "tableContainer";
    var rowCnt = getInputNumber("tableHeightInput");
    var colCnt = getInputNumber("tableWidthInput");
    table.setAttribute("id", tableId);
    cell.classList.add(cellClassName);
    row.appendChild(cell);
    table.appendChild(row);
    document.getElementById(tableContainerId).appendChild(table);
}
function regenerateTable() {
    removeTable(tableId);
    generateTable();
}
function removeTable(tableId) {
    var _a;
    (_a = document.getElementById(tableId)) === null || _a === void 0 ? void 0 : _a.remove();
}
function getInputString(inputId) {
    var input;
    input = document.getElementById(inputId);
    return (!!input) ? input.value.trim() : "";
}
function getInputNumber(inputId) {
    var inputValue = getInputString(inputId);
    //because i will forget:
    //+stringA converts stringA to number, if stringA is not numeric result = NaN, if it is numeric, result is stringA as number. "!isNan(+stringA)" is true if stringA is numeric, otherwise false
    return (!isNaN(+inputValue)) ? +inputValue : 0;
}
function testfunction() {
    removeTable(tableId);
}
