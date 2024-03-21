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
    }

    
}

