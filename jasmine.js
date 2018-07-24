/* global it, fit, expect */

const {
  DEFAULT_TIMEOUT,
  openEyes,
  checkImage,
  abortIfNotClosed
} = require('./eyes');

const eyes = {
  checkImage,
  abortIfNotClosed
};

eyes.it = function (name, fn, timeoutOrOptions, options) {
  const timeout = Number.isInteger(timeoutOrOptions) ? timeoutOrOptions : DEFAULT_TIMEOUT;
  const optionalOptions = Number.isInteger(timeoutOrOptions) ? options : timeoutOrOptions;
  const spec = it(name, async function () {
    return await openEyes.call(this, fn, spec.getFullName(), optionalOptions);
  }, timeout);
  return spec;
};

eyes.xit = function (name, fn) {
  return xit(name, fn);
};

eyes.fit = function (name, fn, timeoutOrOptions, options) {
  const timeout = Number.isInteger(timeoutOrOptions) ? timeoutOrOptions : DEFAULT_TIMEOUT;
  const optionalOptions = Number.isInteger(timeoutOrOptions) ? options : timeoutOrOptions;
  const spec = fit(name, async function () {
    return await openEyes.call(this, fn, spec.getFullName(), optionalOptions);
  }, timeout);
  return spec;
};

module.exports.eyes = eyes;
