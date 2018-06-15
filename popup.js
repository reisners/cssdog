let selector = document.getElementById('selector');
let pause = document.getElementById('pause');
let button_play = document.getElementById('button_play');

chrome.storage.sync.get('cssdog_selector', function(data) {
  selector.setAttribute('value', data && data.cssdog_selector ? data.cssdog_selector : "");
});

chrome.storage.sync.get('cssdog_pause', function(data) {
  pause.setAttribute('value', data && data.cssdog_pause ? data.cssdog_pause : 5000);
});

function updatePlayPause() {
  chrome.storage.sync.get('cssdog_active', function(data) {
    if (data) {
      button_play.className = "btn fa " + ( data.cssdog_active ? "fa-pause" : "fa-play" );
    }
  });  
}

// execute content.js, which will start a loop
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(tabs[0].id, {file: 'content.js'});
});

// if the user changes the selector and/or pause, pass them via chrome.storage to content.js

selector.addEventListener("change", function() {
  setSelector(selector.value);
});

function setSelector(selector) {
  chrome.storage.sync.set({'cssdog_selector': selector}, function() {
    setActive(true);
    if (chrome.runtime.error) {
      console.log("Runtime error.");
    }
  });
}

pause.addEventListener("change", function() {
  setPause(pause.value);
});

function setPause(pause) {
  chrome.storage.sync.set({'cssdog_pause': pause}, function() {
    setActive(true);
    if (chrome.runtime.error) {
      console.log("Runtime error.");
    }
  });
}

// toggle activity

button_play.addEventListener("click", function() {
  playPause();
});

function playPause() {
  chrome.storage.sync.get('cssdog_active', function(data) {
    setActive(!data.cssdog_active); // toggle state
  });
}

function setActive(active) {
  chrome.storage.sync.set({'cssdog_active': active}, function() {
    updatePlayPause();
    if (chrome.runtime.error) {
      console.log("Runtime error.");
    }
  });  
}

updatePlayPause();
