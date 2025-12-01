// ==UserScript==
// @name         Twitch Chat Username Font Enlarger
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Increase font size for specific usernames in Twitch chat.
// @author       lypoluz (Dominik Potulski)
// @match        *://*.twitch.tv/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function () {
    'use strict';
    console.log("[LY] Twicht Chat Highlighter start");






    const importantUsers = [
        'd_o_m_i_n_i_k',
        'your_name',
    ];





    const CHAT_CONTAINER_SELECTORS = [
        '[data-a-target="chat-scroller"]',
        '[data-test-selector="chat-room-component-layout"]',
        '.chat-container',
        '#live-page-chat'
    ];
    const CHAT_LINE_SELECTOR = '[data-a-target="chat-line-message"]';
    const USERNAME_SELECTOR = '[data-a-target="chat-message-username"]';

    // Apply custom style to username element
    function styleUsername(usernameEl) {
        console.log("[LY] CHANGE A NAME!");
        usernameEl.style.fontSize = '1.5em';
        usernameEl.style.fontWeight = 'bold';
        //usernameEl.style.textDecoration = 'underline';
    }

    // Watch for new messages and style matching usernames
    function observeChat(chatContainer) {
        console.log("[LY] found the element!");
        const observer = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
                for (const node of mutation.addedNodes) {
                    if (node.nodeType === 1) {
                        const chatLines = node.matches(CHAT_LINE_SELECTOR)
                        ? [node]
                        : node.querySelectorAll(CHAT_LINE_SELECTOR);

                        chatLines.forEach(chatLine => {
                            const usernameEl = chatLine.querySelector(USERNAME_SELECTOR);
                            if (usernameEl && importantUsers.includes(usernameEl.textContent)) {
                                styleUsername(usernameEl);
                                const messageEl = chatLine.querySelector('[data-a-target="chat-message-text"]');
                                if (messageEl) {
                                    messageEl.style.fontSize = '1.2em';
                                    messageEl.innerHTML = "<br> " + messageEl.innerHTML;
                                }
                            }
                        });
                    }
                }
            }
        });

        observer.observe(chatContainer, { childList: true, subtree: true });
    }

    function getChatContainer() {
        for (const selector of CHAT_CONTAINER_SELECTORS) {
            const container = document.querySelector(selector);
            if (container) return container;
        }
        return null;
    }

    function waitForChatContainer() {
        const interval = setInterval(() => {
            console.log("[TM] loop!");
            const chatContainer = getChatContainer();
            if (chatContainer) {
                clearInterval(interval);
                observeChat(chatContainer);
                console.log('[TM] Chat observer initialized');
            }
        }, 1000);
    }

    waitForChatContainer();
})();
