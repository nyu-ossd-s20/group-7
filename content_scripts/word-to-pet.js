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

  /**
   * Given a URL to a beast image, remove all existing beasts, then
   * create and style an IMG node pointing to
   * that image, then insert the node into the document.
   */
  function removeInstances(petURL) {
    /*document.body.innerHTML = document.body.innerHTML.replace(/hello/g, 'hi');*/
    console.log(petURL);
  }


  browser.runtime.onMessage.addListener((message) => {
    if (message.command === "run") {
      removeInstances(message.petURL);
    } /*else if (message.command === "reset") {
      removeExistingBeasts();
    }*/
  });

})();