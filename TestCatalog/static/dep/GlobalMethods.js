define([], function () {

    function GlobalMethods() {
        this.chatKey = "lcsk-chatId";
    };

    GlobalMethods.prototype.setChatId = function (chatId) {

        this.chatKey = chatId;
        if (this.hasStorage()) {
            sessionStorage.setItem(this.chatKey, chatId);
        }
    }


    GlobalMethods.prototype.hasStorage = function () {
        return typeof (Storage) !== 'undefined';
    }

    GlobalMethods.prototype.isIosDevice = function () {
        
        var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        
        return iOS;

    }

    return new GlobalMethods();

})