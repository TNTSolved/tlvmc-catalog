define([], function () {



    var LanguageManager = function () { };

    LanguageManager.prototype.language = Object.freeze(
        {
            "EN": "englishConstants",
            "HE": "hebrewConstants",
            "AR": "englishConstants",
            "FR": "englishConstants"
        });
    //should be standardized. function should not be called hebrew, just constants.

    return new LanguageManager();

});