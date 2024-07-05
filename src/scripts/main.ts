document.addEventListener("DOMContentLoaded", initialise);

function initialise() {
    document.getElementById!("testBtn")?.addEventListener("click", testfunction);
    document.getElementById!("btnGenerateTable")?.addEventListener("click", regenerateTable);
    generateTable();
}

//+++++
let tableId = "mainTable";
//+++++

function generateTable() {
    let table = document.createElement("table");
    let row = document.createElement("tr");
    let cell = document.createElement("td");
    let cellClassName = "pixel";
    let tableContainerId = "tableContainer";
    let rowCnt = getInputNumber("tableHeightInput");
    let colCnt = getInputNumber("tableWidthInput");

    table.setAttribute("id", tableId);
    cell.classList.add(cellClassName);
    row.appendChild(cell);
    table.appendChild(row);
    document.getElementById(tableContainerId)!.appendChild(table);
}

function regenerateTable() {
    removeTable(tableId);
    generateTable();
}

function removeTable(tableId: string) {
    document.getElementById(tableId)?.remove();
}

function getInputString(inputId: string): string {
    let input: HTMLElement | null;
    input = document.getElementById(inputId);
    return (!!input) ? (input as HTMLInputElement).value.trim() : "";
}

function getInputNumber(inputId: string): number {
    let inputValue: string = getInputString(inputId);
    //because i will forget:
    //+stringA converts stringA to number, if stringA is not numeric result = NaN, if it is numeric, result is stringA as number. "!isNan(+stringA)" is true if stringA is numeric, otherwise false
    return (!isNaN(+inputValue)) ? +inputValue : 0;
}

function testfunction() {
    removeTable(tableId);
}