chrome.runtime.onMessage.addListener(function(request, sender) {
  if (request.action == "getSource") {
    message.innerText = request.source;
  }
});

function onWindowLoad() {;

  var message = document.querySelector('#message');
  chrome.tabs.query({currentWindow: true, active: true}, function (tabs) {
    const tab = tabs[0]
    message.innerText = 'inspecting... ' + tab.url;

    const regex = /https:\/\/(?:.*?\.)?facebook\.com\/events\/(\d+)(?:.*?)/
    var result = regex.exec(tabs[0].url);
    if (result && result[1]) {
      const eventId = result[1]
      const url = 'https://graph.facebook.com/v2.8/' + eventId + '?access_token=' + FACEBOOK_TOKEN;

      const xmlHttp = new XMLHttpRequest();
      xmlHttp.open("GET", url, false); // false for synchronous request
      xmlHttp.send(null);
      const facebookResponse = JSON.parse(xmlHttp.responseText);

      if (facebookResponse.error) {
        message.innerText = facebookResponse.error.message;
      } else {
        message.innerText = 'redirect to tockify...'
        chrome.tabs.update(tab.id, {url: TOCKIFY_URL}, function() {
          // add listener so callback executes only if page loaded. otherwise calls instantly
          const listener = function(tabId, changeInfo, tab) {
            if (tabId == tab.id && changeInfo.status === 'complete') {
              message.innerText += 'complete'
              // remove listener, so only run once
              chrome.tabs.onUpdated.removeListener(listener);

              // The listener may not be waiting for the site's javascript to load
              message.innerText = 'loading data...'
              setTimeout(function() {
                chrome.tabs.executeScript(tabId, {code: 'var event = ' + xmlHttp.responseText}, function() {
                  chrome.tabs.executeScript(tabId, {file: 'env.js'}, function() {
                    chrome.tabs.executeScript(tabId, {file: 'tockify_form_filler.js'}, function() {
                      // If you try and inject into an extensions page or the webstore/NTP you'll get an error
                      if (chrome.runtime.lastError) {
                        message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
                      } else {
                        message.innerText = 'done!'
                      }
                    });
                  });
                });
              }, 2000);
            }
          }
          chrome.tabs.onUpdated.addListener(listener);
        });
      }
    } else {
      message.innerText = 'could not find event id';
    }
  });
}
window.onload = onWindowLoad;
