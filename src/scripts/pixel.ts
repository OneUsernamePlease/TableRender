/*
export module???
RGB ( red, green, blue ) = 65536 * Blue + 256 * Green + Red
*/
class Pixel {
        private color: string;

        public constructor(color: string = "#000000") {
            this.color = color;
        }

        public setColor(hexCode: string) {
        //if hexCode is not a valid rgb hex code, this.color is set to #000000
        this.color = /^#?[0-9a-f]{6}$/i.test(hexCode) ? hexCode : "#000000"
        //having to do this check, everytime a pixel "changes" is going to be very expensive.
        //maybe do this somewhere else and also more efficient
        }

        public getColor() {
            return this.color;
        }
    }