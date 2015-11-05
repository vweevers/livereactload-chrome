# livereactload-chrome

**Hot reload all the parts of a chrome extension, when browserified with [livereactload](https://github.com/milankinen/livereactload).** There's no need to setup secure websockets and mess with self-signed certificates.

[![npm status](http://img.shields.io/npm/v/livereactload-chrome.svg?style=flat-square)](https://www.npmjs.org/package/livereactload-chrome) [![Dependency status](https://img.shields.io/david/vweevers/livereactload-chrome.svg?style=flat-square)](https://david-dm.org/vweevers/livereactload-chrome)

![demo](https://github.com/vweevers/livereactload-chrome/raw/master/demo.gif)

## how it works

Over a two-way [messaging channel](https://developer.chrome.com/extensions/messaging), a content script sends its `livereactload` client options (host and port) to a background script. The background script starts listening to that `livereactload` server and forwards all messages to the content script, who can then perform hot reloads. The background script can also hot reload itself (so to speak). For other browsing contexts (options page, browser action) the default `livereactload` client is used.

## requirements

- The extension must be allowed to use `eval()`. Add `content_security_policy: "script-src 'self' 'unsafe-eval'; object-src 'self'"` to your manifest. Preferably add a dev-only build step to do this, or be sure to remove the `content_security_policy` field before
publishing your extension.
- The extension must have a background script (it can be empty), if you want hot reloading for content scripts.
- A separate browserify instance must be used for each browsing context and its entry file
- Each entry file must be located in its own directory. E.g. `app/background/index.js` and `app/content-script/index.js`, but not `app/background.js` and `app/content-script.js`.
- Each instance of browserify with `livereactload` must have its own websocket port.

## usage

Install `livereactload-chrome` and follow the [installation instructions](https://github.com/milankinen/livereactload#installation) of `livereactload`. When browserifying your entry files, specify the custom client:

```js
b.plugin('livereactload', { client: 'livereactload-chrome', port: port++ }
```

The clients detects its context (background, content or other) and takes appropriate action.

A complete example will come soon.

## roadmap

- Use a single websocket server and a multiplex stream?

## install

With [npm](https://npmjs.org) do:

```
npm install livereactload-chrome
```

## license

[MIT](http://opensource.org/licenses/MIT) © [Vincent Weevers](http://vincentweevers.nl)
