'use strict';

export default function startClient(scope, onMsg) {
  const port = chrome.runtime.connect({ name: '__livereactFwd' })

  // Send client options to background script
  port.postMessage(scope.options)

  // Listen for changes
  port.onMessage.addListener(msg => {
    const handle = onMsg[msg.type]
    if (handle) handle(msg)
  })
}
