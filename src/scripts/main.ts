/* TODO
get rid of height, width property of tableData
in tableData, create a second table, same size, of booleans, keeping track of whether a cell was updated. then use this info when drawing
img format enums and interfaces
*/

//#region initialisation
let tableContainerId = "tableContainer";
let data: TableData; 
let rederer: TableRender;
let fileContent: string;

document.addEventListener("DOMContentLoaded", initialise);
function initialise() {
    document.getElementById!("testBtn")?.addEventListener("click", testFunction);
    document.getElementById!("btnGenerateTable")?.addEventListener("click", regenerateTable);
    document.getElementById!("save")?.addEventListener("click", save);
    document.getElementById!("imgInput")?.addEventListener("change", readInputFile);

    initialRender();
    readInputFile();

    document.removeEventListener("DOMContentLoaded", initialise);
}
//#endregion

//#region tests
function testFunction() { test2(); }

function test2() {
    //display selected file
    const stringData: string = fileContent;
    if (!stringData) {
        console.log("fileContent has not been read successfully");
        return;
    }
    const jsonData: {imgdata: string[][]} = JSON.parse(stringData);
    data.fromJson(jsonData);
    rederer.draw(data);
}
function test1() {
    //log pf1-encoded tableData
    data.testFrame();
    rederer.draw(data);
    console.log(data.encode("pf1"));
}
//#endregion

//#region drawing table
function initialRender() {
    //creates new TableData (from inputs) and TableRender
    data = new TableData(getInputNumber("tableHeightInput"), getInputNumber("tableWidthInput"));
    rederer = new TableRender(tableContainerId);
    rederer.initTable(data);  
}

function regenerateTable() {
    //remove table w/ id tableId
    //draw a new table, according to spec
    rederer.removeTable();
    initialRender();
}
//#endregion

//#region inputs/outputs
function save(this: HTMLElement, ev: MouseEvent) {
    const name = newFilename();
    const file = data.createBlob(<JSON>data.encode("pf1"));

    var dlink = document.createElement('a');
    dlink.download = name;
    dlink.href = window.URL.createObjectURL(file);
    dlink.onclick = function(e) {
        // revokeObjectURL needs a delay to work properly
        var that = this;
        setTimeout(function() {
            window.URL.revokeObjectURL(dlink.href);
        }, 1500);
    };
    dlink.click();
    dlink.remove();
}
function newFilename(): string {
    const date: Date = new Date;
    const name: string = "" + date.getFullYear() + date.getMonth() + date.getDate() + "_data.json";

    return name;
} 

//inputs below
function readInputFile() {
    //read the content of file selected in input (json only) as a string
    //loads the content to global fileContent
    //call on fileInput's change
    let files: FileList | null = (<HTMLInputElement>document.getElementById("imgInput")).files;
    
    if (files === null) {return null;}
    const file = files[0];
    // setting a breakpoint inside onload can be reached, but breaking outside and trying to step in does not work ??
    if (file) {
        const reader = new FileReader;
        reader.onload = () => {
            const content = reader.result;
            console.log(content);
            fileContent = content as string;
        };
        reader.readAsText(file);
    }
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
//#endregion