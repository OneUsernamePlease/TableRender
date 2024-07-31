//#region variables and such

//ADD COLOR ALL TO DRAW TOOLS
let tableMouseDownState: boolean = false;
let tableContainerId = "tableContainer";
let data: TableData; 
let renderer: TableRender;
let fileContent: string;
let toolsMode: number;
//#endregion

//#region initialisation
document.addEventListener("DOMContentLoaded", initialise);

function initialise() {
    data = new TableData(getInputNumber("tableHeightInput"), getInputNumber("tableWidthInput"));
    renderer = new TableRender(tableContainerId);
    renderer.draw(data);
    
    registerEvents();
    readInputFile();
    setTimeout(() => { setToolMode() }, 50); 
    //if a (tool-)mode other than the one defined in html is checked, setToolMode() uses the predefined value, although firefox will then check the "cached" radiobutton
    //(this is possibly a firefox issue, it's got a few quirks, edge just does not remember the checked button, and i'm not gonna install another browser)
    //it occurs when you duplicate the tab, with a regular reload it behaves correctly

    document.removeEventListener("DOMContentLoaded", initialise);
}
function registerEvents() {
    document.getElementById("testBtn")?.addEventListener("click", testFunction);
    document.getElementById("btnGenerateTable")?.addEventListener("click", regenerateTable);
    document.getElementById("save")?.addEventListener("click", save);
    document.getElementById("btnDisplayFile")?.addEventListener("click", displayFile);
    document.getElementById("imgInput")?.addEventListener("change", readInputFile);
    document.getElementById("tableWidthInput")?.addEventListener("keyup", enforceInputNumber);
    document.getElementById("closeSidebar")?.addEventListener("click", closeSidebar);
    document.getElementById("openSidebar")?.addEventListener("click", openSidebar); 
    document.getElementById(renderer.elementId)?.addEventListener("mousedown", tableMouseDown);
    document.getElementById(renderer.elementId)?.addEventListener("mouseup", tableMouseUp);
    document.getElementById(renderer.elementId)?.addEventListener("mouseleave", () => {tableMouseDownState = false});
    document.querySelectorAll("input[name=tools]")?.forEach(element => { element.addEventListener("change", setToolMode) });
    document.querySelectorAll(".pixel")?.forEach(element => { element.addEventListener("mouseenter", tableMouseMove) });
}
//#endregion

//#region page layout & mode
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
function setToolMode() {
    //hide/show specific tools, according to current selection
    //TODO: dont use queryselector, but either this or ev args
    let mode = (<HTMLInputElement>document.querySelector('input[name="tools"]:checked')).value;
    switch (mode) {
        case "draw":
            toolsMode = Tools.Draw;
            showDrawTools();
            break;
        case "none":
            toolsMode = Tools.None;
            hideDrawTools();
            break;
        default:
            break;
    }
}
function hideDrawTools() {
    document.getElementById("drawTools")!.style.display = "none";
}
function showDrawTools() {
    document.getElementById("drawTools")!.style.removeProperty("display");
}
//#endregion

//#region tests, logs
let testFunction = () => { 
    test3(); 
}
function test3() {
    console.log("checked Tool in the sidebar: " + (<HTMLInputElement>document.querySelector('input[name="tools"]:checked')).value);
}
function test2() {
    //fill in random color
    const color = randomColor();
    data.colorAll(color);
    renderer.draw(data);
}
function test1() {
    //log pf1-encoded tableData
    console.log(data.encode("pf1"));
    renderer.clearTable();
}
//#endregion

//#region drawing table
function randomColor(): string {
    const r = (Math.floor(Math.random() * 255).toString(16)).padStart(2, "0");
    const g = (Math.floor(Math.random() * 255).toString(16)).padStart(2, "0");
    const b = (Math.floor(Math.random() * 255).toString(16)).padStart(2, "0");
    return "#" + r+g+b
}
function colorCell(cell: HTMLTableCellElement, color: string) {
    let cellIdx: [row: number, col: number] = [(<HTMLTableRowElement>cell.parentElement).rowIndex, cell.cellIndex];
    renderer.setColor(cell, color);
    data.setPixelColor(cellIdx[0], cellIdx[1], color);
}
function regenerateTable() {
    //redraw a new table, colored black, sized according to input spec
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
function tableMouseDown(this: HTMLElement, ev: MouseEvent) {
    //depending on what tool is selected, do something
    const cell: HTMLTableCellElement | null = (<Element>ev.target).closest("td");
    if (!cell) return;
    if (ev.button !== 0) return;

    tableMouseDownState = true;
    switch (toolsMode) {
        case Tools.None:
            console.log("clicked cell: row: " + (<HTMLTableRowElement>cell.parentElement).rowIndex + "; cell: " + cell.cellIndex);
            break;
    
        case Tools.Draw:
            drawToolsPen(cell);
            break;

        default:
            break;
    }
}
function tableMouseMove(this: HTMLElement, ev: Event) {
    //depending on what tool is selected, do something
    const cell: HTMLTableCellElement = (<HTMLTableCellElement>ev.target);
    if (!cell) return;
    if (!tableMouseDownState) return;
    switch (toolsMode) {
        case Tools.None:
            console.log("moved to cell: row: " + (<HTMLTableRowElement>cell.parentElement).rowIndex + "; cell: " + cell.cellIndex)
            break;
    
        case Tools.Draw:
            drawToolsPen(cell);
            break;

        default:
            break;
    }
}
function tableMouseUp(this: HTMLElement, ev: MouseEvent) {
    if (ev.button !== 0) return;
    tableMouseDownState = false;
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
    const color0: string = data.pixels[0][0].color;
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
            fileContent = content as string;
        };
        reader.readAsText(file);
    }
}
function getInputColor(inputId: string) {
    return (<HTMLInputElement>document.getElementById(inputId)).value;
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
    return (!isNaN(+s)) && s.length !== 0;
    //what? -->
    //+stringA converts stringA to number, if stringA is not numeric result = NaN, if it is numeric, result is stringA as number. "!isNan(+stringA)" is true if stringA is numeric, otherwise false

    /*/which is faster?
    s = s.trim();
    return /^\d*.?\d*$/.test(s); //problem is that a single dot and empty string is considered numeric
    */
}
function enforceInputNumber(this: HTMLElement) {
    //enforces, that value of input this, is not below its min, or above its max value
    //enforces, that only a numeric (integer) string can be entered
    let that: HTMLInputElement = <HTMLInputElement>this;
    const min: number = (that.min !== "") ? +that.min : 0;
    const max: number = (that.max !== "") ? +that.max : 1e10;//Number.MAX_VALUE;
    let curInput: string = that.value; //value non-numeric --> curInput = ""
    that.value = (curInput === "") ? min.toString() : Math.min(max, Math.max(min, +curInput)).toString();
}
//#endregion