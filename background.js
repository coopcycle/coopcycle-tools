chrome.runtime.onMessage.addListener(function(request, _sender, sendResponse) {
    console.log("blacklist.js got message: " + request.type, request);
    switch (request.type) {

        case "getCookie":
            chrome.cookies.get({url: request.domain, name: request.name}, function(cookie) {
                sendResponse(cookie);
            });
            return true;

        case "getExport":
            fetch("https://coopcycle.antoinebagnaud.me/csv", {
                'method': 'POST',
                'headers': {
                    'Content-Type': 'application/json',
                },
                'body': JSON.stringify({
                    token: request.token,
                    ...request.params
                }),
            }).then(data => data.text()).then(text => {
                    switch (request.action) {
                        case "save":
                            chrome.downloads.download({
                                url: "data:text/csv;charset=utf-8," + encodeURIComponent(text),
                                filename: "export.csv"
                            });
                            break;
                        default:
                            sendResponse(text);
                    }
                })
            return true;

        case "fetchJSON":
            fetch(request.url, {
                method: 'GET',
                credentials: 'include',
                mode: 'no-cors'
            }).then(res => res.json()).then(json => sendResponse(json));
            return true;
    }
});
