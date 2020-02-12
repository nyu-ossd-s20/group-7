
var pTags = document.getElementsByTagName("p");

//New strings for the image tags
var dogString = "<img src='" + browser.extension.getURL("../images/dog.svg") + "' width='25px' height='25px' alt='dog'/>";
var catString = "<img src='" + browser.extension.getURL("../images/cat.svg") + "' width='25px' height='25px' alt='cat'/>";

//Goes through all the p tags found and replace with the images of dog or cat
for (var i = 0; i < pTags.length; i++) {
  var words = pTags[i].innerHTML;
  //Find and replace the word "dog" with the image tag string
  var newText = words.replace(/dog/gi, dogString);
  pTags[i].innerHTML = newText;
  //Now do the same, but another pass-through to check for cats
  pTags[i].innerHTML = pTags[i].innerHTML.replace(/cat/gi, catString);
}


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
