//#region variables and such

//ADD COLOR ALL TO DRAW TOOLS
let tableLMouseDownState: boolean = false;
let tableContainerId = "tableContainer";
let inputColor: string = "#000000";
let data: TableData; 
let renderer: TableRender;
let uploadedFile: { mimeType: string, content: string | Blob } = { mimeType: "", content: ""};
let toolsMode: number;
//#endregion

//#region initialization
document.addEventListener("DOMContentLoaded", initialize);
function initialize() {
    data = new TableData(getInputNumber("tableHeightInput"), getInputNumber("tableWidthInput"));
    renderer = new TableRender(tableContainerId);
    renderer.draw(data);
    
    registerEvents();
    readInputFile();
    inputColor = getInputColor("drawToolsColorPicker");
    setTimeout(() => { setToolMode() }, 50);
    //setTimeout is a solution for firefox, it gets confused when duplicating a tab

    document.removeEventListener("DOMContentLoaded", initialize);
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
    console.log(Images.encodeTableData(data, "pf1"));
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
    if (!uploadedFile) {
        console.log("file content has not been read successfully");
        return;
    }
    switch (uploadedFile.mimeType) {
        case "application/json":
            const jsonData: {imgdata: string[][]} = JSON.parse(uploadedFile.content as string);
            data = Images.fromJson(jsonData);
            renderer.draw(data);
            break;
        case "image/jpeg":
        case "image/png":
        case "image/bmp":
            Images.fromImage(uploadedFile.content as Blob).then((result: TableData) => {
                data = result;
                renderer.draw(data);
            }).catch((error) => {
                console.log(error)
            });
            break;
        default:
            console.log("mime not supported")
            break;
    }

}
//#endregion

//#region export
function save() {
    //encode tableData and save/download it as json
    const name = newFilename();
    const file = Images.createBlob(<JSON>(Images.encodeTableData(data, "pf1")));

    var dLink = document.createElement('a');
    dLink.download = name;
    dLink.href = window.URL.createObjectURL(file);
    dLink.onclick = () => {
        // revokeObjectURL needs a delay to work properly
        setTimeout(() => {
            window.URL.revokeObjectURL(dLink.href);
        }, 1500);
    };
    dLink.click();
    dLink.remove();
}
function newFilename(): string {
    //return a name which is suggested when downloading tableData
    const color0 = data.pixels[0][0].color;
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
    inputColor = JSFunctions.normalizeColor(inputValue);
}
/**
 * Return value of HTMLInputElement, if it is a valid color string (hex and rgb(r,g,b) are valid formats).
 * Returns "#000000" if value is not a valid color
 * @param inputId 
 */
function getInputColor(inputId: string) {
    let inputColor = (<HTMLInputElement>document.getElementById(inputId)).value;
    return JSFunctions.normalizeColor(inputColor);
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
        switch (file.type) {
            case "application/json":
                reader.onload = () => {
                    const content = reader.result;
                    uploadedFile.mimeType = file.type;
                    uploadedFile.content = content as string;
                };
                reader.readAsText(file);
                break;
        
            case "image/jpeg":
            case "image/png":
            case "image/bmp":
                reader.onload = () => {
                    const content = reader.result as ArrayBuffer;
                    // Store the binary data as a Blob or ArrayBuffer
                    uploadedFile.mimeType = file.type;
                    uploadedFile.content = new Blob([content], { type: file.type });
                };
                reader.readAsArrayBuffer(file);
                break;

            default:
                break;
        }

    
    }
}
/**
 * @param inputId elementID for input-element
 * @returns element's value attribute (trimmed), or empty string if inputElement is not valid
 */
function getInputValue(inputId: string): string {
    let input = document.getElementById(inputId);
    return (input instanceof HTMLInputElement) ? (input as HTMLInputElement).value.trim() : "";
}
/**
 * @param inputId elementID for input-element
 * @returns element's value attribute; 0 if value is not numeric
 */
function getInputNumber(inputId: string): number {
    let inputValue: string = getInputValue(inputId);
    return JSFunctions.isNumeric(inputValue) ? +inputValue : 0;
}
//#endregion