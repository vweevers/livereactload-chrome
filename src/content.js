'use strict';

const handleChange = require('livereactload/lib/client/handleChange')
    , scope = window.__livereactload$$
    , port = chrome.runtime.connect({ name: '__livereactFwd' })

// Send client options to background script
port.postMessage(scope.options)

// Listen for changes
port.onMessage.addListener(msg => {
  handleChange(scope, msg.data)
})


// Once livereactload supports custom clients:

// export default function startClient(scope, onMsg) {
//   const port = chrome.runtime.connect({ name: '__livereactFwd' })

//   // Send client options to background script
//   port.postMessage(scope.options)

//   // Listen for changes
//   port.onMessage.addListener(msg => {
//     let handle = onMsg[msg.type]
//     if (handle) handle(msg)
//   })
// }
