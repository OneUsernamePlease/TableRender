class Pixel {
    private _color: string | number;
    public constructor(color: number | string = "") {
        this.color = color;
        this._color = this.color;
    }
    public set color(newColor: number | string) {
    //if hexCode is not a valid rgb hex code, this.color is set to #000000
        if (typeof(newColor) === "string") {
            this._color = /(^#?[0-9a-f]{6}$)|(^\s*$)/i.test(newColor) ? newColor : "#000000";
        } else if (typeof(newColor) === "number") {
            this._color = JSFunctions.ensureNumberInRange(newColor, 0 /*COLOR_CONSTANTS.COLOR_INT_MIN*/, 16777215 /*COLOR_CONSTANTS.COLOR_INT_MAX*/);
        }
    }
    public get color() {
        return this._color;
    }
}