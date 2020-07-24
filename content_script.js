// some global variables
let find = "";
let replace = "";

// listen for any "messages"
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  // check the value of the "message"
  if (request.message === "translate") {
    // get the highlighted text on the web page (content)
    const word = window.getSelection().toString();

    // make sure if the "word" selected is not empty
    if (word.length > 0) {
      // it's time to perform api request to translate English to Minionese
      // send "message" to background_script.js
      chrome.runtime.sendMessage({"word": word});
    }
  } else if (request.message === "replace") {
    // get the "find" (actual word) and "replace" (translatedText)
    find = request.find;
    replace = request.replace;

    // replaceText function to replace all instances of "find" word with the "replace" word
    replaceText(document.body);
  } else if (request.message === "error") {
    // just console log it
    console.log("Sorry some error happened :(");
  }
});

// replaceText function definition
function replaceText(element) {
  if (element.hasChildNodes()) {
    // if our root element has childNodes, then for each childNode, repeat this function
    element.childNodes.forEach(replaceText);
  } else {
    // make a regular expression
    const re = new RegExp(find, "gi");
    // then replace the word
    element.textContent = element.textContent.replace(re, replace);
  }
}