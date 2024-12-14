"use strict";
class JSFunctions {
    /*
    Just Some functions
    (hopefully moderatly helpful)
    */
    constructor() { } //to prevent instatiation
    static normalizeColor(testColor) {
        let valid = /^#?[0-9A-F]{6}$/i.test(testColor) || /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/i.test(testColor);
        return valid ? testColor : "#000000";
    }
    static rgbIntToHex(color) {
        throw new Error("Method not implemented.");
    }
}
//# sourceMappingURL=jsfunctions.js.map