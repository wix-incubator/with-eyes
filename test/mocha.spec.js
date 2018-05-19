const {expect} = require('chai');

const {eyes} = require('../');

describe('mocha', () => {

  it('should run without eyes', () => {
    expect(true).to.be.true;
  });

  eyes.it('should run without image checks', () => {
    expect(true).to.be.true;
  });

  eyes.it('should allow overriding default timeout', function () {
    expect(this.timeout()).to.equal(30000);
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

});
