define([], function () {
    var viewHelper = {};

    viewHelper.addOutgoingMessage = function (msg) {
        var message = $('<div class="massage-wrapper"></div>');
        message.append('<div class="message-logo right"></div>');
        message.append($('<div class="message message-personal left-message new">' + msg + '</div>').addClass('new'));
        $('.chat-container .mCSB_container').append(message);
    };

    viewHelper.addIncomingMessage = function (msg, options, from, customJavaScripts, selectedOption) {
        if (msg.startsWith("#image:")) {
            var attachUrl = $(msg.substr(msg.indexOf('<a'), msg.indexOf('</a>') - msg.indexOf('<a') + 4)).attr('href');
            var idiv = $('<div class="message new"></div>');
            var div = $('<div class="massage-wrapper"></div>').append(idiv).appendTo($('.chat-container .mCSB_container')).addClass('new');
            var icon = $('<div class="message-logo left"></div>');
            if (from == "BOT")
                icon.addClass("bot");
            div.prepend(icon);
            var imageContainer = $('<div class="receivedImage"></div>').css('background-image', 'url(' + attachUrl + ')');
            $('<a target="_blank"></a>').attr('href', attachUrl).append(imageContainer).append(SimpleChatConstants.FILE_DOWNLOAD).appendTo(idiv);
            div.wrapAll($('<div class="massage-wrapper"></div>'));
        } else if (msg.startsWith("#attach:")) {
            var attachUrl = $(msg.substr(msg.indexOf('<a'), msg.indexOf('</a>') - msg.indexOf('<a') + 4)).attr('href');
            var idiv = $('<div class="message new"></div>');
            var div = $('<div class="massage-wrapper"></div>').append(idiv).appendTo($('.chat-container .mCSB_container')).addClass('new');
            var icon = $('<div class="message-logo left"></div>');
            if (from == "BOT")
                icon.addClass("bot");
            div.prepend(icon);
            $('<a target="_blank"></a>').attr('href', attachUrl).append($('<img></img>').attr('src', simpleChatServerUrl + 'content/attach.png')).append(SimpleChatConstants.FILE_DOWNLOAD).appendTo(idiv);
            div.wrapAll($('<div class="massage-wrapper"></div>'));
        } else {
            var preview = emojione.toImage(msg);
            if (options == null || options.length == 0) {
                var div = $('<div class="massage-wrapper"><div class="message new">' + preview + '</div></div>').appendTo($('.chat-container .mCSB_container')).addClass('new');
                var icon = $('<div class="message-logo left"></div>');
                if (from == "BOT")
                    icon.addClass("bot");
                div.prepend(icon);
            } else {
                if (typeof (options[0]) == "string") {
                    var div = $('<div class="message sc-question-container right-message" id="describe"></div>').appendTo($('.chat-container .mCSB_container')).addClass('new');
                    $('<div class="sc-question">' + preview + '</div>').appendTo(div);
                    div.wrapAll('<div class="massage-wrapper"></div>');
                    var icon = $('<div class="message-logo left"></div>');
                    if (from == "BOT")
                        icon.addClass("bot");
                    div.before(icon);
                    var container = $('<div class="sc-answers"></div>').appendTo(div);

                    for (var i = 0; i < options.length; i++) {
                        var opt = options[i];
                        var cjs = null;
                        if (customJavaScripts)
                            cjs = customJavaScripts[i];
                        var optElement = $('<div class="sc-answer" tabindex="0" role="button">' + opt + '</div>').attr("cjs", cjs).appendTo(container).click(function (e) {
                            // $('.sc-answers').remove();
                            simpleChat.executeCustomJavascript($(e.target).attr("cjs"));
                            simpleChat.insertOption($(e.target).text());
                            $(this).addClass('answer-selected');
                        });

                        if (opt == selectedOption) {
                            $(optElement).addClass('answer-selected');
                        }
                    }
                    $('.sc-answer').keydown(function (e) {
                        if (e.which == 13) $(this).click();
                    });
                } else {
                    var container = $('<div class="message sc-cards-slider"><div class="message new">' + preview + '</div></div>').appendTo($('.chat-container .mCSB_container'));
                    var wrapper = $('<div class="sc-cards-wrapper"></div>').appendTo(container).css("width", options.length * 170);
                    container.wrapAll('<div class="massage-wrapper"></div>');
                    var icon = $('<div class="message-logo left"></div>');
                    if (from == "BOT")
                        icon.addClass("bot");
                    container.before(icon);

                    for (var i = 0; i < options.length; i++) {
                        var opt = options[i];
                        var cjs = null;
                        if (customJavaScripts)
                            cjs = customJavaScripts[i];
                        var idiv = $('<div class="sc-card"></div>').appendTo(wrapper).attr("sel-id", opt.ID).attr('val', opt.Title).attr("cjs", cjs);
                        var imgd = $('<div class="sc-card-top"></div>').appendTo(idiv);
                        if (opt.ImageUrl != null)
                            imgd.append($('<div class="sc-card-image"></div>').css("background-image", "url(" + opt.ImageUrl + ")")).click(function (e) {
                                $('.sc-cards-slider').parent().remove();
                                simpleChat.executeCustomJavascript($(e.target).parents(".sc-card").attr('cjs'));
                                simpleChat.insertOption($(e.target).parents(".sc-card").attr('val'));
                            });
                        var desc = $('<div class="sc-desc"></div>').appendTo($('<div class="sc-desc-container"></div>').appendTo(idiv)).click(function (e) {
                            $('.sc-cards-slider').parent().remove();
                            simpleChat.executeCustomJavascript($(e.target).parents(".sc-card").attr('cjs'));
                            simpleChat.insertOption($(e.target).parents(".sc-card").attr('val'));
                        });
                        $('<div class="sc-title">' + opt.Title + '</div>').appendTo(desc);
                        var subt = $('<div class="sc-subtitle"></div>').appendTo(desc);
                        var buttons = $('<div class="sc-option-container"></div>').appendTo(idiv);
                        $('<div class="sc-option" >').text(opt.SubTitle).attr("value", opt.Title).appendTo(buttons).click(function (e) {
                            $('.sc-cards-slider').parent().remove();
                            simpleChat.executeCustomJavascript($(e.target).parents(".sc-card").attr('cjs'));
                            simpleChat.insertOption($(e.target).attr("value"));
                        })
                        var lnk = $('<div class="sc-option" ></div>').appendTo(buttons);
                        if (opt.LinkUrl != null)
                            $('<a target="_blank">' + opt.LinkTitle + '</a>').attr('href', opt.LinkUrl).appendTo(lnk);

                    }
                    $('.sc-cards-slider').after($('.sc-cards-slider .message span'));
                    $('.sc-cards-slider').next().addClass('cards-time');
                }
            }
        }
    }

    viewHelper.addMessageTime = function (currentMsg) {
        var currentDateObj = new Date();
        var messageHour = currentDateObj.getHours();
        if (messageHour >= 0 && messageHour < 10) {
            messageHour = "0" + messageHour;
        }
        var messageMin = currentDateObj.getMinutes();
        if (messageMin >= 0 && messageMin < 10) {
            messageMin = "0" + messageMin;
        }
        return currentMsg += "<br/><span>" + messageHour + ":" + messageMin + "</span>";
    }

    viewHelper.removeMessageTime = function (currentMsg) {
        return currentMsg.replace(/<br\/><span>.+<\/span>/i, "");
    }

    return viewHelper;
});