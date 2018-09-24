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

### Viewport and environment

Eyes determine a viewport based per first checked image.
However due to webpage nature, the webpage (screenshotted image) might change it's size.
In order to overcome this, this library automatically sets `100x100` viewport size,
so that environment doesn't change due to change in a webpage.

### Using Baseline name

By default `eyes` always saves baseline within its environment (combination of OS, Viewport Size and Browser). If you want to compare different browsers you should set [Baseline Name](https://help.applitools.com/hc/en-us/articles/360006914692-Cross-Environment-Testing).

It is also convenient when you use fullscreen screenshots. It will compare different viewport size images by baseline name.

If you want to use baseline name you should say it explicitly:

```js
const { eyes, useBaselineName } = require('with-eyes');

...

beforeEach(() => useBaselineName(true));
```

`with-eyes` will then automagically create baseline name for your tests.

**TIP: Don't itroduce `useBaselineName` with other breaking changes**. When introducing baseline name to existing tests find your stable version, add `useBaselineName` option and run your tests. When tests with baseline name is ran for the first time they appear as new and are not compared to anything.
