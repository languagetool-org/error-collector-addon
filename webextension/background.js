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

function onClickHandler(info, tab) {
    if (chrome && chrome.browserAction && chrome.browserAction.openPopup) {
        if (Tools.isFirefox()) {
            chrome.browserAction.openPopup();
        } else {
            // 'openPopup' is not documented at https://developer.chrome.com/extensions/browserAction,
            // and it's not in Chrome 50 (but in Chromium 49) so we are careful and don't call it if it's not there.
            // Also see https://bugs.chromium.org/p/chromium/issues/detail?id=436489
            chrome.browserAction.openPopup(
                function(popupView) {}
            );
        }
    }
}

if (chrome && chrome.browserAction && chrome.browserAction.openPopup) {
    chrome.contextMenus.onClicked.addListener(onClickHandler);
    chrome.runtime.onInstalled.addListener(function() {
        chrome.commands.getAll(function(commands) {
            let shortcut = "";
            if (commands && commands.length && commands.length > 0 && commands[0].shortcut) {
                shortcut = commands[0].shortcut;
            }
            // there seems to be no better way to show the shortcut (https://bugs.chromium.org/p/chromium/issues/detail?id=142840):
            const title = shortcut ? chrome.i18n.getMessage("contextMenuItemWithShortcut", shortcut) : chrome.i18n.getMessage("contextMenuItem");
            chrome.contextMenus.create({"title": "Report text as error...", "contexts":["selection", "editable"], "id": "contextLT"});
        });
    });
}
