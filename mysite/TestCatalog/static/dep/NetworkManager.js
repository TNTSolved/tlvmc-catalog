define([], function () {

    //var  HubURL = 'http://webchat.eladsoftware.com/EladGate/signalr/signalr';
    //var  HubURL = 'http://192.168.197.76/AsutaWebGate/signalr/signalr';
    var HubURL = 'signalr/signalr';


    var NetworkManager = function () {

    }


    NetworkManager.prototype.GetHubURL = function myfunction() {

        return simpleChatServerUrl + HubURL;
    }

    NetworkManager.prototype.uploadFile = function (sentFile, clientId, chatid, fp, captcha, successCallBack, failureCallback) {
        var data = new FormData();
        if (sentFile.name.length < 1) {
            failureCallback(SimpleChatConstants.UNEXPECTED_ERROR);
        } else if (sentFile.size > SimpleChatConstants.MAX_FILE_UPLOAD_SIZE) {
            failureCallback(SimpleChatConstants.FILE_TOO_LARGE);
            //        }else if(sentFile.type != 'image/png' && sentFile.type != 'image/jpg' && sentFile.type != 'image/gif' && sentFile.type != 'image/jpeg' ) {
            //            failureCallback('Operation could not complete, file is not an image');
        } else {
            var safeSentFile = encodeURI(sentFile.name);
            if (window.FormData == undefined) {

                var xhr = new XMLHttpRequest();
                xhr.open('POST', simpleChatServerUrl + "SimpleChatService.svc/upload", true);
                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4 && xhr.status == 200) {
                        successCallBack(xhr.responseText);
                    } else if (xhr.status != 200) {
                        failureCallback(xhr.responseText);
                    }
                };
                xhr.setRequestHeader('clientId', clientId);
                xhr.setRequestHeader('chatId', chatid);
                xhr.setRequestHeader('filename', safeSentFile);
                xhr.setRequestHeader('fp-hash', fp);
                xhr.setRequestHeader('reCAPTCHA', captcha == null ? "" : captcha);

                xhr.send(sentFile);
            } else {

                data.append(sentFile.name, sentFile);
                $.ajax({
                    url: simpleChatServerUrl + "SimpleChatService.svc/upload",
                    type: 'POST',
                    data: data,
                    headers: {
                        'clientId': clientId,
                        'chatId': chatid,
                        'filename': safeSentFile,
                        'fp-hash': fp,
                        'reCAPTCHA': captcha == null ? "" : captcha
                    },
                    processData: false,
                    contentType: false,
                    success: function (successMsg) {
                        return successCallBack(successMsg);//wont display properly
                    },
                    error: function (errorMsg) {
                        return failureCallback(errorMsg);
                    }
                });
            }
        }
    }

    return new NetworkManager();

});