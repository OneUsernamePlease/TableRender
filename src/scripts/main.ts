/* TODO
get rid of height, width property of tableData
reading file does not work yet
*/

//#region initialisation
let tableContainerId = "tableContainer";
let data: TableData; 
let rederer: TableRender;

document.addEventListener("DOMContentLoaded", initialise);
function initialise() {
    document.getElementById!("testBtn")?.addEventListener("click", testFunction);
    document.getElementById!("btnGenerateTable")?.addEventListener("click", regenerateTable);

    initialRender();
    
    document.removeEventListener("DOMContentLoaded", initialise);
}

//#endregion

//#region tests
function testFunction() { test2(); }

function test2() {
    const stringData: string | null = getInputFile("imgInput")
    if (stringData === null) {
        console.log("cannot load string data from fileInput");
        return;
    }
    const jsonData: {imgData: string[][]} = JSON.parse(stringData);
    data.fromJson(jsonData);
    rederer.draw(data);
}

function test1() {
    data.testFrame();
    rederer.draw(data);
    console.log(data.encode("mf1"));
}

//#endregion

//#region drawing table


function initialRender() {
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

//#region inputs
function getInputFile(inputId: string): string | null {
    //returns the content of file selected in input (json only) as a string
    //let reader = new FileReader; // mgl 2
    let files: FileList | null= (<HTMLInputElement>document.getElementById(inputId)!).files;

    if (files === null) {return null;}
    
    for (const file of files) {
    let content = file.text; //mgl 1 ? //funktioniert NICHT.....
    return content.toString();
    }
    return null;
    //reader.readAsText(files[0]); //mgl 2 ?
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