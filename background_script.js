// listen for any "messages"
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  // get the "word" from "message"
  let word = request.word;

  // url 
  const url = `https://api.funtranslations.com/translate/minion.json?text=${word}`; 

  // use "fetch" to perform api request
  fetch(url)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    // get the translated text. It's in the "translated" key in "contents"
    const translatedText = data.contents.translated;

    // again activate content_script.js and pass a message with "translatedText" and actual "word".
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {"message": "replace", "find": word, "replace": translatedText});
    });
  })
  .catch(function(error) {
    // if some error happened
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {"message": "error"});
    }); 
  });
});