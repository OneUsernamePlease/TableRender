"use strict";
//these tools should really be part of the renderer
var Tools;
(function (Tools) {
    Tools[Tools["None"] = 0] = "None";
    Tools[Tools["Draw"] = 1] = "Draw";
})(Tools || (Tools = {}));
var DrawTools;
(function (DrawTools) {
    DrawTools[DrawTools["Pen"] = 1] = "Pen";
})(DrawTools || (DrawTools = {}));
//#region general tools handling
/**
 * hide/show specific tools, according to current selection
 * TODO: dont use queryselector, but either this or ev args
 */
function setToolMode() {
    let mode = document.querySelector('input[name="tools"]:checked').value;
    switch (mode) {
        case "draw":
            toolsMode = Tools.Draw;
            activateDrawTools();
            break;
        case "none":
            toolsMode = Tools.None;
            deactivateDrawTools();
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
function activateDrawTools() {
    showDrawTools();
}
function deactivateDrawTools() {
    hideDrawTools();
}
//#endregion
//#region DRAW (mr paint)
/**
 *
 * @param cell HTMLTableCellElement
 */
function drawToolsPen(cell) {
    //add radius, all cells (partially) within the radius get colored
    colorCell(cell, inputColor);
}
function randomColor() {
    const r = (Math.floor(Math.random() * 255).toString(16)).padStart(2, "0");
    const g = (Math.floor(Math.random() * 255).toString(16)).padStart(2, "0");
    const b = (Math.floor(Math.random() * 255).toString(16)).padStart(2, "0");
    return "#" + r + g + b;
}
function colorCell(cell, color) {
    //for use in drawing (ie pen), when we want to set tabledata instead of drawing from tabledata
    let cellIdx = [cell.parentElement.rowIndex, cell.cellIndex];
    renderer.setColor(cell, color);
    data.setPixelColor(cellIdx[0], cellIdx[1], color);
    //REFACTOR:
    /*
    - set the color in data, and draw the result - probably much slower tho
    - dont set set both values, but only one and tell the renderer to update the data
    */
}
//#endregion
//# sourceMappingURL=tools.js.map