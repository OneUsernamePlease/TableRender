//these tools should really be part of the renderer
let selectedColor: string; //use this variable instead of calling getInputColor(...) all the damn time
enum Tools {
    None,
    Draw
}
enum DrawTools {
    Pen = 1
}

//#region DRAW (mr paint)

function drawToolsPen(cell: HTMLTableCellElement) {
    //1. color the cell with chosen color --> OK
    //2. color all cells the mouse hovers over while mouseDown
    //3. add radius, all cells (partially) within the radius get colored
    let color: string = getInputColor("drawToolsColorPicker");
    colorCell(cell, color);
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