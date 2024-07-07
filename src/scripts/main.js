"use strict";
document.addEventListener("DOMContentLoaded", initialise);
//0,0 is top left
//0,1 is row 0, col 1
//standardize!!!!!!
function initialise() {
    var _a;
    (_a = document.getElementById("testBtn")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", testFunction);
    //document.getElementById!("btnGenerateTable")?.addEventListener("click", regenerateTable);
    //generateTable(getInputNumber("tableWidthInput"), getInputNumber("tableHeightInput"), getInputNumber("pixelWidthInput"));
    document.removeEventListener("DOMContentLoaded", initialise);
}
//+++++
let tableId = "mainTable";
let tableContainerId = "tableContainer";
//let tableWidth: number, tableHeight: number;
let data;
//+++++
function testFunction() {
    TableRender.removeTable(tableId);
    initialRender(data);
}
function initialRender(data) {
    data = new TableData(tableId, getInputNumber("tableHeightInput"), getInputNumber("tableWidthInput"));
    TableRender.initTable(data, tableContainerId);
}
//#region functional version - to be replaced by objects
//function generateTable(tableWidth: number, tableHeight: number, pixelWidth: number) {
//    let table = document.createElement("table");
//    let cellClassName = "pixel";
//    let tableContainerId = "tableContainer";
//
//    table.setAttribute("id", tableId);
//    for (let i = 0; i < tableHeight; i++) {
//        let row = document.createElement("tr");
//        row.classList.add("r" + i);
//        for(let j = 0; j < tableWidth; j++) {
//            let cell = document.createElement("td");
//            cell.classList.add(cellClassName);
//            cell.classList.add("c" + j);
//            //cell.setAttribute("style", `width: ${pixelWidth}; height: ${pixelWidth}`); //no but i dont want inline style. i want to change main.css
//            row.appendChild(cell);
//        }
//        table.appendChild(row);
//    }
//    document.getElementById(tableContainerId)!.appendChild(table);
//}
//function regenerateTable() {
//    removeTable(tableId);
//    generateTable(getInputNumber("tableWidthInput"), getInputNumber("tableHeightInput"), getInputNumber("pixelWidthInput"));
//}
//function removeTable(tableId: string) {
//    document.getElementById(tableId)?.remove();
//}
//#endregion
function getInputString(inputId) {
    //return value of input element by id
    let input;
    input = document.getElementById(inputId);
    return (!!input) ? input.value.trim() : "";
}
function getInputNumber(inputId) {
    //returns value of input element by id
    //returns 0 if input's value is not numeric
    let inputValue = getInputString(inputId);
    //because i will forget:
    //+stringA converts stringA to number, if stringA is not numeric result = NaN, if it is numeric, result is stringA as number. "!isNan(+stringA)" is true if stringA is numeric, otherwise false
    return (!isNaN(+inputValue)) ? +inputValue : 0;
}
