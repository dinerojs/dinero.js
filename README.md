<h1 align="center">Dinero.js</h1>

<div align="center"><img alt="" height="150" src="https://raw.githubusercontent.com/dinerojs/dinero.js/develop/logo.png" /></div>

<div align="center">Dinero.js is a library for working with monetary values in JavaScript.</div>

<div align="center" style="margin:15px 0">
  <a href="https://github.com/dinerojs/dinero.js/blob/master/LICENSE.md">
    <img alt="MIT License" src="https://img.shields.io/badge/license-MIT-blue.svg" />
  </a>
  <a href="https://www.npmjs.com/package/dinero.js">
    <img alt="NPM version" src="https://img.shields.io/npm/v/dinero.js.svg" />
  </a>
  <a href="https://coveralls.io/github/dinerojs/dinero.js?branch=master">
    <img alt="Coverage Status" src="https://img.shields.io/coveralls/github/dinerojs/dinero.js.svg?branch=master" />
  </a>
  <a href="https://github.com/semantic-release/semantic-release">
    <img alt="semantic-release" src="https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg" />
  </a>
</div>

<div align="center"><a href="https://dinerojs.com/module-dinero">See full API docs</a></div>

<hr>

## Features

- Immutable and chainable API.
- Global settings support.
- Extended formatting and rounding options.
- Native Intl support (no additional locale files).
- Currency conversion.

> Dinero.js v2 is in alpha! Check it out on the [`main` branch](https://github.com/dinerojs/dinero.js/tree/main).

## Download/install

Dinero.js provides builds for different environments. It also comes with polyfilled versions for older browsers.

The recommended way of install is via [npm][npm] or [Yarn][yarn]:

```sh
npm install dinero.js --save

// or

yarn add dinero.js
```

You can also [download the files directly][jsdelivr:landing] or use the [jsDelivr CDN][jsdelivr:cdn].

### UMD (browser global)

Include Dinero.js in a script tag and access its methods through the global `Dinero` variable.

```html
<script src="path/to/umd/dinero.js"></script>
<script>
  Dinero();
</script>
```

You can use an alias if you wish:

```js
var Money = Dinero
```

Any browser that supports the [Internationalization API][mdn:intl] is compatible with Dinero.js. This means [most browsers][caniuse:intl], and Internet Explorer 11 (this one requires the polyfilled version).

### CommonJS (Node)

```js
const Dinero = require('dinero.js')
```

You will need at least Node 6+ [with full-icu support][node:full-icu].

### AMD (RequireJS, System.js, etc.)

```js
requirejs(['path/to/amd/dinero'], function(Dinero) {
  //...
})
```

### ES modules (modern browser, Webpack, etc.)

```js
import Dinero from 'path/to/esm/dinero.js'
```

### TypeScript

For Typescript typings, you can use the definition file from [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped).

```sh
npm install @types/dinero.js --save
```

**This is a third-party file.** Please report issues and open PRs for it on the [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped) repository.

### React Native

Dinero uses [`Number.prototype.toLocaleString`](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Number/toLocaleString), which by default **isn't bundled with React Native (0.60+) on Android devices**. For formatting and currency symbols to display properly, you need to change the preferred build flavor of JavaScriptCore in your project by opening `./android/app/build.gradle` and changing the line `def jscFlavor = 'org.webkit:android-jsc:+'` to `def jscFlavor = 'org.webkit:android-jsc-intl:+'`.

## Quick start

Dinero.js makes it easy to create, calculate and format monetary values in JavaScript. You can perform arithmetic operations, extensively parse and format them, check for a number of things to make your own development process easier and safer.

**Note:** The library is globally available in the docs for you to be able to test it right in the browser console.

To get started, you need to create a new Dinero instance. Amounts are specified in **minor currency units** (e.g.: "cents" for the dollar). You can also specify an [ISO 4217 currency code][wiki:iso-4217] (default is `USD`).

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
Dinero({ amount: 500 })
  .add(Dinero({ amount: 500 }))
  .multiply(4)
```

**Note:** because method calls are executed sequentially, mathematical operator precedence doesn't apply. When you execute the code above, the addition happens before the multiplication, evaluating to `4000`, while `500 + 500 * 4` would normally evaluate to `2500`. If you need to perform an operation before another, make sure you call it first.

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
Dinero({ amount: 500000 })
  .setLocale('fr-FR')
  .toFormat('$0,0')
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
Dinero({ amount: 500 })
  .setLocale('fr-FR')
  .add(Dinero({ amount: 500 }))
  .toFormat('$0,0')
```

By default, new Dinero objects represent monetary values with two decimal places. If you want to represent more, or if you're using a currency with a different [exponent](https://en.wikipedia.org/wiki/ISO_4217#Treatment_of_minor_currency_units_.28the_.22exponent.22.29), you can specify a precision.

```js
// represents $10.545
Dinero({ amount: 10545, precision: 3 })

// The Japanese yen doesn't have sub-units
// this represents ¥1
Dinero({ amount: 1, currency: 'JPY', precision: 0 })
```

If you're using the same currency more than once, it might be worth setting a default precision.

```js
// The Iraqi dinar has up to 3 sub-units
Dinero.defaultCurrency = 'IQD'
Dinero.defaultPrecision = 3

// represents IQD1
Dinero({ amount: 1000 })
```

This is only a preview of what you can do. Dinero.js has extensive documentation with examples for all of its methods.

[Read full documentation][dinero-docs]

## Contributing

Pull requests are welcome! Please check the [contributing guidelines][dinero-guidelines] for install instructions and general conventions.

## Community

Selected content about Dinero.js:

- [JSJ 351: Dinero.js with Sarah Dayan][community:jsjabber]
- [Build a Shopping Cart with Vue and Dinero.js][community:shoppingcart]
- [How to Handle Monetary Values in JavaScript][community:monetaryvalues]
- [Comparison with Numeral.js][community:numeral]
- Submit your own blog post/tutorial!

## Support

Show some love by [upvoting on Product Hunt][producthunt:dinerojs] if you like, support and/or use the library 🔼😍

## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://sarahdayan.dev"><img src="https://avatars1.githubusercontent.com/u/5370675?v=4" width="100px;" alt=""/><br /><sub><b>Sarah Dayan</b></sub></a><br /><a href="https://github.com/dinerojs/dinero.js/commits?author=sarahdayan" title="Code">💻</a> <a href="https://github.com/dinerojs/dinero.js/commits?author=sarahdayan" title="Documentation">📖</a> <a href="https://github.com/dinerojs/dinero.js/issues?q=author%3Asarahdayan" title="Bug reports">🐛</a> <a href="#content-sarahdayan" title="Content">🖋</a> <a href="#blog-sarahdayan" title="Blogposts">📝</a> <a href="#ideas-sarahdayan" title="Ideas, Planning, & Feedback">🤔</a> <a href="#infra-sarahdayan" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#maintenance-sarahdayan" title="Maintenance">🚧</a> <a href="https://github.com/dinerojs/dinero.js/pulls?q=is%3Apr+reviewed-by%3Asarahdayan" title="Reviewed Pull Requests">👀</a> <a href="#question-sarahdayan" title="Answering Questions">💬</a> <a href="https://github.com/dinerojs/dinero.js/commits?author=sarahdayan" title="Tests">⚠️</a> <a href="#tutorial-sarahdayan" title="Tutorials">✅</a></td>
    <td align="center"><a href="https://github.com/yacinehmito"><img src="https://avatars1.githubusercontent.com/u/6893840?v=4" width="100px;" alt=""/><br /><sub><b>Yacine Hmito</b></sub></a><br /><a href="https://github.com/dinerojs/dinero.js/commits?author=yacinehmito" title="Code">💻</a> <a href="https://github.com/dinerojs/dinero.js/commits?author=yacinehmito" title="Documentation">📖</a> <a href="https://github.com/dinerojs/dinero.js/commits?author=yacinehmito" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/scotttrinh"><img src="https://avatars1.githubusercontent.com/u/1682194?v=4" width="100px;" alt=""/><br /><sub><b>Scott Trinh</b></sub></a><br /><a href="https://github.com/dinerojs/dinero.js/commits?author=scotttrinh" title="Code">💻</a> <a href="https://github.com/dinerojs/dinero.js/commits?author=scotttrinh" title="Documentation">📖</a> <a href="https://github.com/dinerojs/dinero.js/commits?author=scotttrinh" title="Tests">⚠️</a> <a href="#ideas-scotttrinh" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://rolandasb.com"><img src="https://avatars0.githubusercontent.com/u/1409998?v=4" width="100px;" alt=""/><br /><sub><b>Rolandas Barysas</b></sub></a><br /><a href="https://github.com/dinerojs/dinero.js/commits?author=rolandasb" title="Code">💻</a> <a href="https://github.com/dinerojs/dinero.js/commits?author=rolandasb" title="Documentation">📖</a> <a href="https://github.com/dinerojs/dinero.js/commits?author=rolandasb" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://www.luizpb.com/en/"><img src="https://avatars1.githubusercontent.com/u/1798830?v=4" width="100px;" alt=""/><br /><sub><b>Luiz "Bills"</b></sub></a><br /><a href="https://github.com/dinerojs/dinero.js/commits?author=luizbills" title="Documentation">📖</a></td>
    <td align="center"><a href="https://kunst.com.br"><img src="https://avatars2.githubusercontent.com/u/8649362?v=4" width="100px;" alt=""/><br /><sub><b>Leonardo Dino</b></sub></a><br /><a href="#infra-leonardodino" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://www.kizu.ru/"><img src="https://avatars3.githubusercontent.com/u/177485?v=4" width="100px;" alt=""/><br /><sub><b>Roman Komarov</b></sub></a><br /><a href="https://github.com/dinerojs/dinero.js/commits?author=kizu" title="Documentation">📖</a></td>
    <td align="center"><a href="http://jotaoncode.com/"><img src="https://avatars3.githubusercontent.com/u/4575026?v=4" width="100px;" alt=""/><br /><sub><b>Juan Garcia</b></sub></a><br /><a href="https://github.com/dinerojs/dinero.js/commits?author=jotaoncode" title="Code">💻</a> <a href="https://github.com/dinerojs/dinero.js/commits?author=jotaoncode" title="Documentation">📖</a> <a href="https://github.com/dinerojs/dinero.js/commits?author=jotaoncode" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/frobinsonj"><img src="https://avatars3.githubusercontent.com/u/16726902?v=4" width="100px;" alt=""/><br /><sub><b>Freddy Robinson</b></sub></a><br /><a href="https://github.com/dinerojs/dinero.js/commits?author=frobinsonj" title="Documentation">📖</a></td>
    <td align="center"><a href="https://twitter.com/andybrk"><img src="https://avatars0.githubusercontent.com/u/273857?v=4" width="100px;" alt=""/><br /><sub><b>Andy Burke</b></sub></a><br /><a href="https://github.com/dinerojs/dinero.js/commits?author=andyburke" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/andrewiggins"><img src="https://avatars3.githubusercontent.com/u/459878?v=4" width="100px;" alt=""/><br /><sub><b>Andre Wiggins</b></sub></a><br /><a href="https://github.com/dinerojs/dinero.js/commits?author=andrewiggins" title="Code">💻</a></td>
    <td align="center"><a href="https://desandro.com"><img src="https://avatars0.githubusercontent.com/u/85566?v=4" width="100px;" alt=""/><br /><sub><b>David DeSandro</b></sub></a><br /><a href="#design-desandro" title="Design">🎨</a></td>
  </tr>
  <tr>
    <td align="center"><a href="http://maxk.se"><img src="https://avatars1.githubusercontent.com/u/19932622?v=4" width="100px;" alt=""/><br /><sub><b>Max Körlinge</b></sub></a><br /><a href="https://github.com/dinerojs/dinero.js/commits?author=fongie" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/dotpack"><img src="https://avatars2.githubusercontent.com/u/1175814?v=4" width="100px;" alt=""/><br /><sub><b>Ilia Ermolin</b></sub></a><br /><a href="https://github.com/dinerojs/dinero.js/commits?author=dotpack" title="Code">💻</a> <a href="https://github.com/dinerojs/dinero.js/commits?author=dotpack" title="Documentation">📖</a> <a href="https://github.com/dinerojs/dinero.js/commits?author=dotpack" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://coina.ge"><img src="https://avatars1.githubusercontent.com/u/1531750?v=4" width="100px;" alt=""/><br /><sub><b>Kevin Brown</b></sub></a><br /><a href="https://github.com/dinerojs/dinero.js/commits?author=thekevinbrown" title="Code">💻</a> <a href="https://github.com/dinerojs/dinero.js/commits?author=thekevinbrown" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://seankwalker.com"><img src="https://avatars.githubusercontent.com/u/20524136?v=4" width="100px;" alt=""/><br /><sub><b>Sean Walker</b></sub></a><br /><a href="https://github.com/dinerojs/dinero.js/commits?author=seankwalker" title="Code">💻</a> <a href="https://github.com/dinerojs/dinero.js/commits?author=seankwalker" title="Documentation">📖</a> <a href="https://github.com/dinerojs/dinero.js/commits?author=seankwalker" title="Tests">⚠️</a></td>
    <td align="center"><a href="http://jnguyen.me/"><img src="https://avatars0.githubusercontent.com/u/1127677?v=4" width="100px;" alt=""/><br /><sub><b>John Nguyen</b></sub></a><br /><a href="#infra-nguyenj" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification.

## Acknowledgements

Dinero.js is inspired from [Martin Fowler's monetary representation][fowler-money]. Design-wise, it draws inspiration from [Money PHP][moneyphp], [Luxon][luxon], [Moment.js][moment] and [Numeral.js][numeral] (even though it doesn't rely on any of them).

Logo by [David DeSandro][github:desandro].

## License

Dinero.js is licensed under [MIT][license].

---

<div align="center">

[![Powered by Vercel](powered-by-vercel.svg)](https://vercel.com/?utm_source=dinerojs&utm_campaign=oss)

</div>

[license]: https://github.com/dinerojs/dinero.js/blob/master/LICENSE.md
[mdn:intl]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl
[caniuse:intl]: https://caniuse.com/#feat=internationalization
[node:full-icu]: https://nodejs.org/api/intl.html#intl_embed_the_entire_icu_full_icu
[wiki:iso-4217]: https://en.wikipedia.org/wiki/ISO_4217
[dinero-docs]: https://dinerojs.com/module-dinero
[dinero-guidelines]: https://github.com/dinerojs/dinero.js/blob/master/CONTRIBUTING.md
[producthunt:dinerojs]: https://www.producthunt.com/posts/dinero-js
[fowler-money]: https://martinfowler.com/eaaCatalog/money.html
[moneyphp]: http://moneyphp.org
[luxon]: https://moment.github.io/luxon
[moment]: https://momentjs.com
[numeral]: http://numeraljs.com
[npm]: https://www.npmjs.com
[yarn]: https://yarnpkg.com
[jsdelivr:landing]: https://www.jsdelivr.com/package/npm/dinero.js
[jsdelivr:cdn]: https://cdn.jsdelivr.net/npm/dinero.js/build
[github:desandro]: https://github.com/desandro
[community:jsjabber]: https://devchat.tv/js-jabber/jsj-351-dinero-js-with-sarah-dayan/
[community:shoppingcart]: https://frontstuff.io/build-a-shopping-cart-with-vue-and-dinerojs
[community:monetaryvalues]: https://frontstuff.io/how-to-handle-monetary-values-in-javascript
[community:numeral]: https://www.reddit.com/r/javascript/comments/84mhrw/dinerojs_an_immutable_library_to_create_calculate/
