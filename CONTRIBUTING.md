# Contributing to Dinero.js

You want to contribute to Dinero.js and that's awesome 🎉👍 Thanks a lot for that!

Before you dive in head first, there are a couple of guidelines to follow. Please make sure you read and understand them before you submit. **Note that this isn't set in stone**. Polite debate and suggestions are welcome, as long as it's done with the best interest of the library and the end users in mind.

## ❓ Should I contribute?

Pushing your first contribution can be intimidating. A great way to start is by fixing [bugs][dinero:issues]: find an open and confirmed issue, and open a pull request that fixes it.

Dinero.js is a young project, so it doesn't have a well-defined scope yet. There are [projects][dinero:projects] that widens what the library currently does, but unless explicitly specified you probably shouldn't develop new features. In doubt, [ask first][dinero:issues], this will ensure you don't do work for nothing.

✅ Please do:

- Fix [bugs][dinero:issues].
- Improve performance.
- Refactor with better design patterns.
- Improve build processes (speed, error handling, deprecations, etc.)
- Improve the docs (issues, typos, lack of clarity, etc.)

🚫 Please don't:

- Go against the library's philosophy (immutability, native internationalization, etc.)
- Make changes based on personal preferences rather than problem-solving.
- Develop features that aren't in the scope of the library (if not sure, ask before you code).

## 💻 Install

The project uses Node.js to build and test. You will need at least Node 6+ [with full-icu support][node:full-icu]. Please check [Node's website][node] to see how to build it in your own environment.

[Yarn][yarn] is the default package manager, which means `yarn.lock` is the only versioned lock file. It's recommended you use Yarn, but most of the time you'll be fine with npm. If the install fails, or if you have to manipulate the dependencies, using Yarn will be mandatory.

To get started, clone the project and install the dependencies from your terminal:

```sh
$ git clone https://github.com/sarahdayan/dinero.js.git
$ npm install # or yarn install, recommended
```

You can make sure your environment is able to test and build by running the following commands:

```sh
$ npm test  # for unit tests
$ npm build # to build dist files
```

If both commands succeed, you're good to go! 👍

## 📖 Conventions

Dinero.js observes a few rules and conventions when it comes to code. Most of them are automated, but make sure you understand them before submitting changes.

### Commit messages

[Commitizen][github:commitizen] is used to standardize commit messages, generate the changelog and help [semantic-release][github:semantic-release] resolve the next version. **Every commit must be done using [cz-cli][github:cz-cli]**. Don't commit using `git commit` or a GUI like SourceTree.

- Stage your changes
- Run `npm run cz`
- Follow the terminal instructions

Prettier and ESLint will be run automatically before committing. If ESLint fails, the commit will not go through.

### Code

The library has a main file and services. Everything that's not directly related to the Dinero data structure should be abstracted into a service.

```
src/
├── dinero.js
└── services/
    └── ...
```

Dinero.js is written using the ES6 notation. It uses ES modules, all new files must use this module system. Factory functions should be favored over ES6, and internal values should be encapsulated.

This is also an immutable library, **and must remain this way**.

The code should as much as possible follow the [Clean Code concepts][github:clean-code] (unequivocal naming, SOLID principles, etc.)

The project uses [Prettier][prettier] for code formatting and [ESLint][eslint] for linting. Both will be run automatically when you commit, so you can go ahead and format as you like, it will be overridden anyway. Yet, contrary to Prettier, ESLint doesn't rewrite files. You need to fix linting issues yourself before you commit. To check for linting issues, run `npm run lint`.

### Specs

Dinero.js uses [Jest][jest] for unit testing. **Every public method should be unit tested**.

Every spec file has its own spec file in the `test/unit/` directory. For example, all tests for `dinero.js` are in `test/unit/dinero.spec.js`.

It's recommended you run tests before you commit, or at least before you open a pull request. Pull requests with failing tests won't be reviewed, so doing it beforehand will save you time.

```sh
$ npm test
```

Dinero.js uses the Intl API, which means you need Node with [internationalization support][node:full-icu] enabled. The `full-icu` option is recommended.

### Docs

Dinero.js uses JSDoc to generate documentation. **Every public method should be documented**.

Every method should have a short description of:

- what it does,
- its parameters,
- the type of its return statement,
- if it throws and why,

Examples should be provided, and you should add an extra description if required to understand what the method does. This will be used in the [generated documentation][dinero:docs]. Note that descriptions don't make up for poor naming or ambiguous methods. Only elaborate when necessary.

The documentation is hosted on GitHub Pages, which means generated pages are versioned. Yet, **you shouldn't commit generated docs yourself**: this will be done automatically during the CI workflow.

You can generate docs locally to make sure it displays properly, but don't commit the files.

```sh
$ npm run docs
```

Have fun!

[dinero:issues]: https://github.com/sarahdayan/dinero.js/issues
[dinero:projects]: https://github.com/sarahdayan/dinero.js/projects
[yarn]: https://yarnpkg.com
[prettier]: http://prettier.io
[eslint]: http://eslint.org
[jest]: https://facebook.github.io/jest
[node]: https://nodejs.org
[node:full-icu]: https://nodejs.org/api/intl.html#intl_embed_the_entire_icu_full_icu
[dinero:docs]: https://sarahdayan.github.io/dinero.js/
[github:clean-code]: https://github.com/ryanmcdermott/clean-code-javascript
[github:commitizen]: https://github.com/commitizen
[github:semantic-release]: https://github.com/semantic-release/semantic-release
[github:cz-cli]: https://github.com/commitizen/cz-cli
