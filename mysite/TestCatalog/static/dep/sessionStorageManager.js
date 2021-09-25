define(['sessionObject', 'viewHelper'], function (sessionObject, viewHelper) {
    function sessionStorageManager() {
        var _sessionsToReload = 3; // not in use
        var _sessions = [];
        var _inited = false;
        var _loaded = false;

        this.initialize = function () {
            if (_inited)
                return;

            if (localStorage.getItem("sChatSessions_" + simpleChat.clientId || "")) {
                var json = localStorage.getItem("sChatSessions_" + simpleChat.clientId || "");
                var savedMessageHistory = JSON.parse(json);
                _sessions = savedMessageHistory;
                _inited = true;
            }
        }

        this.deleteSessionHistory = function () {
            _sessions = [];
            saveSessions();
        }

        this.loadPreviousChats = function () {
            if (_loaded)
                return;

            this.initialize();

            if (_sessions.length > _sessionsToReload) {
                _sessions = _sessions.slice(_sessions.length - sessionsToReload, _sessionsToReload);
            }

            var allMessages = [];
            for (var i = 0; i < _sessions.length; i++) {
                var currentSession = new sessionObject(_sessions[i]);
                for (var j = 0; j < currentSession.messages.length; j++) {
                    allMessages.push(currentSession.messages[j]);
                }
            }

            for (var i = 0; i < allMessages.length; i++) {
                var msg = allMessages[i];
                if (i + 1 == allMessages.length && msg.options) {// if the last answer is selectable we would like to skip it and remove it for forther loading
                    removeLastMessage();
                    return;
                }

                if (msg.from == "me") {
                    viewHelper.addOutgoingMessage(msg.msg);
                }
                else {
                    var selectedOption;
                    if (msg.options) {
                        var nextMessage = allMessages[i + 1];
                        selectedOption = viewHelper.removeMessageTime(nextMessage.msg);
                    }

                    if (msg.options && msg.options[0].ID) { // if options are rich text we dont want to show them again
                        viewHelper.addIncomingMessage(msg.msg, null, msg.from);
                    } else {
                        viewHelper.addIncomingMessage(msg.msg, msg.options, msg.from, null, selectedOption);
                    }
                }
            }
            simpleChat.scrollToBottomImmediate();
            _loaded = true;
        };

        this.setSessionId = function (sessionIdToSet) {
            localStorage.setItem("sChatSessionId", sessionIdToSet);
        };

        this.getSessionId = function (callbackFunction) {
            var sChatSessionId = null;
            sChatSessionId = localStorage.getItem("sChatSessionId");
            callbackFunction(sChatSessionId);
        }

        this.addMessage = function (from, text, options) {
            var currentSession = getCurrentSession();
            currentSession.addMessageToSession(from, text, options);
            saveSessions();
        };

        function removeLastMessage() {
            var currentSession = getCurrentSession();
            currentSession.removeLastMessage();
            saveSessions();
        }

        function saveSessions() {
            var json = JSON.stringify(_sessions);
            localStorage.setItem('sChatSessions_' + simpleChat.clientId, json);
        }

        function getCurrentSession() {
            var currentSession;
            var currentDate = new Date(); //This is now
            //This is the returnable
            //if initialized 
            if (_sessions.length > 0) {
                //then the last entry is the last session
                var lastSession = _sessions[_sessions.length - 1];
                //and if the last entry has the same date as today 
                if (true /*lastSession.dateString == currentDate.toLocaleDateString()*/) { // no multiple sessions suppurt, otherwise change the condition
                    //then we should return the last entry, as the current
                    currentSession = new sessionObject(lastSession);
                }
                else {
                    //otherwise, if last entry was on a different day, set a new session as the returnable
                    currentSession = new sessionObject();
                    _sessions.push(currentSession);
                }
            }
            else {
                //if there werent any previous sessions (not initialized)
                //set a new sess ion as the returnable
                currentSession = new sessionObject();
                //and add it to our session list
                _sessions.push(currentSession);
            }
            //and finally, return the session for furthor use
            return currentSession;
        };
    }
      
    return new sessionStorageManager();
});