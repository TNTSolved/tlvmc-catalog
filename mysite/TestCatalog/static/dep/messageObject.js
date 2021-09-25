define([], function () {
    var messageObject = function (from, msg, options) {
        this.from = from;
        this.msg = msg;
        this.options = options;
    };

    return messageObject;
});