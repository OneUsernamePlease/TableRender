"use strict";
//#region variables and such
//ADD COLOR ALL TO DRAW TOOLS
let tableLMouseDownState = false;
let tableContainerId = "tableContainer";
let inputColor = "#000000";
let data;
let renderer;
let fileContent;
let toolsMode;
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
    setTimeout(() => { setToolMode(); }, 50);
    //setTimeout is a solution for firefox, it gets confused when duplicating a tab
    document.removeEventListener("DOMContentLoaded", initialise);
}
function registerEvents() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
    (_a = document.getElementById("testBtn")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", testFunction);
    (_b = document.getElementById("btnGenerateTable")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", regenerateTable);
    (_c = document.getElementById("save")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", save);
    (_d = document.getElementById("btnDisplayFile")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", displayFile);
    (_e = document.getElementById("imgInput")) === null || _e === void 0 ? void 0 : _e.addEventListener("change", readInputFile);
    (_f = document.getElementById("closeSidebar")) === null || _f === void 0 ? void 0 : _f.addEventListener("click", closeSidebar);
    (_g = document.getElementById("openSidebar")) === null || _g === void 0 ? void 0 : _g.addEventListener("click", openSidebar);
    (_h = document.getElementById("drawToolsColorPicker")) === null || _h === void 0 ? void 0 : _h.addEventListener("change", updateSelectedColor);
    (_j = document.getElementById(renderer.elementId)) === null || _j === void 0 ? void 0 : _j.addEventListener("mousedown", tableMouseDown);
    (_k = document.getElementById(renderer.elementId)) === null || _k === void 0 ? void 0 : _k.addEventListener("mouseup", tableMouseUp);
    (_l = document.getElementById(renderer.elementId)) === null || _l === void 0 ? void 0 : _l.addEventListener("mousemove", tableMouseMove);
    (_m = document.getElementById(renderer.elementId)) === null || _m === void 0 ? void 0 : _m.addEventListener("mouseleave", () => { tableLMouseDownState = false; });
    (_o = document.querySelectorAll("input[name=tools]")) === null || _o === void 0 ? void 0 : _o.forEach(element => { element.addEventListener("change", setToolMode); });
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
    const stringData = fileContent;
    if (!stringData) {
        console.log("file content has not been read successfully");
        return;
    }
    const jsonData = JSON.parse(stringData);
    data.fromJson(jsonData);
    renderer.draw(data);
}
function tableMouseDown(ev) {
    //depending on what tool is selected, do something
    const cell = ev.target.closest("td");
    if (!cell)
        return;
    if (ev.button !== 0)
        return;
    tableLMouseDownState = true;
    switch (toolsMode) {
        case Tools.None:
            console.log("clicked cell: row: " + cell.parentElement.rowIndex + "; cell: " + cell.cellIndex);
            break;
        case Tools.Draw:
            drawToolsPen(cell);
            break;
        default:
            break;
    }
}
function tableMouseMove(ev) {
    //depending on what tool is selected, do something
    const cell = ev.target.closest("td");
    if (!cell)
        return;
    if (!tableLMouseDownState)
        return;
    switch (toolsMode) {
        case Tools.None:
            console.log("moved to cell: row: " + cell.parentElement.rowIndex + "; cell: " + cell.cellIndex);
            break;
        case Tools.Draw:
            drawToolsPen(cell);
            break;
        default:
            break;
    }
}
function tableMouseUp(ev) {
    //call on MouseUp inside htmlTable, and mouseLeave htmlTable
    //sets tableMouseDownState (which keeps track of lmb being down in htmlTable) to false
    if (ev.button !== 0)
        return;
    tableLMouseDownState = false;
}
/**
 * valid color formats are hex and rgb(r,g,b) (r,g,b being decimal values)
 * @param testColor the string to test
 * @returns testColor if it is a valid color format, #000000 if testColor is not a valid color format
 */
function testColorString(testColor) {
    let valid = /^#?[0-9A-F]{6}$/i.test(testColor) || /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/i.test(testColor);
    return valid ? testColor : "#000000";
}
//#endregion
//#region export
function save() {
    //encode tableData and save/download it as json
    const name = newFilename();
    const file = data.createBlob(data.encode("pf1"));
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
    inputColor = testColorString(inputValue);
}
/**
 * Return value of HTMLInputElement, if it is a valid color string (hex and rgb(r,g,b) are valid formats).
 * Returns "#000000" if value is not a valid color
 * @param inputId
 */
function getInputColor(inputId) {
    let inputColor = document.getElementById(inputId).value;
    return testColorString(inputColor);
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
        reader.onload = () => {
            const content = reader.result;
            fileContent = content;
        };
        reader.readAsText(file);
    }
}
/**
 * @param inputId elementID for input-element
 * @returns element's value attribute (trimmed), or empty string if inputElement is not valid
 */
function getInputValue(inputId) {
    let input;
    input = document.getElementById(inputId);
    return (!!input) ? input.value.trim() : "";
}
/**
 * @param inputId elementID for input-element
 * @returns element's value attribute; 0 if value is not numeric
 */
function getInputNumber(inputId) {
    let inputValue = getInputValue(inputId);
    return isNumeric(inputValue) ? +inputValue : 0;
}
/**
 * empty string is NOT considered numeric
 * @param s the string to be examined
 * @returns true if s is a valid number, returns false otherwise
 */
function isNumeric(s) {
    s = s.trim();
    return (!isNaN(+s)) && s.length !== 0;
}
//#endregion
//# sourceMappingURL=main.js.map