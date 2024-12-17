"use strict";
//#region variables and such
//ADD COLOR ALL TO DRAW TOOLS
let tableLMouseDownState = false;
let tableContainerId = "tableContainer";
let inputColor = "#000000";
let data;
let renderer;
let uploadedFile = { mimeType: "", content: "" };
let toolsMode;
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
    setTimeout(() => { setToolMode(); }, 50);
    //setTimeout is a solution for firefox, it gets confused when duplicating a tab
    document.removeEventListener("DOMContentLoaded", initialize);
}
function registerEvents() {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    (_a = document.getElementById("testBtn")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", testFunction);
    (_b = document.getElementById("btnGenerateTable")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", regenerateTable);
    (_c = document.getElementById("save")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", save);
    (_d = document.getElementById("btnDisplayFile")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", displayFile);
    (_e = document.getElementById("imgInput")) === null || _e === void 0 ? void 0 : _e.addEventListener("change", readInputFile);
    (_f = document.getElementById("closeSidebar")) === null || _f === void 0 ? void 0 : _f.addEventListener("click", closeSidebar);
    (_g = document.getElementById("openSidebar")) === null || _g === void 0 ? void 0 : _g.addEventListener("click", openSidebar);
    (_h = document.querySelectorAll("input[name=tools]")) === null || _h === void 0 ? void 0 : _h.forEach(element => { element.addEventListener("change", setToolMode); });
}
//#endregion
//#region page layout & mode
function openSidebar() {
    const sidebar = document.getElementById("sidebar");
    sidebar.style.width = "auto";
    document.getElementById("mainContent").style.marginLeft = sidebar.clientWidth.toString() + "px";
}
function closeSidebar() {
    const sidebar = document.getElementById("sidebar");
    sidebar.style.width = "0";
    document.getElementById("mainContent").style.marginLeft = "0";
}
//#endregion
//#region tests, logs
let testFunction = () => {
    test2();
};
function test3() {
    console.log("checked Tool in the sidebar: " + document.querySelector('input[name="tools"]:checked').value);
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
            const jsonData = JSON.parse(uploadedFile.content);
            data = Images.fromJson(jsonData);
            renderer.draw(data);
            break;
        case "image/bmp":
            Images.fromBMP(uploadedFile.content).then((result) => {
                data = result;
                renderer.draw(data);
            }).catch((error) => {
                console.log(error);
            });
            break;
        default:
            console.log("mime not supported");
            break;
    }
}
//#endregion
//#region export
function save() {
    //encode tableData and save/download it as json
    const name = newFilename();
    const file = Images.createBlob((Images.encodeTableData(data, "pf1")));
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
function newFilename() {
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
function updateSelectedColor() {
    let inputValue = this.value;
    inputColor = JSFunctions.normalizeColor(inputValue);
}
/**
 * Return value of HTMLInputElement, if it is a valid color string (hex and rgb(r,g,b) are valid formats).
 * Returns "#000000" if value is not a valid color
 * @param inputId
 */
function getInputColor(inputId) {
    let inputColor = document.getElementById(inputId).value;
    return JSFunctions.normalizeColor(inputColor);
}
/**
 * read the content of file uploaded in input-element "#imgInput" as a string and loads it to global variable fileContent (main.ts).
 * Should be called on file-input's change-event
 */
function readInputFile() {
    let files = document.getElementById("imgInput").files;
    if (files === null)
        return;
    const file = files[0];
    if (file) {
        const reader = new FileReader;
        switch (file.type) {
            case "application/json":
                reader.onload = () => {
                    const content = reader.result;
                    uploadedFile.mimeType = file.type;
                    uploadedFile.content = content;
                };
                reader.readAsText(file);
                break;
            case "image/bmp":
                reader.onload = () => {
                    const content = reader.result;
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
function getInputValue(inputId) {
    let input = document.getElementById(inputId);
    return (input instanceof HTMLInputElement) ? input.value.trim() : "";
}
/**
 * @param inputId elementID for input-element
 * @returns element's value attribute; 0 if value is not numeric
 */
function getInputNumber(inputId) {
    let inputValue = getInputValue(inputId);
    return JSFunctions.isNumeric(inputValue) ? +inputValue : 0;
}
//#endregion
//# sourceMappingURL=main.js.map