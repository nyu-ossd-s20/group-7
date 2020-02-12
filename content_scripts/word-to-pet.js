


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



  function insertPet(petURL, petName) {

    var pTags = document.getElementsByTagName("p");

    //New strings for the image tags
    var dogString = "<img src='" + browser.extension.getURL("../images/dog.svg") + "' width='25px' height='25px' alt='dog'/>";
    var catString = "<img src='" + browser.extension.getURL("../images/cat.svg") + "' width='25px' height='25px' alt='cat'/>";
    if(petName === "Dog"){
      //Goes through all the p tags found and replace with the images of dog or cat
      for (var i = 0; i < pTags.length; i++) {
        //Find and replace the word "dog" with the image tag string
        pTags[i].innerHTML = pTags[i].innerHTML.replace(/dog(?!.svg)/gi, dogString);
      }
    }
    else if(petName === "Cat"){
      //Goes through all the p tags found and replace with the images of dog or cat
      for (var i = 0; i < pTags.length; i++) {
        //Find and replace the word "dog" with the image tag string
        pTags[i].innerHTML = pTags[i].innerHTML.replace(/cat(?!.svg)/gi, catString);
      }
    }
  }

  function removePets (dogURL, catURL){

  }



   browser.runtime.onMessage.addListener((message) => {
    if (message.command === "petify") {
      insertPet(message.petURL, message.petName);
    }else if (message.command === "reset") {
      removePets(message.dogURL, message.catURL);
    }
  });

})();
