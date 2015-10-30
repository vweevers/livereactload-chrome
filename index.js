'use strict';

var contentClient = require('./lib/content')
  , backgroundClient = require('./lib/background')
  , defaultClient = require('livereactload/lib/client/startClient')

if (location.protocol === 'chrome-extension:') {
  module.exports = function startClient() {
    var args = Array.prototype.slice.call(arguments)

    chrome.runtime.getBackgroundPage(function(bg) {
      var client = bg === window ? backgroundClient : defaultClient
      client.apply(null, args)
    })
  }
} else {
  module.exports = contentClient
}
