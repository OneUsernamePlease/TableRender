abstract class Functions {
    /*
    Just Some functions
    (moderatly helpful)
    */

    public normalizeColor(testColor: string): string {
        let valid = /^#?[0-9A-F]{6}$/i.test(testColor) || /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/i.test(testColor);
        return valid ? testColor : "#000000";
    }

}