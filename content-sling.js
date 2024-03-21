async function _getToken() {
    for (const key of ['authorization', 'authorization-token']) {
        let cookie = await utils.getCookie('https://app.getsling.com', key)
        if (cookie) {
            return cookie.value
        }
    }
    return null
}

async function _exportToCSV() {
    const token = await _getToken();
    if (token === null) {
        alert("Error: No authorization token found, contact CoopCycle developers"); 
        return;
    }
    console.log('Fetching CSV...');
    const csv = await utils.getExport(token, {
        from: '01-01-2024',
        to: '01-31-2024'
    }, "save")
    console.log(csv)
}

function addButton(elem) {
    console.log("Adding button");
    console.log("Container found");
    var button = document.createElement('button');
    button.innerText = "Export to CSV";
    button.id = "cc-export-to-csv";
    button.onclick = _exportToCSV;
    button.classList.add("btn", "btn-secondary", "btn-lg");
    elem.prepend(button)
}

var callback = function(_mutationList, _observer) {
    const elem = document.querySelector('.custom-nav')
    if (elem) {
        if (document.getElementById('cc-export-to-csv')) {
            return
        }
        addButton(elem);
    }
};

var observer = new MutationObserver(callback);
observer.observe(document.body, {childList: true, subtree: true});
