/* global jest */

const {eyes} = require('../');

describe('jest', () => {

  jest.setTimeout(1000);

  it('should run without eyes', () => {
    expect(true).toBeTruthy();
  });

  eyes.test('should run without image checks', () => {
    expect(true).toBeTruthy();
  });

  eyes.test('should allow overriding default timeout', done => {
    setTimeout(done, 2000);
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

});
