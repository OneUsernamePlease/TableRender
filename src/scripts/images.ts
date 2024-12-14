class Images {
    /*
    This thing should at one point encode and decode images
    */

    private _data: Blob | null;
    private _tableData: TableData | null;

    constructor(data: Blob | TableData) {
        if (data instanceof Blob) {
            this._data = data;
            this._tableData = null;
        } else if (data instanceof TableData) {
            this._tableData = data;
            this._data = null;
        } else {
            this._data = null;
            this._tableData = null;
        }
    }
    

}