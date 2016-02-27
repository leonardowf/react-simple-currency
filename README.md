# Simple Currency Input

React Simple Currency is a <input /> wrapper that takes a value in cents and then
masks it as currency.

## Demo & Examples

Live demo: [leonardowf.github.io/react-simple-currency](http://leonardowf.github.io/react-simple-currency/)

To build the examples locally, run:

```
npm install
npm start
```

Then open [`localhost:8000`](http://localhost:8000) in a browser.


## Installation

The easiest way to use react-simple-currency is to install it from NPM and include it in your own React build process (using [Browserify](http://browserify.org), [Webpack](http://webpack.github.io/), etc).

You can also use the standalone build by including `dist/react-simple-currency.js` in your page. If you use this, make sure you have already included React, and it is available as a global variable.

```
npm install react-simple-currency --save
```


## Usage

```
var SimpleCurrencyInput = require('react-simple-currency');

<SimpleCurrencyInput
  value={this.state.raw}
  precision={2}
  separator=','
  delimiter='.'
  unit='R$'
  onInputChange={this.onMoneyInputChange}
/>

// onMoneyInputChange will be called with params: rawValue and displayValue

```

## Development (`src`, `lib` and the build process)

**NOTE:** The source code for the component is in `src` . A transpiled CommonJS version (generated with Babel) is available in `lib` for use with node.js, browserify and webpack. A UMD bundle is also built to `dist`, which can be included without the need for any build system.

To build, watch and serve the examples (which will also watch the component source), run `npm start`. If you just want to watch changes to `src` and rebuild `lib`, run `npm run watch` (this is useful if you are working with `npm link`).

## License

MIT

2016 Leonardo Wistuba de França.
