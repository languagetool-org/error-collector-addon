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
            //console.log(">>" + selection.toString());
            callback(selection.toString());
        } else {
            callback();
        }
    } else {
        alert(`Unknown action: ${request.action}`);
    }
}
