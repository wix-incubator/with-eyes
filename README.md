# with-eyes

A simple `jest` or `mocha` high order function to compare screenshots, using [Applitools Eyes](https://applitools.com/).
It integrates nicely with [Puppeteer](https://github.com/GoogleChrome/puppeteer) and [Protractor](https://github.com/angular/protractor).

## Install

```bash
npm install with-eyes --save-dev
```

## Example

Here is a small example by using `puppeteer`:

```js
  const {withEyes} = require('with-eyes/mocha');

  describe('my application', () => {

    // ... open page with puppeteer

    it('should open a contacts page', withEyes(async checkImage => {
      // ... navigate, do actions
      await checkImage(await page.screenshot(), 'start page');
    }));

  });
```

And here is how you could use it with `protractor`:

```js
  const {withEyes} = require('with-eyes/mocha');

  describe('my application', () => {

    // ... open page with protractor

    it('should open a contacts page', withEyes(async checkImage => {
      // ...navigate, do actions
      await checkImage(await browser.takeScreenshot(), 'start page');
    }));

  });
```