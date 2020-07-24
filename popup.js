// wait for the DOM to completely load
document.addEventListener('DOMContentLoaded', function() {
  // grab the #translate-btn
  const translateBtn = document.getElementById('translate-btn');

  // attach an 'click' eventListener to #translate-btn
  translateBtn.addEventListener('click', function() {
    // lets activate the content_script.js by sending a "message"
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      // send message to current active tab
      chrome.tabs.sendMessage(tabs[0].id, {"message": "translate"});
    });
  });
});