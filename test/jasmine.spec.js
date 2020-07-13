const {eyes, useBaselineName} = require('../');

describe('jasmine', () => {

  beforeEach(() => useBaselineName(false));

  it('should run without eyes', () => {
    expect(true).toBeTruthy();
  });

  eyes.it('should run without image checks', () => {
    expect(true).toBeTruthy();
  });

  eyes.it('should check the image', async () => {
    await eyes.checkImage(require('./stubs/image.json'), 'image 1');
  });

  eyes.it('should check the image', async () => {
    await eyes.checkImage(require('./stubs/image.json'), 'image 1');
  }, {version: '2.0.0'});

  eyes.it('should check the image', async () => {
    await eyes.checkImage(require('./stubs/image.json'), 'image 1');
  }, 20000, {version: '3.0.0'});

  eyes.it('should check multiple images', async () => {
    await eyes.checkImage(require('./stubs/image.json'), 'image 1');
    await eyes.checkImage(require('./stubs/image.json'), 'image 2');
  });

  eyes.xit('should skip this test', () => {
    expect(true).toBeFalsy();
  });

  // NOTE: it seems Eyes.setBaselineEnvName behaviour has changed
  // describe('should use baseline name', () => {
  //   beforeEach(() => useBaselineName(true));

  //   // Duplicate test name with different image to test baseline name
  //   eyes.it('shouldnt create new baseline image', async () => {
  //     await eyes.checkImage(require('./stubs/image.json'));
  //   });
  //   eyes.it('shouldnt create new baseline image', async () => {
  //     const result = await eyes.checkImage(require('./stubs/image2.json'));
  //     expect(result).toBeFalsy();
  //   }, {throwOnFail: false});
  // });

});
