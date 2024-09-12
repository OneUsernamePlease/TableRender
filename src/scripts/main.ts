//#region variables and such

//ADD COLOR ALL TO DRAW TOOLS
let tableLMouseDownState: boolean = false;
let tableContainerId = "tableContainer";
let inputColor: string = "#000000";
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
    inputColor = getInputColor("drawToolsColorPicker");
    setTimeout(() => { setToolMode() }, 50);
    //setTimeout is a solution for firefox, it gets confused when duplicating a tab

    document.removeEventListener("DOMContentLoaded", initialise);
}
function registerEvents() {
    document.getElementById("testBtn")?.addEventListener("click", testFunction);
    document.getElementById("btnGenerateTable")?.addEventListener("click", regenerateTable);
    document.getElementById("save")?.addEventListener("click", save);
    document.getElementById("btnDisplayFile")?.addEventListener("click", displayFile);
    document.getElementById("imgInput")?.addEventListener("change", readInputFile);
    document.getElementById("closeSidebar")?.addEventListener("click", closeSidebar);
    document.getElementById("openSidebar")?.addEventListener("click", openSidebar); 
    document.querySelectorAll("input[name=tools]")?.forEach(element => { element.addEventListener("change", setToolMode) });
    }
//#endregion

//#region page layout & mode
function openSidebar() {
    const sidebar = document.getElementById("sidebar");
    sidebar!.style.width = "auto";
    document.getElementById("mainContent")!.style.marginLeft = sidebar!.clientWidth.toString() + "px";
}
function closeSidebar() {
    const sidebar = document.getElementById("sidebar");
    sidebar!.style.width = "0";
    document.getElementById("mainContent")!.style.marginLeft = "0";
}

//#endregion

//#region tests, logs
let testFunction = () => { 
    test2(); 
}
function test3() {
    console.log("checked Tool in the sidebar: " + (<HTMLInputElement>document.querySelector('input[name="tools"]:checked')).value);
}
/**
 * Fill all in random color
 */
function test2() {
    //fill table with random color
    data.colorAll(randomColor());
    renderer.draw(data);
}
function test1() {
    //log pf1-encoded tableData
    console.log(data.encode("pf1"));
    renderer.clearTable();
}
//#endregion

//#region drawing table
function regenerateTable() {
    //redraw a new table, colored black, sized according to input spec
    data.colorAll("#000000", getInputNumber("tableHeightInput"), getInputNumber("tableWidthInput"));
    renderer.draw(data);
}
function displayFile() {
    //display selected file
    const stringData: string = fileContent;
    if (!stringData) {
        console.log("file content has not been read successfully");
        return;
    }
    const jsonData: {imgdata: string[][]} = JSON.parse(stringData);
    data.fromJson(jsonData);
    renderer.draw(data);
}
/**
 * valid color formats are hex and rgb(r,g,b) (r,g,b being decimal values)
 * @param testColor the string to test
 * @returns testColor if it is a valid color format, #000000 if testColor is not a valid color format
 */
function testColorString(testColor: string): string {
    let valid = /^#?[0-9A-F]{6}$/i.test(testColor) || /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/i.test(testColor)
    return valid ? testColor : "#000000";
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
/**
 * set global inputColor to the selected color - the value attribute of 'this'
 * @param this HTMLElement
 */
function updateSelectedColor(this: HTMLElement) {
    let inputValue = (<HTMLInputElement>this).value;
    inputColor = testColorString(inputValue);
}
/**
 * Return value of HTMLInputElement, if it is a valid color string (hex and rgb(r,g,b) are valid formats).
 * Returns "#000000" if value is not a valid color
 * @param inputId 
 */
function getInputColor(inputId: string) {
    let inputColor = (<HTMLInputElement>document.getElementById(inputId)).value;
    return testColorString(inputColor);
}
/**
 * read the content of file uploaded in input-element "#imgInput" as a string and loads it to global variable fileContent (main.ts).
 * Should be called on file-input's change-event
 */
function readInputFile() {
    let files: FileList | null = (<HTMLInputElement>document.getElementById("imgInput")).files;
    if (files === null) return;

    const file = files[0];
    if (file) {
        const reader = new FileReader;
        reader.onload = () => {
            const content = reader.result;
            fileContent = content as string;
        };
        reader.readAsText(file);
    }
}
/**
 * @param inputId elementID for input-element
 * @returns element's value attribute (trimmed), or empty string if inputElement is not valid
 */
function getInputValue(inputId: string): string {
    let input: HTMLElement | null;
    input = document.getElementById(inputId);
    return (!!input) ? (input as HTMLInputElement).value.trim() : "";
}
/**
 * @param inputId elementID for input-element
 * @returns element's value attribute; 0 if value is not numeric
 */
function getInputNumber(inputId: string): number {
    let inputValue: string = getInputValue(inputId);
    return isNumeric(inputValue) ? +inputValue : 0;
}
/**
 * empty string is NOT considered numeric
 * @param s the string to be examined
 * @returns true if s is a valid number, returns false otherwise
 */
function isNumeric(s: string): boolean {
    s = s.trim();
    return (!isNaN(+s)) && s.length !== 0;
}
//#endregion