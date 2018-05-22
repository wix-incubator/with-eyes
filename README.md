# with-eyes

Simple `jest`, `mocha` and `jasmine` high order function to compare screenshots, using [Applitools Eyes](https://applitools.com/).
It integrates nicely with [Puppeteer](https://github.com/GoogleChrome/puppeteer) and [Protractor](https://github.com/angular/protractor).

## Install

```bash
npm install with-eyes --save-dev
```

## Example

Here is an example by `mocha` as test runner:

```js
  const {eyes} = require('with-eyes/mocha');

  describe('my application', () => {

    eyes.it('should open a contacts page', async () => {
      // ... navigate, do actions
      await eyes.checkImage(await page.screenshot(), 'start page'); // using puppeteer
      await eyes.checkImage(await browser.takeScreenshot(), 'start page'); // using protractor
    }));

  });
```

## API

Import `eyes` from a specific test runner package.

```js
const {eyes} = require('with-eyes/mocha');
const {eyes} = require('with-eyes/jest');
const {eyes} = require('with-eyes/jasmine');

// This import will try to autodect which test runner you are using
// and will reexport from a corresponding package mentioned above.
const {eyes} = require('with-eyes');
```

And just use it:

```js
// jasmine
eyes.it('...', () => {});
eyes.fit('...', () => {});
eyes.xit('...', () => {});

// jest
eyes.test('...', () => {});
eyes.test.only('...', () => {});
eyes.test.skip('...', () => {});

// mocha
eyes.it('...', () => {});
eyes.it.only('...', () => {});
eyes.it.skip('...', () => {});
```

> It's that easy. It's Wix!

