// ==UserScript==
// @name         Bluemap follow player
// @namespace    http://tampermonkey.net/
// @version      2025-12-01
// @description  Toggle auto-click on specific player links
// @author       Lypoluz (Dominik Potulski)
// @match        https://your.domain
// @grant        none
// ==/UserScript==

(function () {
    "use strict";

    const follow_icon = "🔎";
    const stop_icon = "🛑";

    let active = null; // null | { id, interval, button }

    function stopActive() {
        if (!active) return;
        clearInterval(active.interval);
        active.button.textContent = follow_icon;
        active = null;
    }

    function addToggleButtons() {
        const links = document.querySelectorAll('a[title="Center on player"]');

        links.forEach(link => {
            if (link.dataset.toggleAdded) return;
            link.dataset.toggleAdded = "true";

            const btn = document.createElement("button");
            btn.textContent = follow_icon;
            btn.style.marginLeft = "6px";
            btn.style.cursor = "pointer";
            btn.style.fontSize = "0.8em";

            link.insertAdjacentElement("afterend", btn);

            btn.addEventListener("click", () => {
                const id = link.textContent.trim();

                if (active && active.id === id) {
                    stopActive();
                    return;
                }

                stopActive();

                const interval = setInterval(() => {
                    link.click();
                }, 1000);

                active = { id, interval, button: btn };
                btn.textContent = stop_icon;
            });
        });
    }

    addToggleButtons();

    const observer = new MutationObserver(() => addToggleButtons());
    observer.observe(document.body, { childList: true, subtree: true });

})();
