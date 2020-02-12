
/**
 * Listen for clicks on the buttons, and send the appropriate message to
 * the content script in the page.
 */
function listenForClicks() {
  document.addEventListener("click", (e) => {

    /**
     * Given the name of a pet, get the URL to the corresponding image.
     */
    function petNameToURL(petName) {
      switch (petName) {
        case "Cat":
          return browser.extension.getURL("images/cat.svg");
        case "Dog":
          return browser.extension.getURL("images/dog.svg");
      }
    }

    /**
     * Insert the page-hiding CSS into the active tab,
     * then get the pet URL and
     * send a "petify" message to the content script in the active tab.
     */
    function petify(tabs) {
        let url = petNameToURL(e.target.textContent);
        browser.tabs.sendMessage(tabs[0].id, {
          command: "petify",
          petURL: url,
          petName: e.target.textContent

        });
    }
    function reset(tabs) {
      browser.tabs.sendMessage(tabs[0].id, {
        command: "reset",
        catURL: browser.extension.getURL("images/cat.svg"),
        dogURL: browser.extension.getURL("images/dog.svg")
      });
    }

    /**
     * Just log the error to the console.
     */
    function reportError(error) {
      console.error(`Could not petify: ${error}`);
    }

    /**
     * Get the active tab,
     * then call "petify()" or "reset()" as appropriate.
     */
    if (e.target.classList.contains("pet")) {
      browser.tabs.query({active: true, currentWindow: true})
        .then(petify)
        .catch(reportError);
    }else if (e.target.classList.contains("reset")) {
      browser.tabs.query({active: true, currentWindow: true})
        .then(reset)
        .catch(reportError);
    }


  });
}

/**
 * There was an error executing the script.
 * Display the popup's error message, and hide the normal UI.
 */
function reportExecuteScriptError(error) {
  document.querySelector("#popup-content").classList.add("hidden");
  document.querySelector("#error-content").classList.remove("hidden");
  console.error(`Failed to execute petify content script: ${error.message}`);
}

/**
 * When the popup loads, inject a content script into the active tab,
 * and add a click handler.
 * If we couldn't inject the script, handle the error.
 */
browser.tabs.executeScript({file: "/content_scripts/word-to-pet.js"})
.then(listenForClicks)
.catch(reportExecuteScriptError);
