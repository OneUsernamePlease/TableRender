"use strict";
class JSFunctions {
    /*
    Just Some functions
    (hopefully moderately helpful)
    */
    constructor() { } //to prevent instantiation
    static normalizeColor(testColor) {
        let valid = /^#?[0-9A-F]{6}$/i.test(testColor) || /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/i.test(testColor);
        return valid ? testColor : "#000000";
    }
    static rgbToHex(rgb) {
        //transforms color-value rgb of form 'rgb(0,128,255)' to hex form '#0080ff' and returns it
        if (/^#?[0-9A-F]{6}$/i.test(rgb))
            return rgb;
        if (!(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/i.test(rgb)))
            return "";
        let rgbValues = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/i);
        let decToHex = (d) => {
            if (typeof (d) === "string" && /^\d+$/.test(d)) {
                d = parseInt(d);
            }
            return d.toString(16);
        };
        return "#" + decToHex(rgbValues[1]) + decToHex(rgbValues[2]) + decToHex(rgbValues[3]);
    }
    static rgbIntToHex(color) {
        throw new Error("Method not implemented.");
    }
}
//# sourceMappingURL=jsfunctions.js.map