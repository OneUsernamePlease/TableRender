"use strict";
//#region variables and such
let tableContainerId = "tableContainer";
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
    setToolMode();
    document.removeEventListener("DOMContentLoaded", initialise);
}
function registerEvents() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    (_a = document.getElementById("testBtn")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", testFunction);
    (_b = document.getElementById("btnGenerateTable")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", regenerateTable);
    (_c = document.getElementById("save")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", save);
    (_d = document.getElementById("btnDisplayFile")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", displayFile);
    (_e = document.getElementById("imgInput")) === null || _e === void 0 ? void 0 : _e.addEventListener("change", readInputFile);
    (_f = document.getElementById("tableWidthInput")) === null || _f === void 0 ? void 0 : _f.addEventListener("keyup", enforceInputNumber);
    (_g = document.getElementById("closeSidebar")) === null || _g === void 0 ? void 0 : _g.addEventListener("click", closeSidebar);
    (_h = document.getElementById("openSidebar")) === null || _h === void 0 ? void 0 : _h.addEventListener("click", openSidebar);
    (_j = document.getElementById(renderer.elementId)) === null || _j === void 0 ? void 0 : _j.addEventListener("mousedown", tableMouseDown);
    (_k = document.querySelectorAll("input[name=tools]")) === null || _k === void 0 ? void 0 : _k.forEach(element => { element.addEventListener("change", setToolMode); });
}
//#endregion
//#region page layout & mode
function openSidebar() {
    const sidebar = document.getElementById("sidebar");
    sidebar.style.width = "auto";
    document.getElementById("mainContent").style.marginLeft = sidebar.clientWidth.toString();
}
function closeSidebar() {
    const sidebar = document.getElementById("sidebar");
    sidebar.style.width = "0";
    document.getElementById("mainContent").style.marginLeft = "0";
}
function setToolMode() {
    //hide/show specific tools, according to current selection
    //TODO: dont use queryselector, but either this or ev args
    let mode = document.querySelector('input[name="tools"]:checked').value;
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
    document.getElementById("drawTools").style.display = "none";
}
function showDrawTools() {
    document.getElementById("drawTools").style.removeProperty("display");
}
//#endregion
//#region tests
let testFunction = () => {
    test2();
};
function test2() {
    //fill in random color
    const color = randomColor();
    data.colorAll(color);
    renderer.draw(data);
    // console.log(data.encode("pf1"));
}
function test1() {
    //log pf1-encoded tableData
    console.log(data.encode("pf1"));
    renderer.clearTable();
}
function randomColor() {
    const r = (Math.floor(Math.random() * 255).toString(16)).padStart(2, "0");
    const g = (Math.floor(Math.random() * 255).toString(16)).padStart(2, "0");
    const b = (Math.floor(Math.random() * 255).toString(16)).padStart(2, "0");
    return "#" + r + g + b;
}
//#endregion
//#region drawing table
function colorCell(cell, color) {
    let cellIdx = [cell.parentElement.rowIndex, cell.cellIndex];
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
    const stringData = fileContent;
    if (!stringData) {
        console.log("fileContent has not been read successfully");
        return;
    }
    const jsonData = JSON.parse(stringData);
    data.fromJson(jsonData);
    renderer.draw(data);
}
function tableMouseDown(ev) {
    //0. for now just log the cell
    //depending on what tool is chosen, do something
    const cell = ev.target.closest("td");
    if (!cell) {
        return;
    }
    //todo: right Click only
    switch (toolsMode) {
        case Tools.None:
            console.log("clicked cell: row: " + cell.parentElement.rowIndex + "; cell: " + cell.cellIndex);
            break;
        case Tools.Draw:
            drawToolsPenActivated(cell);
            break;
        default:
            break;
    }
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
function readInputFile() {
    //read the content of file selected in input (json only) as a string
    //loads the content to global fileContent
    //call on fileInput's change
    let files = document.getElementById("imgInput").files;
    if (files === null) {
        return null;
    }
    const file = files[0];
    // setting a breakpoint inside onload can be reached, but breaking outside and trying to step in does not work ??
    if (file) {
        const reader = new FileReader;
        reader.onload = () => {
            const content = reader.result;
            fileContent = content;
        };
        reader.readAsText(file);
    }
}
function getInputColor(inputId) {
    return document.getElementById(inputId).value;
}
function getInputString(inputId) {
    //return value of input element by id
    let input;
    input = document.getElementById(inputId);
    return (!!input) ? input.value.trim() : "";
}
function getInputNumber(inputId) {
    //returns value of input element by id
    //returns 0 if input's value is not numeric
    let inputValue = getInputString(inputId);
    return isNumeric(inputValue) ? +inputValue : 0;
}
function isNumeric(s) {
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
function enforceInputNumber() {
    //enforces, that value of input this, is not below its min, or above its max value
    //enforces, that only a numeric (integer) string can be entered
    let that = this;
    const min = (that.min !== "") ? +that.min : 0;
    const max = (that.max !== "") ? +that.max : 1e10; //Number.MAX_VALUE;
    let curInput = that.value; //value non-numeric --> curInput = ""
    that.value = (curInput === "") ? min.toString() : Math.min(max, Math.max(min, +curInput)).toString();
}
//#endregion
//# sourceMappingURL=main.js.map