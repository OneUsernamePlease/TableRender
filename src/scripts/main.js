document.addEventListener("DOMContentLoaded", initialise);
function initialise() {
    var _a, _b;
    (_a = document.getElementById("testBtn")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", testfunction);
    (_b = document.getElementById("btnGenerateTable")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", regenerateTable);
    generateTable(getInputNumber("tableWidthInput"), getInputNumber("tableHeightInput"), getInputNumber("pixelWidthInput"));
}
//+++++
var tableId = "mainTable";
//+++++
function generateTable(tableWidth, tableHeight, pixelWidth) {
    var table = document.createElement("table");
    var cellClassName = "pixel";
    var tableContainerId = "tableContainer";
    table.setAttribute("id", tableId);
    for (var i = 0; i < tableHeight; i++) {
        var row = document.createElement("tr");
        row.classList.add("r" + i);
        for (var j = 0; j < tableWidth; j++) {
            var cell = document.createElement("td");
            cell.classList.add(cellClassName);
            cell.classList.add("c" + j);
            cell.setAttribute("style", "width: ".concat(pixelWidth, "; height: ").concat(pixelWidth)); //no but i dont want inline style. i want to change main.css
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
    document.getElementById(tableContainerId).appendChild(table);
}
function regenerateTable() {
    removeTable(tableId);
    generateTable(getInputNumber("tableWidthInput"), getInputNumber("tableHeightInput"), getInputNumber("pixelWidthInput"));
}
function removeTable(tableId) {
    var _a;
    (_a = document.getElementById(tableId)) === null || _a === void 0 ? void 0 : _a.remove();
}
function getInputString(inputId) {
    //return value of input element by id
    var input;
    input = document.getElementById(inputId);
    return (!!input) ? input.value.trim() : "";
}
function getInputNumber(inputId) {
    //returns 0 if input's value is not numeric
    var inputValue = getInputString(inputId);
    //because i will forget:
    //+stringA converts stringA to number, if stringA is not numeric result = NaN, if it is numeric, result is stringA as number. "!isNan(+stringA)" is true if stringA is numeric, otherwise false
    return (!isNaN(+inputValue)) ? +inputValue : 0;
}
function testfunction() {
    removeTable(tableId);
}
