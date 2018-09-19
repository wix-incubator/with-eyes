const {expect} = require('chai');
const {eyes, useBaselineName} = require('../');

describe('mocha', () => {

  beforeEach(() => useBaselineName(false));

  it('should run without eyes', () => {
    expect(true).to.be.true;
  });

  eyes.it('should run without image checks', () => {
    expect(true).to.be.true;
  });

  eyes.it('should allow overriding default timeout', function () {
    expect(this.timeout()).to.equal(60000);
    this.timeout(500);
    expect(this.timeout()).to.equal(500);
  });

  eyes.it('should check the image', async () => {
    await eyes.checkImage(require('./stubs/image.json'), 'image 1');
  });

  eyes.it('should check image', async () => {
    await eyes.checkImage(require('./stubs/image.json'), 'image 1');
  }, {version: '2.0.0'});

  eyes.it('should check multiple images', async () => {
    await eyes.checkImage(require('./stubs/image.json'), 'image 1');
    await eyes.checkImage(require('./stubs/image.json'), 'image 2');
  });

  eyes.it.skip('should skip this test', () => {
    expect(true).to.be.false;
  });

  describe('should allow aborting the results from previous test', () => {
    beforeEach(() => eyes.abortIfNotClosed());
    it('should succeed', () => {});
  });

  describe('should use baseline name', () => {
    beforeEach(() => useBaselineName(true));

    // Duplicate test name with different image to test baseline name
    eyes.it('shouldnt create new baseline image', async () => {
      await eyes.checkImage(require('./stubs/image.json'));
    });
    eyes.it('shouldnt create new baseline image', async () => {
      const result = await eyes.checkImage(require('./stubs/image2.json'));
      expect(result.asExpected).to.be.false;
    }, {throwOnFail: false});
  });

});
