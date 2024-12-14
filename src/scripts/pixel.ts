class Pixel {
    private _color: string;
    public constructor(color: string = "") {
        this.color = color;
        this._color = this.color;
    }
    public set color(hexCode: string) {
    //if hexCode is not a valid rgb hex code, this.color is set to #000000
    hexCode = hexCode.trim();
    this._color = /(^#\?[0-9a-f]{6}$)|(^\s*$)/i.test(hexCode) ? hexCode : "#000000"
    }
    public get color() {
        return this._color;
    }
}