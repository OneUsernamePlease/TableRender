document.addEventListener("DOMContentLoaded", initialise);

function initialise() {
    document.getElementById!("testBtn")?.addEventListener("click", testFunction);
    document.getElementById!("btnGenerateTable")?.addEventListener("click", regenerateTable);

    initialRender();
    
    document.removeEventListener("DOMContentLoaded", initialise);
}

//+++++
let tableId = "mainTable";
let tableContainerId = "tableContainer";
let data: TableData; 
//+++++

function testFunction() {
    data.newFrame();
    TableRender.draw(data);
}

function initialRender() {
    data = new TableData(tableId, getInputNumber("tableWidthInput"), getInputNumber("tableHeightInput"));
    TableRender.initTable(data, tableContainerId);  
}

function regenerateTable() {
    //remove table w/ id tableId
    //draw a new table, according to spec
    TableRender.removeTable(tableId);
    initialRender();
}

function getInputString(inputId: string): string {
    //return value of input element by id
    let input: HTMLElement | null;
    input = document.getElementById(inputId);
    return (!!input) ? (input as HTMLInputElement).value.trim() : "";
}

function getInputNumber(inputId: string): number {
    //returns value of input element by id
    //returns 0 if input's value is not numeric
    let inputValue: string = getInputString(inputId);
    //because i will forget:
    //+stringA converts stringA to number, if stringA is not numeric result = NaN, if it is numeric, result is stringA as number. "!isNan(+stringA)" is true if stringA is numeric, otherwise false
    return (!isNaN(+inputValue)) ? +inputValue : 0;
}