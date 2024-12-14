"use strict";
class Pixel {
    constructor(color = "") {
        this.color = color;
        this._color = this.color;
    }
    set color(newColor) {
        //if hexCode is not a valid rgb hex code, this.color is set to #000000
        if (typeof (newColor) === "string") {
            this._color = /(^#?[0-9a-f]{6}$)|(^\s*$)/i.test(newColor) ? newColor : "#000000";
        }
        else if (typeof (newColor) === "number") {
            this._color = Math.max(0, Math.min(newColor, 16777216));
        }
    }
    get color() {
        return this._color;
    }
}
//# sourceMappingURL=pixel.js.map