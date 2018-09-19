/* global jest */

const {eyes, useBaselineName} = require('../');

describe('jest', () => {

  beforeEach(() => useBaselineName(false));

  jest.setTimeout(1000);

  it('should run without eyes', () => {
    expect(true).toBeTruthy();
  });

  eyes.test('should run without image checks', () => {
    expect(true).toBeTruthy();
  });

  eyes.test('should allow overriding default timeout', async () => {
    await new Promise(resolve => setTimeout(resolve, 2000));
  });

  eyes.test('should check the image', async () => {
    await eyes.checkImage(require('./stubs/image.json'), 'image 1');
  });

  eyes.test('should check the image', async () => {
    await eyes.checkImage(require('./stubs/image.json'), 'image 1');
  }, {version: '2.0.0'});

  eyes.test('should check the image', async () => {
    await eyes.checkImage(require('./stubs/image.json'), 'image 1');
  }, 20000, {version: '3.0.0'});

  eyes.test('should check multiple images', async () => {
    await eyes.checkImage(require('./stubs/image.json'), 'image 1');
    await eyes.checkImage(require('./stubs/image.json'), 'image 2');
  });

  eyes.test.skip('should skip this test', () => {
    expect(true).to.be.false;
  });

  describe('should use baseline name', () => {
    beforeEach(() => useBaselineName(true));

    // Duplicate test name with different image to test baseline name
    eyes.test('shouldnt create new baseline image', async () => {
      await eyes.checkImage(require('./stubs/image.json'));
    });
    eyes.test('shouldnt create new baseline image', async () => {
      const result = await eyes.checkImage(require('./stubs/image2.json'));
      expect(result.asExpected).toBeFalsy();
    }, {throwOnFail: false});
  });

});
