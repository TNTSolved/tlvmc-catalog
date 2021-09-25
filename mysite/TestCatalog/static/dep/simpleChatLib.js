
define(['signalrHub', 'languageManager', 'cobrowseManager', 'sessionStorageManager'], function (signalrHub, languageManager, cobrowseManager) {

    function SimpleChat(signalrHub, languageManager, cobrowseManager) {

        this.languageManager = languageManager;
        this.cobrowseManager = cobrowseManager;
        this.chatKey = 'lcsk-chatId';
        this.requestChat = false;
        this.chatEditing = false;
        this.options = {};
        this.isChatOpen = false;
        this.isRightAlighned = true; //TODO:
        this.widthOfBody = $(window).width();
        this.chatHubObj = signalrHub;

        this.customerId = "";

        this.clientId = "";
        this.chatContainer = undefined;

    }

    SimpleChat.prototype.initHub = function () {
        this.chatHubObj.hub = $.connection.chatHub;

        this.chatHubObj.registerHubMethods();
    };

    SimpleChat.prototype.initLibDefaultStrings = function () {
        this.options.libStrings = {
            'startConversationString': {
                'value': SimpleChatConstants.WELCOME_MESSAGE, //                'value': 'על מנת להתחיל בשיחה, הקלד הודעתך בשדה למטה ולחץ אנטר',
                'domElement': '#welcomer',
                'attributeType': 'overWriteHtml'
            },
            'headerConnectString': {
                'value': SimpleChatConstants.HEADER_CONNECTED, //                'value': 'מחובר',
                'domElement': '.chat-title p span.connect',
                'attributeType': 'overWriteHtml'
            },
            'headerAgentString': {
                'value': SimpleChatConstants.HEADER_AGENT, //                'value': 'עם נציג שרות',
                'domElement': '.chat-title p span.agent',
                'attributeType': 'overWriteHtml'
            },
            'bubbleTooltipString': {
                'value': SimpleChatConstants.BUBBLE_TOOLTIP, //                'value': 'צ'ט עם נציג',
                'domElement': '.chat-container .head-container',
                'attributeType': 'tooltip'
            },
            'bubbleDisplay': {
                'value': 'block',
                'domElement': '.head-container-desktop',
                'attributeType': 'display'
            },
            'messageInputPlaceHolder': {
                'value': SimpleChatConstants.INPUT_PLACEHOLDER, //                'value': 'הקלד הודעתך...',
                'domElement': '.message-box .message-input',
                'attributeType': 'placeholder'
            },
            'sendFileOperationOngoingString': {
                'value': SimpleChatConstants.FILE_SEND_ONGOING, //                'value': 'שליחת הקובץ נכשלה',
                'domElement': '.txt-container .ongoing-txt',
                'attributeType': 'overWriteHtml'
            },
            'sendFileOperationFaildString': {
                'value': SimpleChatConstants.FILE_SEND_GENERIC_ERROR_MESSAGE, //                'value': 'שליחת הקובץ נכשלה',
                'domElement': '.txt-container .failure-txt',
                'attributeType': 'overWriteHtml'
            },
            'tryAgainFileOperationFaildString': {
                'value': SimpleChatConstants.FILE_SEND_TRY_AGAIN, //                'value': 'שליחת הקובץ נכשלה',
                'domElement': '.txt-container .try-again-txt',
                'attributeType': 'overWriteHtml'
            },
            'sendFileOperationSucceededString': {
                'value': SimpleChatConstants.FILE_SEND_SUCCESS_MESSAGE, //                'value': 'קובץ נשלח בהצלחה',
                'domElement': '.txt-container .complete-txt',
                'attributeType': 'overWriteHtml'
            }
        };
    }

    SimpleChat.prototype.applyLibDefaultStrings = function () {

        for (var key in this.options.libStrings) {

            if (this.options.libStrings[key].attributeType == "overWriteHtml")
                $(this.options.libStrings[key].domElement).html(this.options.libStrings[key].value);

            else if (this.options.libStrings[key].attributeType == "placeholder")
                $(this.options.libStrings[key].domElement).attr("placeholder", this.options.libStrings[key].value);

            else if (this.options.libStrings[key].attributeType == "tooltip")
                $(this.options.libStrings[key].domElement).attr("title", this.options.libStrings[key].value);

            else if (this.options.libStrings[key].attributeType == "optionString")
                this.options.libStrings[key].value = this.options.libStrings[key].value;

            else if (this.options.libStrings[key].attributeType == "display")
                $(this.options.libStrings[key].domElement).css("display", this.options.libStrings[key].value);

        }
    };

    SimpleChat.prototype.setChatCss = function (args) {
        // check if the init contains any args
        if (args != null && args != undefined) {
            if (args.direction != null && args.direction.toLowerCase() == "ltr")
                loadCSS(simpleChatServerUrl + "Content/site.ltr.css");
            if (args.customTheme != null && args.customTheme != "")
                loadCSS(simpleChatServerUrl + "Content/custom/" + args.customTheme + "/site.css");
            // run over all the user args
            for (var key in simpleChat.options) {
                // check if the user key exists , meaning it can be overwrite
                if (args[key]) {
                    // check if the current key is an object type (libStrings)
                    if (typeof (args[key]) == "object") {
                        // run over the lib string and overwrite the default value 
                        for (var libString in simpleChat.options[key]) {
                            if (args[key][libString]) {
                                simpleChat.options[key][libString].value = args[key][libString].value;
                            }
                        }
                    }
                }
            }
        }
    };

    // deprecated: originally build for dial my app but has no use anymore
    //SimpleChat.prototype.onPopState = function (e) {
    //    if (e.state && e.state.sc_open && !simpleChat.isChatOpen)
    //        simpleChat.toggleChatBox();
    //    else if (simpleChat.isChatOpen) {
    //        simpleChat.requestChat = false;
    //        simpleChat.toggleChatBox();
    //    }
    //};

    

    SimpleChat.prototype.toggleChatBox = function () {
        if (this.isChatOpen) {
            //history.pushState(null, null, "#");
            this.isChatOpen = false;
            $(".chat-container .chat").hide();

            $(".head-container").attr({ 'aria-expanded': 'false', 'aria-label': "פתיחת הצ'אט" }).removeClass('opened');
            //     $(".chat-container .chat").hide('slide', {direction: 'right'}, 1000);

            // Vigen 26.02.2019
            var evt = document.createEvent("Event");
            evt.initEvent("onChatClosed", true, true);
            document.dispatchEvent(evt);
        }
        else {
            //history.pushState({ sc_open: true }, null, "#");
            this.isChatOpen = true;
            $(".popup-message").hide();
            $(".popup-message-txt").empty();
            $(".chat-container .chat").show();

            $(".head-container").attr({ 'aria-expanded': 'true', 'aria-label': "פתיחת הצ'אט" }).addClass('opened');
            //$(".chat-container .chat").show('slide', {direction: 'right'}, 1000);
            this.scrollToBottomImmediate();

            $(".message-input").focus(function () {

                //                    $("html, body").animate({
                //                        scrollTop: $(window).height()
                //                    }, 10);

            });

            //FOR MOBILE ONLY
            if ($(window).width() < 480) {
                $(".simplechat-ic_type").removeClass().addClass('simplechat-btn_keyboard_cloce');
                $(".simplechat-btn_keyboard_cloce").on('click touchstart', function () {
                    $(this).removeClass().addClass('simplechat-ic_type');
                });
            }
            $('.message-input').focus(function () {

                $('.messages').addClass('input-focused')
            }).blur(function () {

                $('.messages').removeClass('input-focused')
            })
            if (screen.width > 768) {
                $(".message-input").focus();
            }
            if (!this.requestChat) {
                var origin = (this.customerId != null && this.customerId != "") ? this.customerId : document.title;
                myHub.server.requestChat(origin, document.location.href);
                this.requestChat = true;
            }
            $(".chatHead").attr({ 'aria-expanded': 'true', 'aria-label': "סגירת הצ'אט" })
        }

    };

    SimpleChat.prototype.placeCaretAtEnd = function (element) {
        //        $(".message-input").focus();
        element.focus();
        if (typeof window.getSelection != "undefined" && typeof document.createRange != "undefined") {
            var range = document.createRange();
            range.selectNodeContents(element);
            range.collapse(false);
            var selected = window.getSelection();
            selected.removeAllRanges();
            selected.addRange(range);
        }
        else if (typeof document.body.createTextRange != "undefined") {
            var textRange = document.body.createTextRange();
            textRange.moveToElementText(element);
            textRange.collapse(false);
            textRange.select();
        }
    };

    this.typedText = "";

    SimpleChat.prototype.setIEPolyfill = function () {
        if (!String.prototype.startsWith) {
            String.prototype.startsWith = function (searchString, position) {
                position = position || 0;
                return this.indexOf(searchString, position) === position;
            };
        }
    }

    SimpleChat.prototype.init = function (clientId, customChatContainer, customCssObj, isOpen, customerId) {
        simpleChat.customCssObj = customCssObj;
        simpleChat.chatContainer == undefined ? simpleChat.chatContainer = customChatContainer : simpleChat.chatContainer = 'body';

        this.customerId = customerId;

        this.clientId = clientId;

        this.setIEPolyfill();

        this.initHub();

        $.connection.hub.url = simpleChat.NetworkManager.GetHubURL();

        simpleChat.chatHubObj.initHubConnection(function () {

            if (simpleChat.customCssObj.language == null || simpleChat.customCssObj.language == "")
                simpleChat.customCssObj.language = "HE";

            require(['textplugin', simpleChat.languageManager.language[simpleChat.customCssObj.language]], function (textPluginj) {
                require(['textplugin!' + simpleChatServerUrl + 'View/templates/chatLayout.html?ts=' + simpleChatTimestamp, 'GlobalMethods', 'recaptcha'], function (chatLayout, GlobalMethods) {
                    $(".chat-container").remove();
                    $(customChatContainer).append(chatLayout);
                    simpleChat.initLibDefaultStrings();
                    simpleChat.setChatCss(simpleChat.customCssObj);
                    simpleChat.applyLibDefaultStrings();
                    simpleChat.messages = $('.messages-content');
                    simpleChat.messages.mCustomScrollbar({
                        scrollInertia: 1000
                    });
                    $('.message-submit').click(function () {
                        simpleChat.insertMessage();
                    });
                    $('#upload_btn').click(function () {
                        new simpleChat.uploadFile();
                    });
                    $('#upload_btn').on('keydown', function (e) {
                        if (e.which == 13) {
                            $(this).click();
                        }
                    });
                    $(".chat").on('keydown', function (e) {
                        if (e.which == 13) {
                            simpleChat.insertMessage();
                            return false;
                        }
                    });

                    if (GlobalMethods.isIosDevice()) {

                        $('.chat-container .chat').addClass('keyboardIsOpen');
                        //                    $('.message-input').on('focus blur', function (event) {
                        //                        $(event.currentTarget).parents('.chat').toggleClass('keyboardIsOpen')
                        //                    })
                    }




                    $(".chat-container .chat").hide();
                    $(".popup-message").hide();

                    // $('.close').click(function () {
                    //     simpleChat.toggleChatBox();
                    // });
                    $(".head-container").click(function () {
                        simpleChat.toggleChatBox();
                    });
                    $(".head-container").keydown(function (e) {
                        if (e.which == 13) $(this).click();
                    });
                    $('.message-submit').click(function () {
                        simpleChat.insertMessage();
                    });

                    var typedText = "";
                    $(".message-input").bind("keypress", function (e) {
                        var pressedChar = String.fromCharCode(e.keyCode);
                        if (e.keyCode == 13 && String.fromCharCode(e.keyCode) != undefined) {
                            $(".message-input").each(function () {
                                var $this = $(this);
                                $this.html($this.html().replace(/&nbsp;/g, ' '));
                            });
                            var preview = emojione.toImage($(".message-input").html());
                            $(this).html(preview);
                            simpleChat.placeCaretAtEnd(this);
                        }
                    });
                    $(".chat-container .chat").on({
                        keydown: function (e) {
                            var msg = $(this).val();
                            if (e.keyCode == 13 && msg != '') {
                                var preview = emojione.toImage($(".message-input").html());
                                e.preventDefault();
                                e.stopPropagation();
                                SC.insertMessage();
                            }
                        }
                    }, $('.message-input'));

                    if (isOpen)
                        simpleChat.toggleChatBox();

                });
            });
        }, this.customerId);
    }

    SimpleChat.prototype.setDate = function () {
        d = new Date();
        if (m != d.getMinutes()) {
            m = d.getMinutes();
            $('<div class="timestamp">' + d.getHours() + ':' + m + '</div>').appendTo($('.message:last'));
        }
    };

    SimpleChat.prototype.convertHtmlToSendableString = function () {
        $('.message-box .message-input object').each(function (index, currentObject) {
            var holder = $(currentObject).attr('standby');
            $(currentObject).replaceWith(holder);
        });
    };

    SimpleChat.prototype.executeCustomJavascript = function (cjs) {
        eval(cjs);
    };

    SimpleChat.prototype.insertOption = function (option) {
        $('.message-input').text(option);
        this.insertMessage();
    };

    SimpleChat.prototype.insertMessage = function () {

        require(['GlobalMethods'], function (GlobalMethods) {
            simpleChat.convertHtmlToSendableString();
            msgc = $('.message-input').text();
            var fp = window.SignalrHubInstance.getFingerprint();
            if ($.trim(msgc) == '') {
                return false;
            }
            if ($("#welcomer").length) {
                $("#welcomer").remove();
            }
            myHub.server.send(msgc, fp.hash);
            $('.message-input').text('');
            $('.messages-content').mCustomScrollbar("update").mCustomScrollbar('scrollTo', 'bottom', {
                scrollInertia: 1000,
                timeout: 0
            });

            if (GlobalMethods.isIosDevice()) {
                $(".message-input").blur();
            }
            else {
                $('.message-input').focus(function () {

                    $('.messages').addClass('input-focused')
                }).blur(function () {

                    $('.messages').removeClass('input-focused')
                });
                if (screen.width > 768) {
                    $('#describe').removeAttr('id');

                    $(".message-input").focus()
                }
            }
            simpleChat.typedText = "";
        });
    };

    SimpleChat.prototype.uploadFile = function () {
        require(['textplugin!' + simpleChatServerUrl + 'View/templates/uploadOngoing.html?ts=' + simpleChatTimestamp, 'textplugin!' + simpleChatServerUrl + 'View/templates/uploadComplete.html?ts=' + simpleChatTimestamp, 'textplugin!' + simpleChatServerUrl + 'View/templates/uploadFailure.html?ts=' + simpleChatTimestamp],
            function (uploadStart, uploadEnd, uploadFail) {
                if (typeof simpleChat.chatId == 'undefined') {
                    alert('not currently chatting');
                }
                else {
                    $("#s_file").unbind();
                    $("#s_file").change(function (e) {
                        var _invalidFileExtensions = [".ade", ".adp", ".app", ".asa", ".ashx", ".asmx", ".asp", ".bas", ".bat", ".cdx", ".cer", ".chm", ".class", ".cmd", ".com", ".config", ".cpl", ".crt", ".csh", ".dll", ".exe", ".fxp", ".hlp", ".hta", ".htr", ".htw", ".ida", ".idc", ".idq", ".inf", ".ins", ".isp", ".its", ".js", ".jse", ".ksh", ".lnk", ".mad", ".maf", ".mag", ".mam", ".maq", ".mar", ".mas", ".mat", ".mau", ".mav", ".maw", ".mda", ".mdb", ".mde", ".mdt", ".mdw", ".mdz", ".msc", ".msh", ".msh1", ".msh1xml", ".msh2", ".msh2xml", ".mshxml", ".msi", ".msp", ".mst", ".ops", ".pcd", ".pif", ".prf", ".prg", ".printer", ".pst", ".reg", ".rem", ".scf", ".scr", ".sct", ".shb", ".shs", ".shtm", ".shtml", ".soap", ".stm", ".tmp", ".url", ".vb", ".vbe", ".vbs", ".vsmacros", ".vss", ".vst", ".vsw", ".ws", ".wsc", ".wsf", ".wsh"];
                        var file = e.currentTarget.files[0];
                        var sFileName = file.name;
                        var okToUpload = true;
                        for (var j = 0; j < _invalidFileExtensions.length; j++) {
                            var sCurExtension = _invalidFileExtensions[j];
                            if (sFileName.substr(sFileName.length - sCurExtension.length, sCurExtension.length).toLowerCase() == sCurExtension.toLowerCase()) {
                                okToUpload = false;
                            }
                        }
                        if (!okToUpload) {
                            $("#s_file").val("");
                            alert(SimpleChatConstants.FILE_TYPE_NOT_SUPPORTED);
                        }
                        else {

                            $('.chat-container .mCSB_container').append('<div class="upload-indication">' + uploadStart + '</div>');
                            simpleChat.applyLibDefaultStrings();
                            $('.messages-content').mCustomScrollbar("update").mCustomScrollbar('scrollTo', 'bottom', {
                                scrollInertia: 1000,
                                timeout: 0
                            });

                            simpleChat.doUpload(file, uploadStart, uploadEnd, uploadFail, null);

                        }
                    });
                }
            });

        if (typeof simpleChat.chatId != 'undefined')
            window.setTimeout(function () { $("#s_file").trigger("click"); }, 100);
    };

    SimpleChat.prototype.doUpload = function (file, uploadStart, uploadEnd, uploadFail, recaptcha) {
        var fp = window.SignalrHubInstance.getFingerprint().hash;

        simpleChat.NetworkManager.uploadFile(file, simpleChat.clientId, simpleChat.chatId, fp, recaptcha, function (successMessage) {
            if (successMessage == "OK" || (successMessage.firstChild != undefined && successMessage.firstChild.textContent == "OK"))
                $('.chat-container .mCSB_container .upload-indication').last().html(uploadEnd);
            else if (successMessage.firstChild != undefined && successMessage.firstChild.textContent.indexOf("reCAPTCHA") != -1)
                simpleChat.doRecaptcha($('.chat-container .mCSB_container .upload-indication').last(), function (response) {
                    simpleChat.doUpload(file, uploadStart, uploadEnd, uploadFail, response);
                })
            else
                $('.chat-container .mCSB_container .upload-indication').last().html(SimpleChatConstants.FILE_TYPE_NOT_SUPPORTED);

            window.SignalrHubInstance.scrollToBottomFaded();

        }, function (erroeMsg) {

            $('.chat-container .mCSB_container .upload-indication').last().html(uploadFail);
            simpleChat.applyLibDefaultStrings();

            $('.chat-container .mCSB_container .upload-indication').last().click(
                function (e) {
                    $(e.currentTarget).html(uploadStart);
                    simpleChat.applyLibDefaultStrings();

                    simpleChat.NetworkManager.uploadFile(file, simpleChat.clientId, simpleChat.chatId, fp, recaptcha, function (successMessage) {
                        if (successMessage == "OK")
                            $('.chat-container .mCSB_container .upload-indication').last().html(uploadEnd);
                        else
                            $('.chat-container .mCSB_container .upload-indication').last().html(SimpleChatConstants.FILE_TYPE_NOT_SUPPORTED);
                        simpleChat.applyLibDefaultStrings();

                    }, function (erroeMsg) {
                        $(e.currentTarget).html(uploadFail);
                        simpleChat.applyLibDefaultStrings();

                    });
                });

            window.SignalrHubInstance.scrollToBottomFaded();
        });

        $("#s_file").val("");

    }

    SimpleChat.prototype.doRecaptcha = function (e, callback) {
        var widgetId = grecaptcha.render($("<div></div>").appendTo(e)[0], {
            'sitekey': '6Lf24j4UAAAAAGpvfGRSzU2AtOmqnqmDOAqdRgT4',
            'size': 'invisible',
            'badge': 'inline',
            'callback': callback
        });
        grecaptcha.execute(widgetId);
    }

    SimpleChat.prototype.setChatId = function (chatId) {

        if (hasStorage()) {
            sessionStorage.setItem(chatKey, chatId);
        }
    };

    SimpleChat.prototype.scrollToBottomFaded = function () {
        $('.messages-content').mCustomScrollbar("update").mCustomScrollbar('scrollTo', 'bottom', {
            scrollInertia: 1000,
            timeout: 0
        });
    };

    SimpleChat.prototype.scrollToBottomImmediate = function () {
        $('.messages-content').mCustomScrollbar("update").mCustomScrollbar('scrollTo', 'bottom', {
            scrollInertia: 0,
            timeout: 0
        });
    };

    return new SimpleChat(signalrHub, languageManager, cobrowseManager);

});