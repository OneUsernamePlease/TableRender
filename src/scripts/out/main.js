"use strict";
document.addEventListener("DOMContentLoaded", initialise);
function initialise() {
    var _a, _b;
    (_a = document.getElementById("testBtn")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", testFunction);
    (_b = document.getElementById("btnGenerateTable")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", regenerateTable);
    initialRender();
    document.removeEventListener("DOMContentLoaded", initialise);
}
//+++++
let tableContainerId = "tableContainer";
let data;
let rederer;
//+++++
function testFunction() {
    data.testFrame();
    rederer.draw(data);
}
function initialRender() {
    data = new TableData(getInputNumber("tableWidthInput"), getInputNumber("tableHeightInput"));
    rederer = new TableRender(tableContainerId);
    rederer.initTable(data);
}
function regenerateTable() {
    //remove table w/ id tableId
    //draw a new table, according to spec
    rederer.removeTable();
    initialRender();
}
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
//# sourceMappingURL=main.js.map