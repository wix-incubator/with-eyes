const {expect} = require('chai');

const {withEyes} = require('../mocha');

describe('mocha:withEyes', () => {

  beforeEach(() => {
    process.env.EYES_API_KEY = '';
  });

  it('should pass a function for checking the image', withEyes(async checkImage => {
    expect(typeof checkImage).to.equal('function');
  }));

  describe('timeout', () => {

    it('should not alter default mocha timeout', function () {
      expect(this.timeout()).to.equal(2000);
    });

    it('should increase timeout for test if used with eyes', withEyes(async function () {
      expect(this.timeout()).to.equal(30000);
    }));

  });

});
