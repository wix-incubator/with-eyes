# with-eyes

A small wrapper library other `eyes.images`. It should make writing tests with `eyes` more easier.

## Install

```bash
npm install with-eyes
```

## Example

Here is a small example by using `puppeteer`:

```js
  const {withEyes} = require('with-eyes/mocha');

  describe('my application', () => {

    it('should open a contacts page', withEyes(async checkImage => {
      await page.goto('http://www.wix.com');
      await checkImage(await page.screenshot(), 'start page');
      await page.click('[data-hook="button-contacts"]');
      await page.waitForSelector('[data-hook="page-contacts"]');
      await checkImage(await page.screenshot(), 'contacts page');
    }));

  });
```

You can even pass custom parameters:

```js
  const {withEyes} = require('with-eyes/mocha');

  describe('my application', () => {

    it('should open ...', withEyes(async function (checkImage) {
      // Cause we are uploading images to aplitools, by default we increase the test timeout.
      expect(this.timeout()).to.equal(30000);

      // However you can still override for your needs.
      this.timeout(15000);
    }));

  });
```
