
require.config({

    waitSeconds: 0,

    paths: {
        'jquery': simpleChatServerUrl + 'Scripts/jquery-1.12.4.min',
        'englishConstants': simpleChatServerUrl + 'Scripts/englishConstants.js?ver=' + simpleChatVersion,
        'hebrewConstants': simpleChatServerUrl + 'Scripts/hebrewConstants.js?ver=' + simpleChatVersion,
        'languageManager': simpleChatServerUrl + 'Scripts/languageManager.js?ver=' + simpleChatVersion,
        'signalR': simpleChatServerUrl + 'Scripts/jquery.signalR-2.2.1',
        'hubs': simpleChatServerUrl + 'SignalR/signalr/hubs?noext',
        'Scrollbar': simpleChatServerUrl + 'Scripts/jquery.mCustomScrollbar.concat.min.js?ver=' + simpleChatVersion,
        'jqueryUI': simpleChatServerUrl + 'Scripts/jquery-ui.js?ver=' + simpleChatVersion,
        'textplugin': simpleChatServerUrl + 'Scripts/text',
        'chatLayout': simpleChatServerUrl + 'Scripts/templates/chatLayout.html?ts=' + simpleChatTimestamp,
        'simpleChatLib': simpleChatServerUrl + 'Scripts/simpleChatLib.js?ver=' + simpleChatVersion,
        'signalrHub': simpleChatServerUrl + 'Scripts/signalrHub.js?ver=' + simpleChatVersion,
        'GlobalMethods': simpleChatServerUrl + 'Scripts/GlobalMethods.js?ver=' + simpleChatVersion,
        'emojione': simpleChatServerUrl + 'Scripts/emojione',
        'emojiarea': simpleChatServerUrl + 'Scripts/emojionearea',
        'sessionStorageManager': simpleChatServerUrl + 'Scripts/sessionStorageManager.js?ver=' + simpleChatVersion,
        'sessionObject': simpleChatServerUrl + 'Scripts/sessionObject.js?ver=' + simpleChatVersion,
        'messageObject': simpleChatServerUrl + 'Scripts/messageObject.js?ver=' + simpleChatVersion,
        'userMedia': simpleChatServerUrl + 'Scripts/getUserMedia.js?ver=' + simpleChatVersion,
        'networkManager': simpleChatServerUrl + 'Scripts/NetworkManager.js?ver=' + simpleChatVersion,
        'cobrowseManager': simpleChatServerUrl + 'Scripts/cobrowseManager.js?ver=' + simpleChatVersion,
        'html2canvas': simpleChatServerUrl + 'Scripts/html2canvas.min.js?ver=' + simpleChatVersion,
        'viewHelper': simpleChatServerUrl + 'Scripts/viewHelper.js?ver=' + simpleChatVersion,
        'recaptcha': 'https://www.google.com/recaptcha/api'

    },

    config: {
        textplugin: {
            useXhr: function (url, protocol, hostname, port) {
                return true;
            }
        }
    },

    shim: {
        hubs: {
            deps: ['signalR']
        },
        sessionStorageManager: {
            deps: ['messageObject', 'sessionObject']
        }
    }

});









