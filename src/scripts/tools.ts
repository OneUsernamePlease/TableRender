//these tools should really be part of the renderer
enum Tools {
    None,
    Draw
}
enum DrawTools {
    Pen = 1
}

//#region general tools handling
/**
 * hide/show specific tools, according to current selection
 * TODO: dont use queryselector, but either this or ev args
 */
function setToolMode() {
    let mode = (<HTMLInputElement>document.querySelector('input[name="tools"]:checked')).value;
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
    document.getElementById("drawTools")!.style.display = "none";
}
function showDrawTools() {
    document.getElementById("drawTools")!.style.removeProperty("display");
}
function activateDrawTools() {
    document.getElementById("drawToolsColorPicker")?.addEventListener("change", updateSelectedColor);
    
    document.getElementById(renderer.elementId)?.addEventListener("mousedown", tableMouseDown);
    document.getElementById(renderer.elementId)?.addEventListener("mouseup", tableMouseUp);
    document.getElementById(renderer.elementId)?.addEventListener("mousemove", tableMouseMove);
    document.getElementById(renderer.elementId)?.addEventListener("mouseleave", () => {tableLMouseDownState = false});

    //touch screen -> callbacks need to allow TouchEvent too. either extend function or make new ones. problem for future me
    //document.getElementById(renderer.elementId)?.addEventListener("touchstart", tableMouseDown);
    //document.getElementById(renderer.elementId)?.addEventListener("touchend", tableMouseUp);
    //document.getElementById(renderer.elementId)?.addEventListener("touchmove", tableMouseMove);
    //document.getElementById(renderer.elementId)?.addEventListener("mouseleave", () => {tableLMouseDownState = false});
    showDrawTools();
}
function deactivateDrawTools() {
    document.getElementById("drawToolsColorPicker")?.removeEventListener("change", updateSelectedColor);
    document.getElementById(renderer.elementId)?.removeEventListener("mousedown", tableMouseDown);
    document.getElementById(renderer.elementId)?.removeEventListener("mouseup", tableMouseUp);
    document.getElementById(renderer.elementId)?.removeEventListener("mousemove", tableMouseMove);
    document.getElementById(renderer.elementId)?.removeEventListener("mouseleave", () => {tableLMouseDownState = false});
    hideDrawTools();
}
//#endregion

//#region Handling Mouse Events for table
function tableMouseDown(this: HTMLElement, ev: MouseEvent) {
    //depending on what tool is selected, do something
    const cell: HTMLTableCellElement | null = (<Element>ev.target).closest("td");
    if (!cell) return;
    if (ev.button !== 0) return;

    tableLMouseDownState = true;
    switch (toolsMode) {   
        case Tools.Draw:
            drawToolsPen(cell);
            break;

        default:
            break;
    }
}
function tableMouseMove(this: HTMLElement, ev: Event) {
    //depending on what tool is selected, do something
    const cell: HTMLTableCellElement | null = (<Element>ev.target).closest("td");
    if (!cell) return;
    if (!tableLMouseDownState) return;
    switch (toolsMode) {
        case Tools.Draw:
            drawToolsPen(cell);
            break;

        default:
            break;
    }
}
function tableMouseUp(this: HTMLElement, ev: MouseEvent) {
    //call on MouseUp inside htmlTable, and mouseLeave htmlTable
    //sets tableMouseDownState (which keeps track of lmb being down in htmlTable) to false
    if (ev.button !== 0) return;
    tableLMouseDownState = false;
}

//#endregion


//#region DRAW (mr paint)
/**
 * 
 * @param cell HTMLTableCellElement
 */
function drawToolsPen(cell: HTMLTableCellElement) {
    //add radius, all cells (partially) within the radius get colored
    colorCell(cell, inputColor);
}
function randomColor(): string {
    const r = (Math.floor(Math.random() * 255).toString(16)).padStart(2, "0");
    const g = (Math.floor(Math.random() * 255).toString(16)).padStart(2, "0");
    const b = (Math.floor(Math.random() * 255).toString(16)).padStart(2, "0");
    return "#" + r+g+b
}
function colorCell(cell: HTMLTableCellElement, color: string) {
    //for use in drawing (ie pen), when we want to set tabledata instead of drawing from tabledata
    let cellIdx: [row: number, col: number] = [(<HTMLTableRowElement>cell.parentElement).rowIndex, cell.cellIndex];
    renderer.setColor(cell, color);
    data.setPixelColor(cellIdx[0], cellIdx[1], color);
//REFACTOR:
/*
- set the color in data, and draw the result - probably much slower tho
- dont set set both values, but only one and tell the renderer to update the data
*/


}



//#endregion