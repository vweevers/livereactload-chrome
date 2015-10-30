'use strict';

const client = require('livereactload/lib/client/startClient')
    , scripts = new Map

export default function startClient(scope, onMsg) {
  // Handle background script itself
  client(scope, onMsg)

  // Handle content scripts
  chrome.runtime.onConnect.addListener(port => {
    if (port.name !== '__livereactFwd') return

    let tabId = port.sender.tab.id

    port.onMessage.addListener(options => {
      // Identify the script and its server by address
      let address = `${options.host}:${options.port}`
        , tabs = scripts.get(address)

      if (tabs === undefined) {
        scripts.set(address, tabs = new Map)

        // Forward websocket messages to content script contexts
        let change = (msg) => tabs.forEach(post => post(msg))
        client({ options }, { change })
      }

      tabs.set(tabId, port.postMessage.bind(port))

      port.onDisconnect.addListener(() => {
        tabs.delete(tabId)
      })
    })
  })
}
