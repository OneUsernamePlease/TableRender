class Pixel {
        private _color: string;

        public constructor(color: string = "#000000") {
            this.color = color;
            this._color = this.color;
        }

        public set color(hexCode: string) {
        //if hexCode is not a valid rgb hex code, this.color is set to #000000
        this._color = /^#?[0-9a-f]{6}$/i.test(hexCode) ? hexCode : "#000000"

        }

        public get color() {
            return this._color;
        }
    }