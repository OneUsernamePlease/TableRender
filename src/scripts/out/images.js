"use strict";
class Images {
    /*
    This thing should at one point encode and decode images
    */
    //#region decode
    static fromBMP(bitmap) {
        if (!!bitmap) {
            return null;
        }
        let tableData = new TableData();
        return tableData;
    }
    //#endregion
    //#region todo ...
    /*
    move all the encoding stuff to here
    
    */
    encodeTableData(type) {
        switch (type.toLowerCase().trim()) {
            case "pf1":
                break;
            default:
                break;
        }
    }
}
//# sourceMappingURL=images.js.map