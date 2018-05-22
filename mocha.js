/* global it */

const {
  DEFAULT_TIMEOUT,
  openEyes,
  checkImage
} = require('./eyes');

const eyes = {
  checkImage
};

eyes.it = function (name, fn, options) {
  return it(name, run(name, fn, options));
};

eyes.it.only = function (name, fn, options) {
  // eslint-disable-next-line mocha/no-exclusive-tests
  return it.only(name, run(name, fn, options));
};

eyes.it.skip = function (name, fn) {
  return it.skip(name, fn);
};

function run(name, fn, options) {
  return async function () {
    this.timeout(DEFAULT_TIMEOUT);
    return await openEyes.call(this, fn, this.test.fullTitle(), options);
  };
}

module.exports.eyes = eyes;
