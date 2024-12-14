class JSFunctions {
    /*
    Just Some functions
    (hopefully moderately helpful)
    */
   
   private constructor () {} //to prevent instantiation
   
   public static normalizeColor(testColor: string): string {
       let valid = /^#?[0-9A-F]{6}$/i.test(testColor) || /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/i.test(testColor);
       return valid ? testColor : "#000000";
    }
    public static rgbToHex(rgb: string): string {
        //transforms color-value rgb of form 'rgb(0,128,255)' to hex form '#0080ff' and returns it
        if (/^#?[0-9A-F]{6}$/i.test(rgb)) return rgb;
        if (!(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/i.test(rgb))) return "";
        let rgbValues = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/i);
        let decToHex = (d: string|number): string => {
            if (typeof(d) === "string" && /^\d+$/.test(d)) {
                d = parseInt(d);
            }
            return d.toString(16);
        }
        return "#" + decToHex(rgbValues![1]) + decToHex(rgbValues![2]) + decToHex(rgbValues![3]); 
    }

    public static rgbIntToHex(color: number): string {
        throw new Error("Method not implemented.");
    }
    
    
}