define(['GlobalMethods', 'sessionStorageManager', 'viewHelper'], function (GlobalMethods, sessionStorageManager, viewHelper) {

    function SignalrHub() {
        this.hub = {}
    };

    SignalrHub.prototype.registerHubMethods = function () {

        this.hub.client.setChat = function (id, agentName, existing, disableAttachments) {

            GlobalMethods.setChatId(id);
            sessionStorageManager.getSessionId(function (currentStoredSessionId) {
                if (currentStoredSessionId == undefined || currentStoredSessionId == "") {
                    sessionStorageManager.setSessionId(id);
                }
            });

            if (disableAttachments)
                $(".simplechat-ic_file").hide();
            else
                $(".simplechat-ic_file").show();

            if (this.existing) {
                if (SignalrHubInstance.isChatOpen()) {
                    toggleChatBox();
                }
            }
        }

        this.hub.client.setTyping = function () {
            $('<div class="messageTyping"></div>').appendTo($('.chat-container .mCSB_container'));
            window.SignalrHubInstance.scrollToBottomFaded();
        }

        this.hub.client.setPaused = function () {
            $('.messageTyping').remove();
        }

        this.hub.client.startCobrowse = function () {
            window.simpleChat.cobrowseManager.startCobrowse();
        }

        this.hub.client.requestCaptcha = function (msg) {
            window.simpleChat.doRecaptcha($(".message-personal").last(), function (response) {
                myHub.server.send(msg, response);
            });
        }

        this.hub.client.addMessage = function (from, msg, options, customJavaScripts) {
            msg = msg.replace(/&nbsp;/g, '');
            msg = viewHelper.addMessageTime(msg);
            if (from == "me") {
                viewHelper.addOutgoingMessage(msg);
                $('.message-input').val(null);
                window.SignalrHubInstance.scrollToBottomFaded();

            } else {
                // incoming crm message
                require(['signalrHub'], function (signalrHub) {
                    signalrHub.incomingMessage(msg, options, from, customJavaScripts);
                })
            }

            require(['sessionStorageManager'], function (sessionStorageManager) {
                sessionStorageManager.addMessage(from, msg, options);
            });

            $(".message").each(function () {
                var original = $(this).html();
                // use .shortnameToImage if only converting shortnames (for slightly better performance)
                var converted = emojione.toImage(original);
                $(this).html(converted);
            });
        }

        this.hub.client.openChatWindow = function () {
            if (!SignalrHubInstance.isChatOpen()) {
                toggleChatBox();
            }
        }

        this.hub.client.conversationMetaUpdate = function (result) {
            require(['sessionStorageManager'], function (sessionStorageManager) {
                sessionStorageManager.initialize();

                if (!result.IsOpen) {
                    sessionStorageManager.deleteSessionHistory();
                }

                sessionStorageManager.loadPreviousChats();
            });
        }
    }

    SignalrHub.prototype.initHubConnection = function (callback, customerId) {

        myHub = this.hub;
        sessionStorageManager.getSessionId(function (currentSession) {

            $.connection.hub.qs = {
                ClientId: window.simpleChat.clientId
            };

            if ($.connection.hub.state == 1)
                $.connection.hub.stop(false);
            $.connection.hub.start().done(function () {
                var fp = window.SignalrHubInstance.getFingerprint();
                var origin = (this.customerId != null && this.customerId != "") ? this.customerId : document.title;
                myHub.server.logVisit(document.location.href, origin, document.referrer, fp.hash, fp.components);
                window.simpleChat.chatId = myHub.connection.id;
                callback();

            }).fail(function () {
                //chatRefreshState(false);
                // TODO: handle hub error
            });

        });


    }

    SignalrHub.prototype.getFingerprint = function () {
        //var opt = { excludeJsFonts: true, excludeFlashFonts: true, excludePlugins: true, excludeIEPlugins: true, excludeWebGL: true, excludeCanvas: true };
        //var fp = new Fingerprint2(opt);
        //var res;
        //var comp;
        //fp.get(function (result, components) {
        //    res = result;
        //    comp = components;
        //});
        //return { hash: res, components: comp };
        return { hash: "", components: [{ key: "timestamp", value: (new Date()).getTime() }] };
    }

    SignalrHub.prototype.incomingMessage = function (msg, options, from, customJavaScripts) {
        $('.messageTyping').remove();
        $('<div class="message loading new"></div>').appendTo($('.chat-container .mCSB_container'));
        this.scrollToBottomFaded();
        setTimeout(function () {
            $('.message.loading').remove();
            viewHelper.addIncomingMessage(msg, options, from, customJavaScripts);
            window.SignalrHubInstance.scrollToBottomFaded(msg, options, from);
        }, 300);
        if (!SignalrHubInstance.isChatOpen()) {
            this.peekMessage(msg);
            sessionStorageManager.loadPreviousChats();
        }
    }

    SignalrHub.prototype.peekMessage = function (textMessage) {
        if ($(".popup-message-txt").html() != "")
            $(".popup-message-txt").append("<br><br>");
        $(".popup-message-txt").append(textMessage);
        var original = $(".popup-message-txt").html();
        var preview = emojione.toImage(original);

        $(".popup-message-txt").html(preview);
        $(".popup-message").show();

        if (typeof this.peekTimer != 'undefined' && this.peekTimer > 0)
            window.clearTimeout(this.peekTimer);

        //this.peekTimer = window.setTimeout(function () {
        //    $(".popup-message").hide();
        //    $(".popup-message-txt").empty();
        //    SignalrHubInstance.peekTimer = 0;
        //}, 5000);
    }

    SignalrHub.prototype.scrollToBottomFaded = function () {
        window.setTimeout(function () {
            $('.messages-content').mCustomScrollbar("update").mCustomScrollbar('scrollTo', 'bottom', {
                scrollInertia: 400,
                timeout: 0
            });
        }, 100);
    }

    SignalrHub.prototype.isChatOpen = function () {

        if ($('.chat-container .chat').css('display') == 'block') {
            return true;
        } else {
            return false;
        }
    }



    window.SignalrHubInstance = new SignalrHub()
    return SignalrHubInstance;
})