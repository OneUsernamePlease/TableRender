"use strict";
/* TODO
get rid of height, width property of tableData
in tableData, create a second table, same size, of booleans, keeping track of whether a cell was updated. then use this info when drawing
img format enums and interfaces
*/
//#region initialisation
let tableContainerId = "tableContainer";
let data;
let renderer;
let fileContent;
document.addEventListener("DOMContentLoaded", initialise);
function initialise() {
    var _a, _b, _c, _d, _e, _f;
    (_a = document.getElementById("testBtn")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", testFunction);
    (_b = document.getElementById("btnGenerateTable")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", regenerateTable);
    (_c = document.getElementById("save")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", save);
    (_d = document.getElementById("btnDisplayFile")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", displayFile);
    (_e = document.getElementById("imgInput")) === null || _e === void 0 ? void 0 : _e.addEventListener("change", readInputFile);
    (_f = document.getElementById("tableWidthInput")) === null || _f === void 0 ? void 0 : _f.addEventListener("keyup", enforceInputNumber);
    data = new TableData(getInputNumber("tableHeightInput"), getInputNumber("tableWidthInput"));
    renderer = new TableRender(tableContainerId);
    renderer.draw(data);
    readInputFile();
    document.removeEventListener("DOMContentLoaded", initialise);
}
//#endregion
//#region tests
let testFunction = () => { test2(); };
function test2() {
    //fill in random color
    data.colorAll("#" + Math.floor(Math.random() * 16777215).toString(16));
    renderer.draw(data);
    console.log(data.encode("pf1"));
}
function test1() {
    //log pf1-encoded tableData
    console.log(data.encode("pf1"));
    renderer.clearTable();
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
    const stringData = fileContent;
    if (!stringData) {
        console.log("fileContent has not been read successfully");
        return;
    }
    const jsonData = JSON.parse(stringData);
    data.fromJson(jsonData);
    renderer.draw(data);
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
    const color0 = data.getPixel(0, 0).color;
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
            console.log(content);
            fileContent = content;
        };
        reader.readAsText(file);
    }
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
    return ((!isNaN(+s)) && s.length !== 0) ? true : false;
    //what? -->
    //+stringA converts stringA to number, if stringA is not numeric result = NaN, if it is numeric, result is stringA as number. "!isNan(+stringA)" is true if stringA is numeric, otherwise false
}
function enforceInputNumber() {
    //enforces, that value of input this, is not below its min, or above its max value
    //enforces, that only a numeric (integer) string can be entered
    let that = this;
    const min = (that.min !== "") ? +that.min : Number.MIN_VALUE;
    const max = (that.max !== "") ? +that.max : Number.MAX_VALUE;
    let curInput = that.value; //value non-numeric --> curInput = ""
    //while (curInput !== "" && !isNumeric(curInput.slice(-1))) {
    //    curInput = curInput.slice(0, -1);
    //}
    that.value = (curInput === "") ? min.toString() : Math.min(max, Math.max(min, +curInput)).toString();
}
//#endregion
//# sourceMappingURL=main.js.map