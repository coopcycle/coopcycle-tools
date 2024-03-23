function addButton(elem) {
    var button = document.createElement('button');
    button.innerText = "Export to CSV";
    button.id = "cc-export-to-csv";
    button.onclick = () => utils.openPopup('./popup-sling.html');
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
