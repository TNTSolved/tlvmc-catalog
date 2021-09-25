define(['messageObject'], function (messageObject) {
    
    var sessionObject = function (sessionInstance) {
        if(sessionInstance == undefined)
        {
            var sessionDate = new Date(); //This is now
            this.dateString = sessionDate.toLocaleDateString();
            this.dateDay = sessionDate.getDay();
            this.dateMonth = sessionDate.getMonth();
            this.dateFullYear = sessionDate.getFullYear();
            this.dateMillisTime = sessionDate.getTime();
            this.messages = [];    
        }
        else
        {
            this.dateString = sessionInstance.dateString;
            this.dateDay = sessionInstance.dateDay;
            this.dateMonth = sessionInstance.dateMonth;
            this.dateFullYear = sessionInstance.dateFullYear;
            this.dateMillisTime = sessionInstance.dateMillisTime;
            this.messages = sessionInstance.messages;          
        }
    };
    sessionObject.prototype.addMessageToSession = function (from, msg, options) {
        var messageToAdd = new messageObject(from, msg, options);
        this.messages.push(messageToAdd);
    };

    sessionObject.prototype.removeLastMessage = function () {
        this.messages.pop();
    }

    return sessionObject;
});