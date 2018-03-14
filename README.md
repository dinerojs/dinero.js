[![MIT License][license-badge]][license] [![Build Status][travis-badge]][travis-url] [![NPM version][npm-version-badge]][npm-url] [![Coverage Status][coveralls-badge]][coveralls-url] [![Known Vulnerabilities][snyk-badge]][snyk-url] [![semantic-release][semantic-release-badge]][semantic-release-url]

Dinero.js is a library for working with monetary values in JavaScript.

[See API docs][dinero-docs]

## Features
 * Immutable and chainable API.
 * Global settings support.
 * Extended formatting options.
 * Native Intl support (no additional locale files).

## Download/install

Dinero.js provides different builds for different environments.

### UMD (browser global)

Include Dinero.js in a script tag and access its methods through the global `Dinero` variable.

```html
<script src="dinero.js"></script>
<script>
  Dinero();
</script>
```

You can use an alias if you wish:

```js
var Money = Dinero;
```

### CommonJS (Node)

Install via npm:

```sh
npm install dinero.js --save
```

```js
const Dinero = require('dinero.js')
```

### AMD (RequireJS, System.js, etc.)

```js
requirejs(['dinero.js'], function(Dinero) {
  //...
});
```

### ES modules (modern browser, Webpack, etc.)

```js
import Dinero from 'dinero.js'
```

## Quick start

Dinero.js makes it easy to create, calculate and format monetary values in JavaScript. You can perform arithmetic operations, extensively parse and format them, check for a number of things to make your own development process easier and safer.

To get started, you need to create a new Dinero instance. Amounts are specified in **cents**. You can also specify an [ISO 4217 currency code][wiki:iso-4217] (default is `USD`).

This represents €50:

```js
const price = Dinero({ amount: 5000, currency: 'EUR' })
```

You can add or subtract any amount you want, by passing it another Dinero instance:

```js
// returns a Dinero object with amount: 5500
price.add(Dinero({ amount: 500, currency: 'EUR' }))

// returns a Dinero object with amount: 4500
price.subtract(Dinero({ amount: 500, currency: 'EUR' }))
```

Dinero.js is immutable, which means you'll always get a new Dinero instance when you perform any kind of transformation on it. Your original instance will remain untouched.

```js
price // still returns a Dinero object with amount: 5000
```

All transformative operations return a Dinero instance, so you can chain methods away as you like:

```js
// returns a Dinero object with amount: 4000
Dinero({ amount: 500 }).add(Dinero({ amount: 500 })).multiply(4)
```

You can ask all kinds of questions to your Dinero instance. You'll get a `Boolean` in return:

```js
// returns true
Dinero({ amount: 500 }).equalsTo(Dinero({ amount: 500 }))

// returns false
Dinero({ amount: 100 }).isZero()

// returns true
Dinero({ amount: 1150 }).hasCents()
```

Because Dinero.js uses `Number.toLocaleString` under the hood, you can display it into any format, for any language. But no need to pass complicated objects of options to format Dinero instances to your liking. Dinero.js works with intuitive `String` masks:

```js
// returns $5.00
Dinero({ amount: 500 }).toFormat('$0,0.00')
```

Just set the locale before you call `toFormat`, and you'll get a display result with the proper format:

```js
// returns 5 000 $US
Dinero({ amount: 500000 }).setLocale('fr-FR').toFormat('$0,0')
```

If you don't want to set the locale all the time, you can also define it globally:

```js
Dinero.globalLocale = 'de-DE'

// returns 5.000 $
Dinero({ amount: 500000 }).toFormat('$0,0')
```

You can still pass a locale to your Dinero instance if you need, which will prevail over the global one. If you use a transformative method on a Dinero object, its local locale will be inherited.

```js
// returns 10 $US
Dinero({ amount: 500 }).setLocale('fr-FR').add(Dinero({ amount: 500 })).toFormat('$0,0')
```

This is only a preview of what you can do. Dinero.js has extensive documentation with examples for all of its methods.

[Read full documentation][dinero-docs]

## Acknowledgements

Dinero.js is inspired from [Martin Fowler's monetary representation][fowler-money]. Design-wise, it draws inspiration from [Money PHP][moneyphp], [Luxon][luxon], [Moment.js][moment] and [Numeral.js][numeral] (even though it doesn't rely on any of them).

## License

Dinero.js is licensed under [MIT][license].

[license]: LICENSE.md
[license-badge]: https://img.shields.io/badge/license-MIT-blue.svg

[travis-url]: https://travis-ci.org/sarahdayan/dinero.js
[travis-badge]: https://img.shields.io/travis/sarahdayan/dinero.js.svg

[npm-url]: https://www.npmjs.com/package/dinero.js
[npm-version-badge]: https://img.shields.io/npm/v/dinero.js.svg

[coveralls-url]: https://coveralls.io/github/sarahdayan/dinero.js?branch=master
[coveralls-badge]: https://img.shields.io/coveralls/github/sarahdayan/dinero.js.svg?branch=master

[snyk-url]: https://snyk.io/test/github/sarahdayan/dinero.js?targetFile=package.json
[snyk-badge]: https://snyk.io/test/github/sarahdayan/dinero.js/badge.svg?targetFile=package.json

[semantic-release-url]: https://github.com/semantic-release/semantic-release
[semantic-release-badge]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg

[wiki:iso-4217]: https://en.wikipedia.org/wiki/ISO_4217
[dinero-docs]: https://sarahdayan.github.io/dinero.js/module-Dinero.html

[fowler-money]: https://martinfowler.com/eaaCatalog/money.html
[moneyphp]: http://moneyphp.org
[luxon]: https://moment.github.io/luxon
[moment]: https://momentjs.com
[numeral]: http://numeraljs.com
