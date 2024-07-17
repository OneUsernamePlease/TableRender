"use strict";
class Pixel {
    constructor(color = "#000000") {
        this.color = color;
        this._color = this.color;
    }
    set color(hexCode) {
        //if hexCode is not a valid rgb hex code, this.color is set to #000000
        this._color = /^#?[0-9a-f]{6}$/i.test(hexCode) ? hexCode : "#000000";
    }
    get color() {
        return this._color;
    }
}
//# sourceMappingURL=pixel.js.map