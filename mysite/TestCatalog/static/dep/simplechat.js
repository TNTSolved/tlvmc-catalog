var simpleChatVersion = "16060";
var simpleChatTimestamp = (new Date()).getTime();

///////////////
//CSS preload//
///////////////


var loadCSS = function (href) {
    var fileref = document.createElement("link");
    fileref.setAttribute("rel", "stylesheet");
    fileref.setAttribute("type", "text/css");
    fileref.setAttribute("href", href + "?ver=" + simpleChatVersion);
    if (typeof fileref !== "undefined") {
        document.getElementsByTagName("head")[0].appendChild(fileref);
    }
};



var jqueryExists = function () {

    return typeof jQuery != 'undefined';
};


//////////////////////////////
//JavaScript dynamic loading//
//////////////////////////////

var simpleChatInitialize = function () {
    requireArrayLibs = ['signalR', 'Scrollbar', 'jqueryUI', 'emojione', 'userMedia'];
    require(requireArrayLibs, simpleChatLoad);
}

var simpleChatLoad = function () {
    if ($.mCustomScrollbar == undefined)
        window.setTimeout(simpleChatInitialize, 1000);
    else {
        window.setTimeout(function () {
            try {
                require(['hubs', 'simpleChatLib', 'networkManager', 'viewHelper'], function (hubs, simpleChatLib, networkManager) {
                    window.simpleChat = simpleChatLib;
                    //window.addEventListener("popstate", simpleChatLib.onPopState);
                    simpleChatLib.NetworkManager = networkManager;
                    var evt = document.createEvent("Event");
                    evt.initEvent("simpleChatLibLoaded", true, true);
                    document.dispatchEvent(evt);
                    //                    languageManager.language.HE;

                    emojione.imageType = 'svg';
                    emojione.ascii = true;
                    emojione.imagePathSVG = simpleChatServerUrl + 'Content/svg/';

                    loadCSS(simpleChatServerUrl + "Content/normalize.css");
                    loadCSS(simpleChatServerUrl + "Content/jquery.mCustomScrollbar.min.css");
                    loadCSS(simpleChatServerUrl + "Content/Site.css");
                    loadCSS(simpleChatServerUrl + "Content/emojione.min.css");
                    loadCSS(simpleChatServerUrl + "Content/emojionearea.min.css");

                });
            }
            catch (e) {
                simpleChatLoad();
            }

        }, 0);
    }
}

var loadScript = function (resourceName) {

    var scriptElement = document.createElement('script');

    scriptElement.onload = function (event) {
        if (event.currentTarget.src.indexOf('fingerprint2') > -1) {
            loadScript("require");
        }
        else if (event.currentTarget.src.indexOf('require.js') > -1) {
            loadScript("requireConfig");
        } else {
            if (!jqueryExists())
                require(['jquery'], simpleChatInitialize);
            else {
                try {
                    define("jquery", [], function () { return jQuery; });
                    simpleChatInitialize();
                }
                catch (err) {
                    setTimeout(function () { loadScript("require"); }, 500);
                }
            }
        }

    };

    scriptElement.src = simpleChatServerUrl + "Scripts/" + resourceName + ".js?ver=" + simpleChatVersion;
    document.head.appendChild(scriptElement);

};

var getScriptURL = function () {
    var scripts = document.getElementsByTagName('script');
    for (i = 0; i < scripts.length; i++)
        if (scripts[i].src.toLowerCase().indexOf("/scripts/simplechat.js") > -1)
            return scripts[i].src;
    return "";
};

if (typeof simpleChatServerUrl == "undefined") {
    simpleChatServerUrl = getScriptURL().toLowerCase().replace("scripts/simplechat.js", "");
    if (!window.require)
        loadScript("require");
    else
        loadScript("requireConfig");
}