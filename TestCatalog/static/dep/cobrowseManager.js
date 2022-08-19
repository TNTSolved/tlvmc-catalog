define([], function () {

    var html2canvas;
    var options;

    var CobrowseManager = function () {
        window.cobrowseManager = this;
    };


    CobrowseManager.prototype.init = function (callback) {
        options = {
        };
        if (!html2canvas) {
            require(['html2canvas'], function (h2c) {
                html2canvas = h2c;
                if (callback)
                    callback();
            });
        }
        if (callback)
            callback();
    };

    CobrowseManager.prototype.Capture = function (element, callback) {
        if (html2canvas) {
            options.height = window.innerHeight;
            options.width = window.innerWidth;
            options.y = window.scrollY;
            options.x = window.scrollX;
            var cap = html2canvas(element, options);
            cap.then(this.onRender(callback));
        }
    };

    CobrowseManager.prototype.onRender = function (callback) {
        return function (canvas) {
            var dataUrl = canvas.toDataURL("image/jpeg", 0.8);
            if (callback)
                callback(canvas, dataUrl);
        };
    };


    CobrowseManager.prototype.startCobrowse = function () {
        cobrowseManager.init(function () {
            cobrowseManager.Capture(document.body, function (c, i) {
                myHub.server.cBFullPage(i);
            });
        });
    };

    return new CobrowseManager();

});