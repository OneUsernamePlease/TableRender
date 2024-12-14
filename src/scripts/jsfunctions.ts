class JSFunctions {
    /*
    Just Some functions
    (hopefully moderatly helpful)
    */
   
   private constructor () {} //to prevent instatiation
   
   public static normalizeColor(testColor: string): string {
       let valid = /^#?[0-9A-F]{6}$/i.test(testColor) || /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/i.test(testColor);
       return valid ? testColor : "#000000";
    }
    public static rgbIntToHex(color: number): string {
        throw new Error("Method not implemented.");
    }
    
    
}