/* TODO
get rid of height, width property of tableData
reading file does not work yet
in tableData, create a second table, same size, of booleans, keeping track of whether a cell was updated. then use this info when drawing
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
    document.getElementById!("imgInput")?.addEventListener("change", readInputFile);

    initialRender();
    readInputFile();

    document.removeEventListener("DOMContentLoaded", initialise);
}

//#endregion

//#region tests
function testFunction() { test2(); }

function test2() {
    const stringData: string = fileContent;
    if (!stringData) {
        console.log("fileContent has not been read successfully");
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
function readInputFile() {
    //read the content of file selected in input (json only) as a string
    //loads the content to global fileContent
    //call on fileInput's change
    let files: FileList | null = (<HTMLInputElement>document.getElementById("imgInput")).files;
    
    if (files === null) {return null;}
    const file = files[0];
    // I HAVE ZERO CLUE WHAT THE SUPER HORNY GRANNY FUCK IS GOING ON IN HERE AND DEBUGGING DOES NOT HELP AT ALL...
    // setting a breakpoint inside onload can be reached, but breaking outside and trying to step in does not work
    if (!!file) {
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