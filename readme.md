# livereactload-chrome

**Hot reload content scripts of a chrome extension, when browserified with [livereactload](https://github.com/milankinen/livereactload).**

[![npm status](http://img.shields.io/npm/v/livereactload-chrome.svg?style=flat-square)](https://www.npmjs.org/package/livereactload-chrome) [![Dependency status](https://img.shields.io/david/vweevers/livereactload-chrome.svg?style=flat-square)](https://david-dm.org/vweevers/livereactload-chrome)

## how it works

Over a two-way [messaging channel](https://developer.chrome.com/extensions/messaging), a content script sends its livereactload client options (host and port) to a background script. The background script starts listening to that livereactload server and forwards all messages to the content script, who can then perform hot reloads.

## requirements

- A separate browserify instance (with watchify and livereactload plugins) must be used for each browsing context (background, options page, content script, etc) and its entry file (e.g. `background.js`)
- Each entry file must be located in its own directory. E.g. `app/background/index.js` and `app/content-script/index.js`, but not `app/background.js` and `app/content-script.js`.
- Each instance of browserify with livereactload must have its own websocket port. E.g. `b.plugin('livereactload', { port: port++ }`.

## usage (for now)

Follow the [installation instructions](https://github.com/milankinen/livereactload#installation) of `livereactload` and install `livereactload-chrome`. In a content script, include `content.js`: `require('livereactload-chrome/content')`. In a background page, include `background.js`: `require('livereactload-chrome/background')`. Then browserify both.

A complete example will come soon, usage is very likely to change. Instead of requiring the custom client from an entry file, you would provide an option to livereactload. Something like `b.plugin('livereactload', { client: 'livereactload-chrome/content', port: port++ }`.

## roadmap

- Make custom livereactload client (pending some changes to livereactload). This will prevent the default livereactload client from being loaded (and trying to connect to the server).
- Use a single websocket server and a multiplex stream?

## install

With [npm](https://npmjs.org) do:

```
npm install livereactload-chrome
```

## license

[MIT](http://opensource.org/licenses/MIT) © [Vincent Weevers](http://vincentweevers.nl)
