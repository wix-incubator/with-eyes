const {callEyes} = require('./eyes');

function withEyes(callback, options) {
  return async function () {
    this.timeout(30000);

    const test = this.test.fullTitle();
    const version = (options || {}).version || 'v1.0.0';
    await callEyes.call(this, callback, test, version);
  };
}

module.exports.withEyes = withEyes;
