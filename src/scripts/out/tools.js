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
    var _a, _b, _c, _d, _e;
    (_a = document.getElementById("drawToolsColorPicker")) === null || _a === void 0 ? void 0 : _a.addEventListener("change", updateSelectedColor);
    (_b = document.getElementById(renderer.elementId)) === null || _b === void 0 ? void 0 : _b.addEventListener("mousedown", tableMouseDown);
    (_c = document.getElementById(renderer.elementId)) === null || _c === void 0 ? void 0 : _c.addEventListener("mouseup", tableMouseUp);
    (_d = document.getElementById(renderer.elementId)) === null || _d === void 0 ? void 0 : _d.addEventListener("mousemove", tableMouseMove);
    (_e = document.getElementById(renderer.elementId)) === null || _e === void 0 ? void 0 : _e.addEventListener("mouseleave", () => { tableLMouseDownState = false; });
    //touch screen -> callbacks need to allow TouchEvent too. either extend function or make new ones. problem for future me
    //document.getElementById(renderer.elementId)?.addEventListener("touchstart", tableMouseDown);
    //document.getElementById(renderer.elementId)?.addEventListener("touchend", tableMouseUp);
    //document.getElementById(renderer.elementId)?.addEventListener("touchmove", tableMouseMove);
    //document.getElementById(renderer.elementId)?.addEventListener("mouseleave", () => {tableLMouseDownState = false});
    showDrawTools();
}
function deactivateDrawTools() {
    var _a, _b, _c, _d, _e;
    (_a = document.getElementById("drawToolsColorPicker")) === null || _a === void 0 ? void 0 : _a.removeEventListener("change", updateSelectedColor);
    (_b = document.getElementById(renderer.elementId)) === null || _b === void 0 ? void 0 : _b.removeEventListener("mousedown", tableMouseDown);
    (_c = document.getElementById(renderer.elementId)) === null || _c === void 0 ? void 0 : _c.removeEventListener("mouseup", tableMouseUp);
    (_d = document.getElementById(renderer.elementId)) === null || _d === void 0 ? void 0 : _d.removeEventListener("mousemove", tableMouseMove);
    (_e = document.getElementById(renderer.elementId)) === null || _e === void 0 ? void 0 : _e.removeEventListener("mouseleave", () => { tableLMouseDownState = false; });
    hideDrawTools();
}
//#endregion
//#region Handling Mouse Events for table
function tableMouseDown(ev) {
    //depending on what tool is selected, do something
    const cell = ev.target.closest("td");
    if (!cell)
        return;
    if (ev.button !== 0)
        return;
    tableLMouseDownState = true;
    switch (toolsMode) {
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