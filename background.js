chrome.storage.sync.set({'scrollToSelector': ''}, function() {
  if (chrome.runtime.error) {
    console.log("Runtime error.");
  }
});
chrome.storage.sync.set({'pause': 5000}, function() {
  if (chrome.runtime.error) {
    console.log("Runtime error.");
  }
});
chrome.storage.sync.set({'active': false}, function() {
  if (chrome.runtime.error) {
    console.log("Runtime error.");
  }
});


chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
          pageUrl: {urlMatches: '.*'},
        })
      ],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});