
//const apiEndpoint = "http://localhost:8000/submitErrorExample";
const apiEndpoint = "https://languagetoolplus.com/submitErrorExample";

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
        const req = new XMLHttpRequest();
        req.timeout = 60 * 1000; // milliseconds
        req.open('POST', apiEndpoint, true);
        req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        req.onload = function() {
            if (req.status === 200) {
                self.close();
            } else {
                alert("Sorry, error submitting sentence. Code: " + req.status);
            }
        };
        req.onreadystatechange = function() {
            //console.log("onreadystatechange", req.status, req.readyState);
            if (req.readyState == XMLHttpRequest.DONE && req.status == 0) {
                // not sure why this sometimes on first click...
                self.close();
            }
        };
        req.send(
            "sentence=" + encodeURIComponent(document.getElementById("origText").value) +
            "&correction=" + encodeURIComponent(document.getElementById("correctedText").value) +
            "&url=" + encodeURIComponent(document.getElementById("url").value)
        );
    });
});
