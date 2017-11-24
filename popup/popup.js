
function showText(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {action: 'getText'}, function(response) {
        document.getElementById("origText").value = response;
        document.getElementById("correctedText").value = response;
        document.getElementById("url").value = tabs[0].url;
        console.log("tabs", tabs);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    if (chrome && chrome.tabs) {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            showText(tabs);
        });
    } else {
        console.log("no chrome && chrome.tabs");
    }
    document.getElementById("form").addEventListener('submit', function() {
        self.close();
    });
});
