class Images {
    /*
    This thing should at one point encode and decode images
    */


//#region decode
/**
 * For now this should work for: (coming soon tho)
 *  bottom-up 24-bit bmps  
 *  */
    public static fromBMP(bitmap: Blob): TableData | null {
        
        
        throw new Error("Method not implemented.");
        
        if (!!bitmap) { return null; }


        let tableData = new TableData();





        return tableData;
    }
    public static fromJson(json: {imgdata: string[][], format?: string}): TableData {
        //load from json (has to be pf1), and draw
        let data = json.imgdata;
        let height = Math.max(data.length, 1);
        let widths: number[] = data.map((x) => x.length); //get array of the string-arrays' lengths in imgdata
        let width = Math.max(...widths, 1);
        
        let tableData = new TableData(height, width);
        for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {
                tableData.setPixelColor(i, j, data[i][j]);
            };
            
        }
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