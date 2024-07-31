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




//#endregion