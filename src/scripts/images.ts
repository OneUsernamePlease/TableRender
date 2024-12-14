class Images {
    /*
    This thing should at one point encode and decode images
    */


//#region decode
    public static fromBMP(bitmap: Blob): TableData | null {
        if (!!bitmap) { return null; }


        let tableData = new TableData();





        return tableData;
    }
//#endregion

//#region todo ...
/*
move all the encoding stuff to here

*/


    public encodeTableData(type: string) {
        switch (type.toLowerCase().trim()) {
            case "pf1":

                break;  
            default:
                break;
        }
    }
//#endregion

}