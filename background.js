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

        case "setPopup":
            chrome.action.setPopup({popup: request.popup});
            return true;
        case "openPopup":
            if (typeof chrome.action.openPopup === 'function') {
                chrome.action.openPopup();
            } else {
                chrome.tabs.create({url: request.url})
            }
            return true;
    }
});

function route(url) {
    if (new RegExp('/app.getsling.com\/shifts').test(url)) {
        chrome.action.setPopup({popup: "./popup-sling.html"});
    } else {
        chrome.action.setPopup({popup: "./popup-default.html"});
    }
}

chrome.tabs.onActivated.addListener(async function(activeInfo) {
    const tabInfos = await chrome.tabs.get(activeInfo.tabId)
    route(tabInfos.url)
});

chrome.tabs.onUpdated.addListener(function(_tabId, _changeInfo, tab) {
    route(tab.url)
})
