// ==UserScript==
// @name         BitcoinTalk Post Length Counter
// @namespace    https://herocc.com/btPostLengthCounter
// @version      0.1
// @description  Count the length of BitcoinTalk posts
// @author       HeroCC
// @downloadURL  https://github.com/HeroCC/BTPostLength/raw/master/btplc.user.js
// @updateURL    https://github.com/HeroCC/BTPostLength/raw/master/btplc.meta.js
// @match        https://bitcointalk.org/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

function refreshCharCount(replyArea, updateId) {
    var replyLength = replyArea.value.length;
    var lengthMessage = document.getElementById(updateId);

    lengthMessage.innerHTML = "Post Length: " + replyLength;
}

function setupQuickReply() {
    var qr = document.getElementById("quickReplyOptions");
    var qrInfo = qr.getElementsByTagName("td")[0];
    var replyArea = qr.getElementsByTagName("textarea")[0];

    var qrPostLengthMessageBox = document.createElement("span");
    qrPostLengthMessageBox.setAttribute("id", "quickReplyLength");
    qrPostLengthMessageBox.innerHTML = "Post Length: 0";
    qrInfo.appendChild(document.createElement("br")); // Add two lines of buffer under regular message
    qrInfo.appendChild(document.createElement("br"));
    qrInfo.appendChild(qrPostLengthMessageBox);

    replyArea.addEventListener('input', function() {
        refreshCharCount(replyArea, 'quickReplyLength');
    });
}

function setupFullReply() {
    var fullArea = document.getElementById("lock_warning").parentElement;
    var replyArea = fullArea.getElementsByTagName("textarea")[0];
    var messageArea = fullArea.getElementsByTagName("tr")[fullArea.getElementsByTagName("tr").length - 2].getElementsByTagName("td")[0]; // TODO: EWW ASSUMPTIONS

    var fullReplyLengthMessage = document.createElement("span");
    fullReplyLengthMessage.setAttribute("id", "fullReplyLength");
    fullReplyLengthMessage.setAttribute("class", "smalltext");
    fullReplyLengthMessage.innerHTML = "Post Length: 0";

    messageArea.insertBefore(fullReplyLengthMessage, messageArea.firstChild);

    replyArea.addEventListener('input', function() {
        refreshCharCount(replyArea, 'fullReplyLength');
    });
}

function main() {
    if (document.getElementById("quickReplyOptions") !== null) {
        setupQuickReply();
    } else if (document.getElementById("caption_subject") !== null) {
        setupFullReply();
    }
}

main();
