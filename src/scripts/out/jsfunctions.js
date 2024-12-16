"use strict";
//import { COLOR_CONSTANTS } from "../const/generalConst";
class JSFunctions {
    /*
    Just Some functions
    (hopefully moderately helpful)
    */
    constructor() { } //to prevent instantiation
    //#region color stuff
    static normalizeColor(testColor) {
        let valid = /^#?[0-9A-F]{6}$/i.test(testColor) || /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/i.test(testColor);
        return valid ? testColor : "#000000";
    }
    /**
     * transforms color-value in rgb format (e.g. rgb(170,187,204)) to hex format (e.g. #aabbcc).
     * @param rgb string rgb-color of format
     * @returns hex representation rgb. "" if rgb is not of a valid format
     */
    static colorRgbToHex(rgb) {
        if (/^#?[0-9A-F]{6}$/i.test(rgb))
            return rgb;
        if (!(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/i.test(rgb)))
            return "";
        let rgbValues = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/i);
        return "#" + JSFunctions.decimalToHex(rgbValues[1]) + JSFunctions.decimalToHex(rgbValues[2]) + JSFunctions.decimalToHex(rgbValues[3]);
    }
    static colorRgbIntToHex(colorInt) {
        colorInt = this.ensureNumberInRange(colorInt, 0 /*COLOR_CONSTANTS.COLOR_INT_MIN*/, 16777215 /*COLOR_CONSTANTS.COLOR_INT_MAX*/);
        let r = Math.floor(colorInt % 256);
        colorInt /= 256;
        let g = Math.floor(colorInt % 256);
        colorInt /= 256;
        let b = Math.floor(colorInt % 256);
        let hex = "#" + this.decimalToHex(r).padStart(2, "0") + this.decimalToHex(g).padStart(2, "0") + this.decimalToHex(b).padStart(2, "0");
        return hex;
    }
    static colorHexToRgbInt(colorHex) {
        let colorInt = 0;
        let validHex = /^#?[0-9A-F]{6}$/i.test(colorHex);
        if (!validHex) {
            return colorInt;
        }
        colorHex = this.removeLeadingChar(colorHex, "#");
        let rHex = colorHex.slice(0, 2);
        let gHex = colorHex.slice(2, 4);
        let bHex = colorHex.slice(4);
        colorInt = this.calculateRgbInt(this.hexToDecimal(rHex), this.hexToDecimal(gHex), this.hexToDecimal(bHex));
        return colorInt;
    }
    static calculateRgbInt(r, g, b) {
        r = this.ensureNumberInRange(r, 0, 255);
        g = this.ensureNumberInRange(g, 0, 255);
        b = this.ensureNumberInRange(b, 0, 255);
        return r + (256 * g) + (65536 * b);
    }
    //#endregion
    //#region math stuff
    /**
     * empty string is NOT considered numeric
     * @param s the string to be examined
     * @returns true if s is a valid number, returns false otherwise
     */
    static isNumeric(s) {
        s = s.trim();
        return (!isNaN(+s)) && s.length !== 0;
    }
    /**
     * returns "", if d is a non-numeric string
     */
    static decimalToHex(d) {
        if (typeof (d) === "string") {
            if (this.isNumeric(d)) {
                d = parseInt(d);
            }
            return "";
        }
        return d.toString(16);
    }
    /**
     * converts a hexadecimal-number-string to a decimal number and returns it
     * @returns 0 if hex is not a valid hexadecimal number
     */
    static hexToDecimal(hex) {
        const prefix = "0x";
        if (!(hex.startsWith(prefix))) {
            hex = prefix + hex;
        }
        const num = Number(hex);
        const valid = !isNaN(num);
        return valid ? num : 0;
    }
    /**
     * ensures min <= n <= max (Inclusive!)
     * @param n number to test against upper and lower bounds
     * @param min the lowest allowed value for n
     * @param max the highest allowed value for n
     * @returns n if n satisfies min <= n <= max, otherwise min or max are returned
     */
    static ensureNumberInRange(n, min, max) {
        return Math.max(min, Math.min(n, max));
    }
    //#endregion
    //#region string stuff
    /**
     * Removes all occurrences of charToRemove from the beginning of str
     * @param str the string to be modified
     * @param charToRemove ***optional*** if a string longer than 1 is provided, its first character is used. If no value is provided the first character of str is used.
     */
    static removeLeadingChar(str, charToRemove) {
        if (str.length < 1) {
            return "";
        }
        if (charToRemove === undefined) {
            charToRemove = str[0];
        }
        while (str.startsWith(charToRemove)) {
            str = str.slice(charToRemove.length);
        }
        return str;
    }
}
//# sourceMappingURL=jsfunctions.js.map