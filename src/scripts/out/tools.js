"use strict";
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
//#endregion
//# sourceMappingURL=tools.js.map