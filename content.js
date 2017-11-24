
chrome.runtime.onMessage.addListener(handleRequest);

function handleRequest(request, sender, callback) {
    if (request.action === 'getText') {
        const selection = window.getSelection();
        if (selection && selection.toString() !== "") {
            //console.log(">>" + selection.toString());
            callback(selection.toString());
        } else {
            callback();
        }
    } else {
        alert(`Unknown action: ${request.action}`);
    }
}
