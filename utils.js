const utils = {
    getCookie: function (domain, name) {
        return new Promise ((resolve, reject) => {
            try {
                chrome.runtime.sendMessage({type: "getCookie", domain, name}, function(response) {
                    resolve(response)
                });
            } catch (err) {
                reject(err);
            }
        })
    },

    fetchJSON: function (url, token) { 
        return new Promise ((resolve, reject) => {
            try {
                chrome.runtime.sendMessage({type: "fetchJSON", url, token}, function(response) {
                    resolve(response)
                })
            } catch (err) {
                reject(err);
            }
        })
    },

    getExport: function (token, params, action = "default") {
        return new Promise ((resolve, reject) => {
            try {
                chrome.runtime.sendMessage({type: "getExport", token, params, action}, function(response) {
                    resolve(response)
                })
            } catch (err) {
                reject(err);
            }
        })
    },

    setPopup: function (popup) {
        return new Promise ((resolve, reject) => {
            try {
                chrome.runtime.sendMessage({type: "setPopup", popup}, function(response) {
                    resolve(response)
                })
            } catch (err) {
                reject(err);
            }
        })
    },

    openPopup: function (url) {
        return new Promise ((resolve, reject) => {
            try {
                chrome.runtime.sendMessage({type: "openPopup", url}, function(response) {
                    resolve(response)
                })
            } catch (err) {
                reject(err);
            }
        })
    }
}

