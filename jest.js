/* global test, expect */

const {
  eyes: {
    DEFAULT_TIMEOUT,
    openEyes,
    checkImage,
    abortIfNotClosed
  },
  useBaselineName,
  useFixedViewPort
} = require('./eyes');

const eyes = {
  checkImage,
  abortIfNotClosed
};

eyes.test = function (name, fn, timeoutOrOptions, options) {
  const timeout = Number.isInteger(timeoutOrOptions) ? timeoutOrOptions : DEFAULT_TIMEOUT;
  const optionalOptions = Number.isInteger(timeoutOrOptions) ? options : timeoutOrOptions;
  return test(name, run(name, fn, optionalOptions), timeout);
};

eyes.test.only = function (name, fn, timeoutOrOptions, options) {
  const timeout = Number.isInteger(timeoutOrOptions) ? timeoutOrOptions : DEFAULT_TIMEOUT;
  const optionalOptions = Number.isInteger(timeoutOrOptions) ? options : timeoutOrOptions;
  // eslint-disable-next-line mocha/no-exclusive-tests
  return test.only(name, run(name, fn, optionalOptions), timeout);
};

eyes.test.skip = function (name, fn) {
  return test.skip(name, fn);
};

function run(name, fn, options) {
  return async function () {
    return await openEyes.call(this, fn, expect.getState().currentTestName, options);
  };
}

module.exports.eyes = eyes;
module.exports.useBaselineName = useBaselineName;
module.exports.useFixedViewPort = useFixedViewPort;
