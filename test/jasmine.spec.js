const {eyes} = require('../jasmine');

describe('jasmine', () => {

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

});
