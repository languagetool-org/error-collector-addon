/* Error Collector WebExtension
 * Copyright (C) 2017 Daniel Naber (http://www.danielnaber.de)
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public
 * License along with this library; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301
 * USA
 */

chrome.runtime.onMessage.addListener(handleRequest);

function handleRequest(request, sender, callback) {
    if (request.action === 'getText') {
        const selection = window.getSelection();
        if (selection && selection.toString() !== "") {
            callback(selection.toString());
        } else {
            // Case for e.g. tinyMCE as used on languagetool.org (it's in an iframe)
            let iframeSelection = "";
            const iframes = document.getElementsByTagName("iframe");
            for (let i = 0; i < iframes.length; i++) {
                try {
                    let sel = iframes[i].contentWindow.document.getSelection();
                    if (sel && sel.toString() !== "") {
                        iframeSelection = sel.toString();
                        break;
                    }
                } catch(e) {
                    // ignore - what else could we do here?
                    console.log("Could not get selection", e);
                }
            }
            callback(iframeSelection);
        }
    } else {
        alert(`Unknown action: ${request.action}`);
    }
}
