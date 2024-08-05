"use strict";
//these tools should really be part of the renderer
let selectedColor; //use this variable instead of calling getInputColor(...) all the damn time
var Tools;
(function (Tools) {
    Tools[Tools["None"] = 0] = "None";
    Tools[Tools["Draw"] = 1] = "Draw";
})(Tools || (Tools = {}));
var DrawTools;
(function (DrawTools) {
    DrawTools[DrawTools["Pen"] = 1] = "Pen";
})(DrawTools || (DrawTools = {}));
//#region DRAW (mr paint)
function drawToolsPen(cell) {
    //1. color the cell with chosen color --> OK
    //2. color all cells the mouse hovers over while mouseDown
    //3. add radius, all cells (partially) within the radius get colored
    let color = getInputColor("drawToolsColorPicker");
    colorCell(cell, color);
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