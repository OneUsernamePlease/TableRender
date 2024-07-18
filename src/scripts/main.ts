/* TODO
get rid of height, width property of tableData
in tableData, keeping track of whether a cell was updated. then use this info when drawing
*/

//#region initialisation
let tableContainerId = "tableContainer";
let data: TableData; 
let renderer: TableRender;
let fileContent: string;

document.addEventListener("DOMContentLoaded", initialise);

function initialise() {
    document.getElementById!("testBtn")?.addEventListener("click", testFunction);
    document.getElementById!("btnGenerateTable")?.addEventListener("click", regenerateTable);
    document.getElementById!("save")?.addEventListener("click", save);
    document.getElementById!("btnDisplayFile")?.addEventListener("click", displayFile);
    document.getElementById!("imgInput")?.addEventListener("change", readInputFile);
    document.getElementById!("tableWidthInput")?.addEventListener("keyup", enforceInputNumber);
    document.getElementById!("closeSidebar")?.addEventListener("click", closeSidebar);
    document.getElementById!("openSidebar")?.addEventListener("click", openSidebar);

    data = new TableData(getInputNumber("tableHeightInput"), getInputNumber("tableWidthInput"));
    renderer = new TableRender(tableContainerId);
    
    renderer.draw(data);
    readInputFile();

    document.removeEventListener("DOMContentLoaded", initialise);
}
//#endregion

//#region page layout
function openSidebar() {
    const sidebar = document.getElementById("sidebar");
    sidebar!.style.width = "auto";
    document.getElementById("mainContent")!.style.marginLeft = sidebar!.clientWidth.toString();
}
function closeSidebar() {
    const sidebar = document.getElementById("sidebar");
    sidebar!.style.width = "0";
    document.getElementById("mainContent")!.style.marginLeft = "0";
}
//#endregion

//#region tests
let testFunction = () => { 
    test2(); 
}
function test2() {
    //fill in random color
    const color = randomColor();
    data.colorAll(color);
    console.log(`color: ${color} - lenColor: ${color.length}`);
    renderer.draw(data);
   // console.log(data.encode("pf1"));
}
function test1() {
    //log pf1-encoded tableData
    console.log(data.encode("pf1"));
    renderer.clearTable();
}
function randomColor(): string {
    const r = (Math.floor(Math.random() * 255).toString(16)).padStart(2, "0");
    const g = (Math.floor(Math.random() * 255).toString(16)).padStart(2, "0");
    const b = (Math.floor(Math.random() * 255).toString(16)).padStart(2, "0");
    return "#" + r+g+b
}
//#endregion

//#region drawing table
function regenerateTable() {
    //remove table w/ id tableId
    //draw a new table, according to spec
    data.colorAll("#000000", getInputNumber("tableHeightInput"), getInputNumber("tableWidthInput"));
    renderer.draw(data);
}
function displayFile() {
    //display selected file
    const stringData: string = fileContent;
    if (!stringData) {
        console.log("fileContent has not been read successfully");
        return;
    }
    const jsonData: {imgdata: string[][]} = JSON.parse(stringData);
    data.fromJson(jsonData);
    renderer.draw(data);
}
//#endregion

//#region export
function save() {
    //encode tableData and save/download it as json
    const name = newFilename();
    const file = data.createBlob(<JSON>data.encode("pf1"));

    var dlink = document.createElement('a');
    dlink.download = name;
    dlink.href = window.URL.createObjectURL(file);
    dlink.onclick = () => {
        // revokeObjectURL needs a delay to work properly
        setTimeout(() => {
            window.URL.revokeObjectURL(dlink.href);
        }, 1500);
    };
    dlink.click();
    dlink.remove();
}
function newFilename(): string {
    //return a name which is suggested when downloading tableData
    const color0: string = data.getPixel(0,0).color;
    return color0 + "_data.json";
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
    return isNumeric(inputValue) ? +inputValue : 0;
}
function isNumeric(s: string): boolean {
    //returns true if s is a valid number, returns false otherwise
    //empty string is NOT considered numeric
    s = s.trim();
    return ((!isNaN(+s)) && s.length !== 0) ? true : false;
    //what? -->
    //+stringA converts stringA to number, if stringA is not numeric result = NaN, if it is numeric, result is stringA as number. "!isNan(+stringA)" is true if stringA is numeric, otherwise false
}
function enforceInputNumber(this: HTMLElement) {
    //enforces, that value of input this, is not below its min, or above its max value
    //enforces, that only a numeric (integer) string can be entered
    let that: HTMLInputElement = <HTMLInputElement>this;
    const min: number = (that.min !== "") ? +that.min : Number.MIN_VALUE;
    const max: number = (that.max !== "") ? +that.max : Number.MAX_VALUE;
    let curInput: string = that.value; //value non-numeric --> curInput = ""
    //while (curInput !== "" && !isNumeric(curInput.slice(-1))) {
    //    curInput = curInput.slice(0, -1);
    //}
    that.value = (curInput === "") ? min.toString() : Math.min(max, Math.max(min, +curInput)).toString();
}
//#endregion