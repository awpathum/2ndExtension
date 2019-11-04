(function() {
    /**
     * Check and set a global guard variable.
     * If this content script is injected into the same page again,
     * it will do nothing next time.
     */
    if (window.hasRun) {
        return;
    }
    window.hasRun = true;
    beastURl =
        /**
         * Given a URL to a beast image, remove all existing beasts, then
         * create and style an IMG node pointing to
         * that image, then insert the node into the document.
         */
        function insertBeast(beastURL) {
            removeExistingBeasts();
            let beastImage = document.createElement("img");
            beastImage.setAttribute("src", );
            beastImage.style.height = "100vh";
            beastImage.className = "beastify-image";
            document.body.appendChild(beastImage);
        }

    /**
     * Remove every beast from the page.
     */
    function removeExistingBeasts() {
        let existingBeasts = document.querySelectorAll(".beastify-image");
        for (let beast of existingBeasts) {
            beast.remove();
        }
    }

    /**
     * Listen for messages from the background script.
     * Call "beastify()" or "reset()".
     */
    // browser.runtime.onMessage.addListener((message) => {
    //   if (message.command === "beastify") {
    //     insertBeast(message.beastURL);
    //   } else if (message.command === "reset") {
    //     removeExistingBeasts();
    //   }
    // });

    browser.tabs.onCreated.addListener((tab) => {

        async function borderifyRestored(targetTabId, thisTabId) {
            if (targetTabId === thisTabId) {
                let stored = await browser.sessions.getTabValue(targetTabId, "border-css");
                if (stored) {
                    let result = await browser.tabs.insertCSS(targetTabId, { code: stored });
                }
                browser.tabs.onUpdated.removeListener(thisBorderifyRestored);
            }
        }

        let thisBorderifyRestored = borderifyRestored.bind(null, tab.id);
        browser.tabs.onUpdated.addListener(thisBorderifyRestored);
    });
})();