document.addEventListener("DOMContentLoaded", initialise);

function initialise() {
    generateTable("tableContainer")
}

//+++++
let tableId = "mainTable";
//+++++

function generateTable(tableContainerId: string) {
    removeTable(tableId);

    let cellClassName = "pixel";
    let table = document.createElement("table")
    let row = document.createElement("tr")
    let cell = document.createElement("td")
    table.setAttribute("id", tableId);
    cell.classList.add(cellClassName);
    row.appendChild(cell);
    table.appendChild(row);
    document.getElementById(tableContainerId)!.appendChild(table);
}

function removeTable(tableId: string) {
    document.getElementById(tableId)?.remove();
}

