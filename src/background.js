'use strict';

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch(request.type) {
    default:
      sendResponse({ message: 'send from background' });
  }
});
